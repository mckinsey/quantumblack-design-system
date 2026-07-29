type ListSize = 'sm' | 'reg' | 'lg';
type ListDensity = 'default' | 'comfortable';

const verticalLegendMb: Record<ListSize, Record<ListDensity, string>> = {
  sm: { default: 'mb-3', comfortable: 'mb-4' },
  reg: { default: 'mb-3', comfortable: 'mb-4' },
  lg: { default: 'mb-4', comfortable: 'mb-5' },
};

const itemGap: Record<ListSize, Record<ListDensity, string>> = {
  sm: { default: 'gap-2', comfortable: 'gap-3' },
  reg: { default: 'gap-3', comfortable: 'gap-4' },
  lg: { default: 'gap-3', comfortable: 'gap-4' },
};

function listLegendMb(
  size: ListSize,
  density: ListDensity,
  orientation: 'vertical' | 'horizontal',
) {
  if (orientation === 'horizontal') {
    return 'mb-3';
  }

  return verticalLegendMb[size][density];
}

function listItemGap(size: ListSize, density: ListDensity) {
  return itemGap[size][density];
}

export { listItemGap, listLegendMb, type ListDensity, type ListSize };
