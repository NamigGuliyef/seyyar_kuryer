
export const priceRanges = [
  { min: 0, max: 2, regular: 3, urgent: 6 },
  { min: 2, max: 5, regular: 5, urgent: 8 },
  { min: 5, max: 10, regular: 8, urgent: 11 },
  { min: 10, max: Infinity, regular: 12, urgent: 15 }
];

export const calculatePrice = (distance: number, isUrgent: boolean = false): number => {
  const range = priceRanges.find(r => distance > r.min && distance <= r.max);
  if (!range) return 0;
  
  return isUrgent ? range.urgent : range.regular;
};

export const getPriceRange = (distance: number) => {
  return priceRanges.find(r => distance > r.min && distance <= r.max);
};
