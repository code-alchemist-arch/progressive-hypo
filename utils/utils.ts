export const formatCurrency = (amount: number) => {
  const formatter = new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency: 'CHF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(amount);
};

export const formatInterestRate = (interestRate: number) => {
  return `${interestRate?.toFixed(2)}%` || '0%';
};

export const getMonthDiff = (d1: Date, d2: Date) => {
  let months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
};

export const shareWeb = (blobParam: Blob) => {
  if (!blobParam) return;

  const resFile = new File([blobParam], 'customer.pdf', {
    type: blobParam.type,
  });

  if (!navigator.canShare) {
    console.error(`Your system doesn't support sharing files.`);
  } else if (!navigator.canShare({ files: [resFile] })) {
    console.error('File sharing is not supported in this browser.');
  } else {
    navigator
      .share({
        files: [resFile],
        title: 'Customer Document',
        text: 'Customer Document',
        url: '',
      })
      .then(() => console.log('Share was successful.'))
      .catch((error) => console.error('Sharing failed', error));
  }
};
