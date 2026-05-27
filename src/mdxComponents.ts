import { Callout } from './components/Callout/Callout';
import { MdxPre } from './components/CodeBlock/CodeBlock';
import { ProblemSolution } from './components/ProblemSolution/ProblemSolution';
import { Figure } from './components/Figure/Figure';
import {
  MemorySwapLayout,
  PageMovement,
  ValidPresentMatrix,
  PageFaultTrapFlow,
  ReplacementSteps,
  LazyApproachFlow,
  MemoryFullCycle,
  WatermarkDaemonFlow,
  RetryInstructionFlow,
  TlbHitMissFlow,
  SystemComponentPipeline,
  PageDaemonScenarios,
  PfnReassignment,
  FullFlowSteps,
} from './components/Ch15Diagrams/Ch15Diagrams';
import {
  CpuVirtTimeline,
  ThreadAnatomy,
  ThreadMemoryMap,
  AddressSpaceLayout,
  MulticoreParallelism,
  IOOverlapTimeline,
  IpcVsThreadSharing,
  RaceConditionTimeline,
  LockCriticalSection,
  DeadlockCycle,
  ThreadVsProcessSwitchDiagram,
} from './components/Ch17Diagrams/Ch17Diagrams';

// MDXProvider accepts a loose components map; casting via `unknown` keeps it flexible
// without pulling in MDX's generic component types.
export const mdxComponents = {
  Callout,
  ProblemSolution,
  Figure,
  pre: MdxPre,
  // 15장(Swapping Mechanisms) 전용 SVG 다이어그램들. 본문에서 컴포넌트로 직접 사용.
  MemorySwapLayout,
  PageMovement,
  ValidPresentMatrix,
  PageFaultTrapFlow,
  ReplacementSteps,
  LazyApproachFlow,
  MemoryFullCycle,
  WatermarkDaemonFlow,
  RetryInstructionFlow,
  TlbHitMissFlow,
  SystemComponentPipeline,
  PageDaemonScenarios,
  PfnReassignment,
  FullFlowSteps,
  // 17장(Threads & Concurrency) 전용 SVG 다이어그램들.
  CpuVirtTimeline,
  ThreadAnatomy,
  ThreadMemoryMap,
  AddressSpaceLayout,
  MulticoreParallelism,
  IOOverlapTimeline,
  IpcVsThreadSharing,
  RaceConditionTimeline,
  LockCriticalSection,
  DeadlockCycle,
  ThreadVsProcessSwitchDiagram,
} as unknown as Record<string, React.ComponentType<unknown>>;
