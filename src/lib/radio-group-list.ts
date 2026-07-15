type ListSize = 'sm' | 'reg' | 'lg';
type ListDensity = 'default' | 'comfortable';

const verticalFieldSetGap: Record<ListSize, Record<ListDensity, string>> = {
  sm: { default: 'gap-3', comfortable: 'gap-4' },
  reg: { default: 'gap-3', comfortable: 'gap-4' },
  lg: { default: 'gap-4', comfortable: 'gap-5' },
};

function listFieldSetGap(
  size: ListSize,
  density: ListDensity,
  orientation: 'vertical' | 'horizontal',
) {
  if (orientation === 'horizontal') {
    return 'gap-3';
  }

  return verticalFieldSetGap[size][density];
}

function radioGroupLegendClass(size: ListSize) {
  return size === 'lg' ? 'label-large-primary' : 'label-regular-primary';
}

export {
  listFieldSetGap,
  radioGroupLegendClass,
  type ListDensity,
  type ListSize,
};
