const PALETTE = [
  'bg-fuchsia-500',
  'bg-orange-400',
  'bg-yellow-700',
  'bg-lime-400'
];

const assigned = new Map<string, string>();

export const getCategoryColor = (category: string) => {
  if (assigned.has(category)) {
    return assigned.get(category);
  } else {
    const next = PALETTE[assigned.size % PALETTE.length];
    assigned.set(category, next);
    return next;
  }
}