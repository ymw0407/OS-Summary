import type { QuizSet } from './types';

const quiz: QuizSet = {
  slug: '05-mlfq',
  chapterNumber: 5,
  title: 'MLFQ — Multi-Level Feedback Queue',
  description: '실행 시간을 모른 채, 과거 행동으로 미래를 추정하는 스케줄러.',
  questions: [
    // ── 객관식 ─────────────────────────────────────────
    {
      id: 'ch05-mc-1',
      type: 'multiple-choice',
      prompt: 'MLFQ 의 "기본 4 규칙" 중 잘못 설명한 것은?',
      options: [
        { text: '높은 우선순위 큐의 작업이 낮은 큐의 작업보다 먼저 실행된다.' },
        { text: '같은 큐 안에서는 Round Robin 으로 돈다.' },
        { text: '새 작업은 가장 낮은 우선순위 큐에서 시작한다.' },
        { text: '자신의 time slice 를 다 쓰면 한 단계 강등된다.' },
      ],
      answerIndex: 2,
      explanation:
        '새 작업은 "일단 짧다" 고 가정하고 최상위 큐에서 시작한다. 길게 돌리면 그때 강등된다.',
    },
    {
      id: 'ch05-mc-2',
      type: 'multiple-choice',
      prompt: 'MLFQ 에서 Starvation 을 완화하기 위해 추가된 규칙은?',
      options: [
        { text: '낮은 큐의 작업이 오래 기다리면 강제 종료한다.' },
        { text: '일정 시간 S 마다 모든 작업의 우선순위를 최상위 큐로 끌어올린다 (Priority Boost).' },
        { text: '새 작업의 time slice 를 두 배로 늘린다.' },
        { text: '우선순위가 같은 작업끼리는 FIFO 로만 돈다.' },
      ],
      answerIndex: 1,
      explanation:
        'Priority Boost(Rule 5). 모든 작업을 주기적으로 최상위 큐로 승급시켜 굶는 일을 막고, 변화한 행동을 재평가한다.',
    },
    {
      id: 'ch05-mc-3',
      type: 'multiple-choice',
      prompt:
        '"Gaming" 문제(프로세스가 time slice 만료 직전에 짧게 I/O 를 걸어 강등을 피하는 행위)를 막기 위한 개선은?',
      options: [
        { text: 'Round Robin 을 FIFO 로 바꾼다.' },
        { text: '우선순위 큐를 하나만 둔다.' },
        { text: '한 번의 time slice 가 아니라, 해당 큐에서의 누적 allotment 로 강등 여부를 판단한다.' },
        { text: 'I/O 호출 횟수를 세서 일정 이상이면 강등한다.' },
      ],
      answerIndex: 2,
      explanation:
        'Better Accounting. 양보 횟수와 관계 없이 같은 큐에서 총 사용한 시간이 allotment 를 넘으면 강등.',
    },

    // ── 코드 빈칸 ─────────────────────────────────────
    {
      id: 'ch05-code-1',
      type: 'code-blank',
      language: 'c',
      prompt:
        '개선된 규칙 4(누적 allotment 기반 강등) 의 핵심이다. 빈칸을 채우시오.',
      segments: [
        { kind: 'text', text: 'void on_timer_tick(proc_t *p) {\n    p->used_in_level += TICK_MS;\n    if (p->used_in_level >= ALLOTMENT[p->level]) {\n        p->level = min(p->level + ' },
        { kind: 'blank', answers: ['1'], width: 3 },
        { kind: 'text', text: ', MAX_LEVEL);\n        p->used_in_level = ' },
        { kind: 'blank', answers: ['0'], width: 3 },
        { kind: 'text', text: ';\n    }\n}\n' },
      ],
      explanation:
        '레벨을 한 단계 낮추고, 새 레벨에서는 누적 사용량을 0 으로 초기화한다.',
    },
    {
      id: 'ch05-code-2',
      type: 'code-blank',
      language: 'c',
      prompt: 'Priority Boost 를 S 주기로 수행하는 함수다.',
      segments: [
        { kind: 'text', text: 'void priority_boost(void) {\n    for (int i = 0; i < N; i++) {\n        procs[i].level = ' },
        { kind: 'blank', answers: ['0', 'TOP', 'MAX'], width: 6 },
        { kind: 'text', text: ';             // 최상위 큐\n        procs[i].used_in_level = 0;\n    }\n}\n\n// scheduler 초기화\nregister_periodic(' },
        { kind: 'blank', answers: ['S', 'BOOST_PERIOD'], width: 16 },
        { kind: 'text', text: ', priority_boost);\n' },
      ],
      explanation:
        '모든 프로세스를 최상위 큐로 끌어올리고 누적 사용량 초기화. 주기는 정책 파라미터 S.',
    },

    // ── True / False ─────────────────────────────────
    {
      id: 'ch05-tf-1',
      type: 'true-false',
      prompt:
        'MLFQ 의 기본 규칙만으로는 인터랙티브 작업이 항상 최상위 큐에 머물 수 있다.',
      answer: true,
      explanation:
        '짧게 돌고 자주 양보하므로 강등되지 않고 상위에 남는다. 그 대신 CPU-bound 는 하위로 밀린다.',
    },
    {
      id: 'ch05-tf-2',
      type: 'true-false',
      prompt:
        '하위 큐일수록 time slice 를 길게 주는 이유는, CPU-bound 작업의 context switch 오버헤드를 줄이기 위해서다.',
      answer: true,
    },
    {
      id: 'ch05-tf-3',
      type: 'true-false',
      prompt:
        'Priority Boost 는 Gaming 문제를 완전히 해결한다.',
      answer: false,
      explanation:
        'Boost 는 Starvation / Behavior Change 를 해결할 뿐, Gaming 은 Better Accounting 이 필요하다.',
    },
    {
      id: 'ch05-tf-4',
      type: 'true-false',
      prompt:
        'Solaris 의 time-sharing 스케줄러는 전형적인 MLFQ 로, 약 60개 우선순위 큐와 주기적 boost 를 사용한다.',
      answer: true,
    },

    // ── 단답 ───────────────────────────────────────
    {
      id: 'ch05-short-1',
      type: 'short-answer',
      prompt:
        'MLFQ 의 세 가지 함정으로 꼽히는 문제 이름을 쉼표로 구분해 나열하시오. (한글 또는 영어, 순서 무관)',
      answers: [
        'Starvation, Gaming, Behavior Change',
        'starvation, gaming, behavior change',
        '굶주림, 게이밍, 행동 변화',
        'starvation, gaming, behavior-change',
      ],
      explanation:
        '하위 큐의 Starvation, time slice 꼼수(Gaming), 작업 성격의 Behavior Change.',
    },
    {
      id: 'ch05-short-2',
      type: 'short-answer',
      prompt:
        'MLFQ 에서 time slice 가 상위 큐 10ms, 하위 큐 40ms 라 하자. 한 작업이 상위에서 100ms 를 누적 사용했다면, 해당 작업은 몇 번 강등되었을까? (숫자만, allotment = 그 큐의 time slice 라고 가정)',
      answers: ['1'],
      hint: '한 번 강등되면 하위 큐로 내려와 적용 규칙이 바뀐다',
      explanation:
        '상위 allotment 10ms 사용 후 강등(1 회). 이후 하위에서 40ms 씩 카운트되고, 아직 다음 레벨 강등 기준(40ms × 하위 allotment)을 넘지 못했다고 가정.',
    },

    // ── 서술형 ────────────────────────────────────────
    {
      id: 'ch05-essay-1',
      type: 'essay',
      prompt:
        'MLFQ 가 "실행 시간을 몰라도" SJF/STCF 같은 효과를 낼 수 있는 원리를 설명하시오.',
      modelAnswer:
        'MLFQ 의 핵심 직관은 "과거 행동으로 미래를 추정" 이다.\n- 새 작업은 일단 짧을 거라고 가정하고 최상위 큐에서 시작한다.\n- 자발적으로 자주 CPU 를 양보하는 (I/O-bound, 인터랙티브) 작업은 강등되지 않고 상위에 머문다. 이들은 SJF 가 골랐을 "짧은 작업" 과 같은 성격이다.\n- 반대로 CPU 를 길게 쓰는 작업은 time slice (또는 allotment) 를 다 써서 점점 하위 큐로 내려간다. 이는 "긴 작업" 을 나중으로 미루는 효과다.\n- 즉 OS 는 실행 시간을 미리 알 필요 없이, 런타임에 관찰되는 행동 패턴으로 우선순위를 학습해 SJF/STCF 와 비슷한 결과(짧은 작업은 빨리 끝나게)를 얻는다.',
      rubric: [
        '"과거 행동으로 미래 추정" 아이디어',
        '상위 유지(I/O-bound) / 강등(CPU-bound) 분리',
        'Oracle 없이도 SJF 와 유사한 효과',
      ],
    },
    {
      id: 'ch05-essay-2',
      type: 'essay',
      prompt:
        'MLFQ 의 세 가지 함정(Starvation / Gaming / Behavior Change)을 각각 정의하고, 이를 해결하기 위해 도입된 규칙을 설명하시오.',
      modelAnswer:
        'Starvation: 상위 큐에 작업이 계속 들어오면 하위 큐 작업이 영원히 CPU 를 받지 못한다. → Rule 5 Priority Boost(주기 S 마다 모든 작업을 최상위 큐로 끌어올림) 로 해결.\n\nGaming: time slice 거의 끝날 즈음 짧게 I/O 를 걸어 양보하는 척하면 강등 규칙을 회피해 상위에 남을 수 있다. → Better Accounting(해당 큐에서의 누적 사용량으로 강등 여부를 판단) 로 해결.\n\nBehavior Change: 처음엔 CPU-bound 였다가 뒤늦게 인터랙티브 성격으로 바뀌는(또는 반대) 경우 한번 강등되면 회복이 어렵다. → 역시 주기적 Priority Boost 로 재평가 기회를 제공해 해결.',
      rubric: [
        '세 문제의 정의 명확',
        'Priority Boost 가 어떤 문제를 해결하는지',
        'Better Accounting 의 역할',
      ],
    },
  ],
};

export default quiz;
