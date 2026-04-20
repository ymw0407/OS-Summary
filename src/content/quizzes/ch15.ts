import type { QuizSet } from './types';

const quiz: QuizSet = {
  slug: '15-memory-summary',
  chapterNumber: 15,
  title: '메모리 가상화 정리',
  description: 'Base/Bound 부터 Multi-Level 까지 전체 흐름 점검.',
  questions: [
    // ── 객관식 ─────────────────────────────────────────
    {
      id: 'ch15-mc-1',
      type: 'multiple-choice',
      prompt:
        '다음 기법을 "시간 vs 공간" 의 트레이드오프 축에서 볼 때 짝이 올바르게 묶인 것은?',
      options: [
        { text: 'TLB : 시간을 아낌 / Multi-Level : 공간을 아낌' },
        { text: 'TLB : 공간을 아낌 / Multi-Level : 시간을 아낌' },
        { text: '둘 다 공간을 아낀다.' },
        { text: '둘 다 시간을 아낀다.' },
      ],
      answerIndex: 0,
      explanation:
        'TLB 는 번역 시간을 줄이고, Multi-Level 은 table 공간을 줄인다. 각각 반대 축의 비용을 대신 지불한다.',
    },
    {
      id: 'ch15-mc-2',
      type: 'multiple-choice',
      prompt:
        '다음 중 "가변 크기 할당" 이 "고정 크기 할당" 으로 전환된 가장 중요한 이유는?',
      options: [
        { text: '가변 크기는 구현이 복잡하기 때문' },
        { text: '가변 크기는 external fragmentation 을 근본적으로 해결하기 어렵기 때문' },
        { text: '가변 크기는 보호가 약하기 때문' },
        { text: '가변 크기는 TLB 와 호환되지 않기 때문' },
      ],
      answerIndex: 1,
      explanation:
        '가변 크기 할당의 단편화를 극복하려고 고정 크기 paging 이 등장했다.',
    },
    {
      id: 'ch15-mc-3',
      type: 'multiple-choice',
      prompt:
        '메모리 가상화 변천사를 큰 흐름으로 가장 잘 표현한 것은?',
      options: [
        { text: 'Base/Bound → Segmentation → Paging → TLB → Multi-Level' },
        { text: 'Paging → TLB → Base/Bound → Segmentation' },
        { text: 'Segmentation → Base/Bound → Multi-Level → Paging' },
        { text: 'TLB → Multi-Level → Paging → Base/Bound' },
      ],
      answerIndex: 0,
      explanation:
        '거친 재배치 → 논리 단위 분할 → 고정 크기 → 번역 가속 → 공간 절약.',
    },

    // ── 코드 빈칸 ─────────────────────────────────────
    {
      id: 'ch15-code-1',
      type: 'code-blank',
      language: 'c',
      prompt:
        '메모리 가상화의 마지막 통합: TLB + Multi-Level page table. TLB hit 와 miss 분기를 채우시오.',
      segments: [
        { kind: 'text', text: 'uint32_t translate(uint32_t va) {\n    // 1) TLB 조회\n    tlb_entry_t *e = tlb_lookup(va >> SHIFT);\n    if (e) return (e->pfn << SHIFT) | (va & OFFSET_MASK);\n\n    // 2) Miss → Multi-level walk\n    pde_t pde = page_dir[(va >> PD_SHIFT) & PD_MASK];\n    if (!pde.valid) raise_fault();\n\n    pte_t *pt = (pte_t *)(pde.pfn << SHIFT);\n    pte_t pte = pt[(va >> PT_SHIFT) & PT_MASK];\n    if (!pte.valid) raise_fault();\n\n    // 3) TLB 에 채우고 재시도\n    tlb_' },
        { kind: 'blank', answers: ['insert', 'add', 'fill'], width: 8 },
        { kind: 'text', text: '(va >> SHIFT, pte.pfn);\n    return (pte.pfn << SHIFT) | (va & ' },
        { kind: 'blank', answers: ['OFFSET_MASK', '0xFFF'], width: 14 },
        { kind: 'text', text: ');\n}\n' },
      ],
      explanation:
        'TLB 는 시간, Multi-Level 은 공간을 담당하며 서로 보완한다.',
    },
    {
      id: 'ch15-code-2',
      type: 'code-blank',
      language: 'c',
      prompt:
        '각 가상화 기법이 푼 핵심 문제를 상수로 정리.',
      segments: [
        { kind: 'text', text: 'const char *BASE_BOUND_SOLVES    = "protection + relocation";\nconst char *SEGMENTATION_SOLVES  = "' },
        { kind: 'blank', answers: ['sparse address space', 'sparse', 'sparse AS'], width: 22 },
        { kind: 'text', text: '";\nconst char *PAGING_SOLVES        = "external fragmentation";\nconst char *TLB_SOLVES           = "' },
        { kind: 'blank', answers: ['translation overhead', 'translation', 'slow translation'], width: 22 },
        { kind: 'text', text: '";\nconst char *MULTILEVEL_SOLVES    = "page table space";\n' },
      ],
      explanation:
        '각 단계가 이전 단계가 남긴 문제를 푸는 "문제→해결→한계" 사슬.',
    },

    // ── True / False ─────────────────────────────────
    {
      id: 'ch15-tf-1',
      type: 'true-false',
      prompt:
        'Paging 이 external fragmentation 을 해결하지만, 대신 internal fragmentation 과 번역 오버헤드를 도입한다.',
      answer: true,
    },
    {
      id: 'ch15-tf-2',
      type: 'true-false',
      prompt:
        '메모리 가상화의 모든 단계는 공간(space)을 줄이는 방향으로만 진화해 왔다.',
      answer: false,
      explanation:
        '공간을 줄이는 것(Multi-Level, Inverted) 과 시간을 줄이는 것(TLB) 이 번갈아 등장했다.',
    },
    {
      id: 'ch15-tf-3',
      type: 'true-false',
      prompt:
        'Multi-Level Page Table 은 TLB 가 있기 때문에 실전에서 감당 가능한 비용을 가진다.',
      answer: true,
      explanation:
        'TLB hit rate 가 높으면 단계 수가 늘어난 비용이 실효 거의 나타나지 않는다.',
    },
    {
      id: 'ch15-tf-4',
      type: 'true-false',
      prompt:
        'Segmentation + Paging(Hybrid) 방식은 오늘날 x86/ARM 같은 주류 아키텍처의 기본 메모리 모델이다.',
      answer: false,
      explanation:
        '현대 x86/ARM 은 flat paging 위주. 세그먼트는 거의 쓰이지 않거나 플레이스홀더로 남았다.',
    },

    // ── 단답 ───────────────────────────────────────
    {
      id: 'ch15-short-1',
      type: 'short-answer',
      prompt:
        '"가변 크기 할당의 고질병" 으로 paging 등장의 결정적 원인이 된 단편화 유형은? (영문)',
      answers: ['external fragmentation', '외부 단편화', 'External Fragmentation'],
      explanation: '외부 단편화가 paging 의 동기.',
    },
    {
      id: 'ch15-short-2',
      type: 'short-answer',
      prompt:
        'TLB 가 존재하지 않고 2 단계 page table 만 있을 때, 한 번의 가상 주소 접근에 필요한 물리 메모리 접근 횟수는? (숫자만, 데이터 접근 포함)',
      answers: ['3'],
      hint: 'PDE + PTE + data',
      explanation: 'TLB 가 없으면 매 번역마다 PDE + PTE + data = 3 회.',
    },

    // ── 서술형 ────────────────────────────────────────
    {
      id: 'ch15-essay-1',
      type: 'essay',
      prompt:
        '"메모리 가상화의 변천사" 를 "문제 → 해결 → 그 해결이 낳은 새 문제" 구조로 이어 서술하시오.',
      modelAnswer:
        '초기엔 OS + 단일 프로세스만 있어 가상화가 필요 없었다. 멀티프로그래밍이 도입되자 보호와 재배치가 문제가 됐다 → Base/Bound 레지스터로 간단히 해결. 그러나 주소 공간 전체를 연속 블록으로 잡는 낭비가 문제 → Segmentation 으로 논리 단위별 분할. 이번엔 가변 크기 배치로 인한 external fragmentation 이 문제 → Paging(고정 크기) 으로 근본적 해소. 그러나 매 접근마다 page table 조회로 번역 오버헤드 2 배 → TLB 로 locality 활용해 상쇄. TLB 는 속도 문제를 풀었지만 page table 자체가 프로세스당 MB 단위로 커지는 공간 문제는 남음 → Multi-Level Page Table 로 sparse 주소 공간에 비례한 공간 사용. 64-bit 에서는 단계를 더 깊게(3, 4 단계) 사용. Inverted Page Table 은 관점을 뒤집어 물리 메모리 크기에 비례한 단일 테이블로 더 큰 절약을 노리지만, VPN→PFN 검색 비용이 커지는 시간·공간 트레이드오프를 다시 드러낸다.',
      rubric: [
        '각 단계가 앞 단계의 문제를 해결',
        '해결이 또 다른 문제(시간/공간) 를 남김',
        '마지막에 시간↔공간 축 교차 반복을 언급',
      ],
    },
    {
      id: 'ch15-essay-2',
      type: 'essay',
      prompt:
        '현대 리눅스의 x86_64 시스템에서 가상 주소 하나가 번역되어 데이터 접근까지 이르는 전 과정을 설명하시오 (TLB 포함, 4단계 페이지 테이블 가정).',
      modelAnswer:
        '1) CPU 가 가상 주소 VA 로 메모리에 접근하려 한다.\n2) MMU 의 TLB 가 (VPN, ASID) 키로 조회된다. hit 면 바로 PFN 을 얻어 offset 과 결합해 물리 주소 PA 로 접근한다 (사실상 1 사이클).\n3) miss 면 page table walk 가 시작된다. 4단계 경우 PGD → (P4D) → PUD → PMD → PTE 순으로 각 단계의 테이블에서 해당 인덱스의 엔트리를 읽어 내려가, 유효하지 않으면 page fault 를 일으킨다.\n4) 최종 PTE 에서 PFN 을 얻고, TLB 에 (VPN, ASID, PFN) 을 채워 다음 접근에 대비한다.\n5) PFN 과 offset 을 결합한 PA 로 실제 데이터를 읽거나 쓴다.\n6) 쓰기였다면 PTE 의 Dirty 비트가, 어떤 접근이든 Accessed 비트가 갱신될 수 있다(OS 또는 HW).\n7) Context switch 시에는 ASID 가 바뀌어 다른 프로세스의 TLB 엔트리와 자동으로 구분된다.',
      rubric: [
        'TLB hit / miss 분기',
        'Multi-level walk 와 각 단계에서의 valid 검사',
        '데이터 접근 및 상태 비트 갱신',
        'ASID / context switch 와의 관계(선택)',
      ],
    },
  ],
};

export default quiz;
