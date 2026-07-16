type ListSize = 'sm' | 'reg' | 'lg';
type ListDensity = 'default' | 'comfortable';

const verticalLegendMb: Record<ListSize, Record<ListDensity, string>> = {
  sm: { default: 'mb-3', comfortable: 'mb-4' },
  reg: { default: 'mb-3', comfortable: 'mb-4' },
  lg: { default: 'mb-4', comfortable: 'mb-5' },
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

function radioGroupLegendClass(size: ListSize) {
  return size === 'lg' ? 'label-large-primary' : 'label-regular-primary';
}

export { listLegendMb, radioGroupLegendClass, type ListDensity, type ListSize };
