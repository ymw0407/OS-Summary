import type { QuizSet } from './types';

const quiz: QuizSet = {
  slug: '06-lottery-stride-cfs',
  chapterNumber: 6,
  title: 'Lottery · Stride · CFS',
  description: '비례 공정(Proportional Share) 스케줄러와 현대 리눅스 CFS 의 설계.',
  questions: [
    // ── 객관식 ─────────────────────────────────────────
    {
      id: 'ch06-mc-1',
      type: 'multiple-choice',
      prompt:
        'Lottery Scheduling 에서 프로세스 A 에 75 장, B 에 25 장의 티켓이 있다. 장기적으로 A : B 의 CPU 비율에 가장 가까운 것은?',
      options: [
        { text: '1 : 1' },
        { text: '2 : 1' },
        { text: '3 : 1' },
        { text: '5 : 1' },
      ],
      answerIndex: 2,
      explanation: '75 : 25 = 3 : 1. 시행이 많아질수록 기대 비율에 수렴.',
    },
    {
      id: 'ch06-mc-2',
      type: 'multiple-choice',
      prompt: 'Stride Scheduling 에서 티켓이 많은 프로세스의 stride 는?',
      options: [
        { text: '크다 (pass 가 빠르게 증가 → 덜 선택된다)' },
        { text: '작다 (pass 가 천천히 증가 → 자주 선택된다)' },
        { text: '티켓 수와 무관하다.' },
        { text: '티켓 수와 같다.' },
      ],
      answerIndex: 1,
      explanation:
        'stride = 큰 상수 / 티켓 수. 티켓이 많을수록 stride 가 작고, pass 증가 속도가 느려 자주 선택된다.',
    },
    {
      id: 'ch06-mc-3',
      type: 'multiple-choice',
      prompt:
        'CFS(Completely Fair Scheduler) 에서 매 순간 실행할 프로세스를 고르는 규칙은?',
      options: [
        { text: '티켓 수가 가장 많은 프로세스' },
        { text: 'vruntime 이 가장 작은 프로세스' },
        { text: 'pass 값이 가장 큰 프로세스' },
        { text: '도착 시각이 가장 이른 프로세스' },
      ],
      answerIndex: 1,
      explanation:
        '지금까지 "덜 받은" 쪽 먼저. CFS 는 red-black tree 에서 가장 왼쪽(최소 vruntime) 노드를 실행한다.',
    },

    // ── 코드 빈칸 ─────────────────────────────────────
    {
      id: 'ch06-code-1',
      type: 'code-blank',
      language: 'c',
      prompt: 'Lottery scheduler 의 당첨자 선택 루프. 빈칸을 채우시오.',
      segments: [
        { kind: 'text', text: 'int winner = rand() % total_tickets;\nint counter = 0;\nproc_t *p = head;\nwhile (p) {\n    counter += p->tickets;\n    if (counter > ' },
        { kind: 'blank', answers: ['winner'], width: 8 },
        { kind: 'text', text: ')\n        break;\n    p = p->' },
        { kind: 'blank', answers: ['next'], width: 6 },
        { kind: 'text', text: ';\n}\nrun(p);\n' },
      ],
      explanation:
        '티켓 누적합이 당첨 번호를 초과하는 첫 프로세스가 당첨자.',
    },
    {
      id: 'ch06-code-2',
      type: 'code-blank',
      language: 'c',
      prompt: 'Stride Scheduler 의 핵심. 프로세스 p 를 한 번 실행한 뒤 pass 를 갱신한다.',
      segments: [
        { kind: 'text', text: '// 모든 프로세스 중 pass 가 최소인 것 선택\nproc_t *p = min_by_pass(procs);\nrun(p);\np->pass += p->' },
        { kind: 'blank', answers: ['stride'], width: 8 },
        { kind: 'text', text: ';\n\n// stride 의 정의\np->stride = ' },
        { kind: 'blank', answers: ['BIG_CONST / p->tickets', 'BIG / p->tickets', 'LARGE / p->tickets'], width: 28 },
        { kind: 'text', text: ';\n' },
      ],
      explanation:
        'stride = 상수 / tickets. 티켓 많을수록 stride ↓ → pass 증가 느림 → 자주 선택.',
    },

    // ── True / False ─────────────────────────────────
    {
      id: 'ch06-tf-1',
      type: 'true-false',
      prompt:
        'Lottery 스케줄링은 확률적이므로, 짧은 실행 구간에서는 티켓 비율과 실제 CPU 점유 비율이 크게 어긋날 수 있다.',
      answer: true,
    },
    {
      id: 'ch06-tf-2',
      type: 'true-false',
      prompt:
        'Ticket Currency 메커니즘은 사용자/그룹이 자체 단위로 티켓을 표현해도, 전역 비율은 스케줄러가 환산해 공정성을 유지하게 한다.',
      answer: true,
    },
    {
      id: 'ch06-tf-3',
      type: 'true-false',
      prompt:
        'CFS 의 sched_latency 가 48ms 이고 ready 상태 프로세스가 6 개라면, 기본 time slice 는 10ms 이다.',
      answer: false,
      explanation: '48 / 6 = 8ms. min_granularity 가 더 크면 그 값으로 클램프된다.',
    },
    {
      id: 'ch06-tf-4',
      type: 'true-false',
      prompt:
        'CFS 의 nice 값이 낮을수록 weight 가 크고, 같은 실제 실행 시간에 대해 vruntime 이 더 천천히 증가한다.',
      answer: true,
      explanation:
        'nice − 5 ≈ weight 3121. 낮은 nice = 더 중요한 프로세스 = 더 자주 선택됨.',
    },

    // ── 단답 ───────────────────────────────────────
    {
      id: 'ch06-short-1',
      type: 'short-answer',
      prompt:
        'CFS 가 ready queue 를 관리하는 자료구조의 이름은? (공백·하이픈 모두 허용)',
      answers: ['red-black tree', 'rbtree', 'red black tree', 'RB tree', 'red-black-tree'],
      explanation: 'Red-Black Tree. O(log n) 삽입/삭제/최솟값 조회.',
    },
    {
      id: 'ch06-short-2',
      type: 'short-answer',
      prompt:
        'CFS 에서 sched_latency = 48ms, min_granularity = 6ms, ready 프로세스 수 n = 10 일 때 각 프로세스의 기본 time slice 는? (숫자만, 단위 ms)',
      answers: ['6', '6ms', '6 ms'],
      hint: '48/n 과 min_granularity 중 큰 값',
      explanation:
        '48 / 10 = 4.8ms < min_granularity(6ms) 이므로 6ms 로 바닥 보정.',
    },

    // ── 서술형 ────────────────────────────────────────
    {
      id: 'ch06-essay-1',
      type: 'essay',
      prompt:
        'Lottery 와 Stride 의 공통 목표와 차이점을, 각 방식이 남긴 한계와 함께 설명하시오.',
      modelAnswer:
        '공통 목표는 "티켓/비율로 각 프로세스의 CPU 몫을 표현하고, 그 비율에 맞게 스케줄한다" 는 비례 공정성(Proportional Share) 이다.\n\n차이:\n- Lottery 는 확률적. 매 time slice 마다 무작위 추첨으로 프로세스를 뽑는다. 장점은 상태가 단순(현재 티켓 수만 있으면 됨)하다는 것, 단점은 단기 구간에서 비율 편차가 크고 공정성이 보장되지 않는다는 점이다.\n- Stride 는 결정적. 각 프로세스에 stride = 상수/티켓수를 두고, pass 가 최소인 쪽을 실행한 후 stride 만큼 증가시킨다. 장점은 랜덤성이 없이 정확한 비율을 만들 수 있다는 것, 단점은 pass 상태를 유지해야 하고 새 프로세스의 pass = 0 문제로 잠시 CPU 를 독점할 수 있다는 점이다.',
      rubric: [
        '공통 목표(비례 공정성) 언급',
        '확률적 vs 결정적 대비',
        '각각의 한계(Lottery 편차 / Stride pass=0 문제)',
      ],
    },
    {
      id: 'ch06-essay-2',
      type: 'essay',
      prompt:
        'CFS 가 (1) sched_latency · min_granularity, (2) nice 값과 weight, (3) vruntime 세 요소를 어떻게 결합해 "공정함 + 정책적 차등" 을 동시에 달성하는지 설명하시오.',
      modelAnswer:
        '(1) sched_latency 는 "모두가 한 번씩 도는 기대 주기" 로, n 개의 ready 프로세스가 있을 때 기본 time slice = sched_latency / n. 단 min_granularity 로 하한을 둬서 프로세스 수가 많아져도 context switch 가 지나치게 빈번해지지 않도록 한다.\n\n(2) nice 를 weight 로 매핑(nice 0 → weight 1024 등). 각 프로세스의 time slice = (weight_i / Σweight) × sched_latency 로 가중 분배된다. 높은 우선순위(낮은 nice)는 더 긴 슬라이스를 받는다.\n\n(3) vruntime = 실제 실행 시간 × (weight_0 / weight_i). 즉 우선순위가 높을수록 vruntime 이 느리게 증가한다. 스케줄러는 항상 vruntime 이 최소인 프로세스를 고른다.\n\n결과적으로 (3) 이 "덜 받은 쪽 먼저" 라는 공정성을, (2) 가 nice 기반의 정책적 차등을 반영하며, (1) 이 context switch 빈도와 반응성의 균형을 관리한다.',
      rubric: [
        'sched_latency / min_granularity 역할',
        'nice → weight 매핑',
        'vruntime 가중치 공식과 선택 규칙',
      ],
    },
  ],
};

export default quiz;
