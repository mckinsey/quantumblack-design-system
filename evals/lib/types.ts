export type Mode = 'unit' | 'e2e';

export type Check =
  | { type: 'fileExists'; path: string }
  | { type: 'fileAbsent'; path: string }
  | { type: 'grep'; path: string; pattern: string; match?: boolean }
  | { type: 'registryEntry'; name: string; requires?: string[] }
  | { type: 'stepsLog'; path?: string };

export type CheckResult = { id: string; ok: boolean; detail: string };

export type EvalCase = {
  id: string;
  mode: Mode;
  focus?: string;
  setup?: string;
  component: string;
  codeConnect?: string[];
  files?: string[];
  prompt: string;
  expected_output: string;
  expectations: string[];
  checks?: Check[];
  gate?: boolean;
};

export type SuiteFile = {
  skill_name: string;
  preamble?: string;
  preamble_e2e?: string;
  evals: EvalCase[];
};

export type Eval = EvalCase & {
  fixture?: string;
};

export type CheckCtx = {
  dir: string;
  check: Check;
  id: string;
  evalCase: Eval;
};

export type Plugin = {
  gate?: string;
  overlay?: (dir: string, root: string) => void;
  seed?: (dir: string, evalCase: Eval, evalsRoot: string) => void;
  applySetup?: (dir: string, evalCase: Eval) => void;
  checks?: Record<string, (ctx: CheckCtx) => CheckResult | undefined>;
};

export type RunOpts = {
  id: string[];
  suite: string;
  component: string[];
  focus: string[];
  model: string;
  keep: boolean;
  dryRun: boolean;
};

export type RunConfig = {
  root: string;
  suitePath: string;
  evalsRoot: string;
  runsDir: string;
  resultsDir: string;
  plugin: Plugin;
  opts: RunOpts;
};

export type CaseLog = {
  id: string;
  mode: Mode;
  component: string;
  ok: boolean;
  checks: CheckResult[];
};
