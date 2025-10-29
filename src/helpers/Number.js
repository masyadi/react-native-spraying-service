export const numberFormat = (number, thousand = '.') => {
  return number
    .toString()
    .replace(/[.,\s]/g, '')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${thousand}`);
};

export const phoneFormat = (phone, countryCode = '+62') => {
  if (!phone) return null;
  if (!/^(\+62|62|0)$/.test(countryCode))
    throw new Error('Invalid country code');
  return phone.replace(/^(\+62|62|0)/g, countryCode);
};

export const validatePhoneNumber = phone => {
  if (!phone) return false;
  return /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/.test(
    phone,
  );
};

export const meterToHectare = val => {
  if (val < 1) return 0;
  return val / 10000;
};
