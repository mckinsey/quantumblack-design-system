type ListSize = 'sm' | 'reg' | 'lg';
type ListDensity = 'default' | 'comfortable';

const verticalLegendMb: Record<ListSize, Record<ListDensity, string>> = {
  sm: { default: 'mb-3', comfortable: 'mb-4' },
  reg: { default: 'mb-3', comfortable: 'mb-4' },
  lg: { default: 'mb-4', comfortable: 'mb-5' },
};

const itemStackGap: Record<ListSize, Record<ListDensity, string>> = {
  sm: { default: 'gap-2', comfortable: 'gap-3' },
  reg: { default: 'gap-3', comfortable: 'gap-4' },
  lg: { default: 'gap-3', comfortable: 'gap-4' },
};

const sectionGap: Record<ListSize, Record<ListDensity, string>> = {
  sm: { default: 'gap-2', comfortable: 'gap-3' },
  reg: { default: 'gap-3', comfortable: 'gap-3' },
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

function groupLegendClass(size: ListSize) {
  if (size === 'lg') {
    return 'label-large-primary';
  }

  if (size === 'sm') {
    return 'label-small-primary';
  }

  return 'label-regular-primary';
}

function listDensityGap(size: ListSize, density: ListDensity) {
  return itemStackGap[size][density];
}

function listSectionGap(size: ListSize, density: ListDensity) {
  return sectionGap[size][density];
}

function itemLabelClass(size: ListSize) {
  if (size === 'lg') {
    return 'text-fg-secondary paragraph-large-primary';
  }

  if (size === 'sm') {
    return 'text-fg-secondary paragraph-small-primary';
  }

  return 'text-fg-secondary paragraph-regular-primary';
}

function itemCheckboxSize(size: ListSize): 'default' | 'lg' {
  return size === 'lg' ? 'lg' : 'default';
}

export {
  groupLegendClass,
  itemCheckboxSize,
  itemLabelClass,
  listDensityGap,
  listLegendMb,
  listSectionGap,
  type ListDensity,
  type ListSize,
};
