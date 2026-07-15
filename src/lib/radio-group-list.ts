type ListSize = 'sm' | 'reg' | 'lg';
type ListDensity = 'default' | 'comfortable';

const verticalFieldSetGap: Record<ListSize, Record<ListDensity, string>> = {
  sm: { default: 'gap-2', comfortable: 'gap-3' },
  reg: { default: 'gap-3', comfortable: 'gap-4' },
  lg: { default: 'gap-4', comfortable: 'gap-5' },
};

const horizontalFieldSetGap: Record<ListSize, string> = {
  sm: 'gap-2',
  reg: 'gap-3',
  lg: 'gap-3',
};

function listFieldSetGap(
  size: ListSize,
  density: ListDensity,
  orientation: 'vertical' | 'horizontal',
) {
  if (orientation === 'horizontal') {
    return horizontalFieldSetGap[size];
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
