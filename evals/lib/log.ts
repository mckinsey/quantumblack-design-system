let n = 0;

export function resetSteps(): void {
  n = 0;
}

export function step(msg: string): void {
  n++;
  console.log(`  [${n}] ${msg}`);
}

export function stepDetail(msg: string): void {
  console.log(`      ${msg}`);
}
