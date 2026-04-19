import { Callout } from './components/Callout/Callout';
import { MdxPre } from './components/CodeBlock/CodeBlock';
import { ProblemSolution } from './components/ProblemSolution/ProblemSolution';
import { Figure } from './components/Figure/Figure';

// MDXProvider accepts a loose components map; casting via `unknown` keeps it flexible
// without pulling in MDX's generic component types.
export const mdxComponents = {
  Callout,
  ProblemSolution,
  Figure,
  pre: MdxPre,
} as unknown as Record<string, React.ComponentType<unknown>>;
