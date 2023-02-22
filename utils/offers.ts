import { IOffer } from '@/store/slice';

export function getExpandedOffers(offers: IOffer[]): IOffer[] {
  return offers?.filter(
    (offerItr) =>
      offerItr.productType === 'Variable' || offerItr.productType === 'Saron',
  );
}

export function getRegularOffers(offers: IOffer[]): IOffer[] {
  return offers?.filter((offerItr) => offerItr.productType === 'Fixed');
}
