import { IViability } from '@/store/slice';
import { MORTGAGE_MODE_PAYING_OFF } from '@/utils/constants';

export function getBackendUrl(url = ''): string {
  return `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`;
}

export async function fetchJSON(url: string, method: string, body: any) {
  const options: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    method,
    body: JSON.stringify(body),
  };

  const response = await fetch(getBackendUrl(url), options);
  return await response.json();
}

export async function fetchBlog(url: string, method: string, body: any) {
  const options: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    method,
    body: JSON.stringify(body),
  };

  const response = await fetch(getBackendUrl(url), options);
  return await response.blob();
}

export interface IApiCalculateSustainabilityParams {
  grossYearlyIncome: number;
  ownFunds: number;
  propertyPrice: number;
}

export async function apiCalculateSustainability(
  data: IApiCalculateSustainabilityParams,
): Promise<IViability> {
  const rawData = await fetchJSON('/v1/tbr/calc', 'POST', {
    income: data.grossYearlyIncome,
    capital: data.ownFunds,
    propertyPrice: data.propertyPrice,
    firstMortgageDurationInYears: 10,
    mortgageProvider: 'hausundwohnen',
  });

  return {
    isCalculated: true,
    loanToValueRatio: rawData?.result?.mortgagingInPercent,
    sustainability: rawData?.result?.sustainabilityInPercent,
  };
}

export interface IApiCalculateOffersParams {
  mode: string;
  grossYearlyIncome: number;
  postalCode: string;
  purchasePrice?: number;
  marketValue?: number;
  mortgageValue?: number;
  ownFunds?: number;
  dueDate?: string;
  salesChannel?: string;
  advisorMail?: string;
}

function generateRequestPayload(
  data: IApiCalculateOffersParams,
): IApiCalculateOffersParams {
  const isPayingOff = data.mode === MORTGAGE_MODE_PAYING_OFF;

  let requestData: IApiCalculateOffersParams = {
    mode: data.mode,
    grossYearlyIncome: data.grossYearlyIncome,
    postalCode: data.postalCode,
    salesChannel: data.salesChannel,
    advisorMail: data.advisorMail,
  };

  if (!isPayingOff) {
    requestData.purchasePrice = data.purchasePrice;
    requestData.ownFunds = data.ownFunds;
  } else {
    requestData.marketValue = data.marketValue;
    requestData.mortgageValue = data.mortgageValue;
    requestData.dueDate = data.dueDate;
  }

  return requestData;
}

export async function apiCalculateOffers(
  data: IApiCalculateOffersParams,
): Promise<any> {
  const isPayingOff = data.mode === MORTGAGE_MODE_PAYING_OFF;
  const urlMethod = isPayingOff ? '/v1/hpc/redemption' : '/v1/hpc/purchase';

  const requestData = generateRequestPayload(data);
  return await fetchJSON(urlMethod, 'POST', requestData);
}

export async function apiDownloadDocument(
  data: IApiCalculateOffersParams,
): Promise<any> {
  const isPayingOff = data.mode === MORTGAGE_MODE_PAYING_OFF;
  const urlMethod = isPayingOff
    ? '/v1/hpc/redemption/document'
    : '/v1/hpc/purchase/document';

  const requestData = generateRequestPayload(data);
  return await fetchBlog(urlMethod, 'POST', requestData);
}

// legacy

export const fetchData = async (
  url: string,
  method: string,
  body: any,
  isBlob: boolean = false,
) => {
  const options: any = {
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    method,
    body: JSON.stringify(body),
  };

  const response = await fetch(getBackendUrl(url), options);

  if (isBlob) return await response.blob();
  else return await response.json();
};
