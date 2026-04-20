import type { QuizSet } from './types';

const quiz: QuizSet = {
  slug: '14-smaller-tables',
  chapterNumber: 14,
  title: 'Smaller Page Tables (Multi-Level)',
  description: '선형 page table 의 크기 문제를 다단계·역변환·하이브리드로 어떻게 푸는가.',
  questions: [
    // ── 객관식 ─────────────────────────────────────────
    {
      id: 'ch14-mc-1',
      type: 'multiple-choice',
      prompt: '다단계(Multi-Level) page table 의 핵심 아이디어로 맞는 것은?',
      options: [
        { text: '페이지 크기를 키워 엔트리 수를 줄인다.' },
        { text: '페이지 테이블 자체를 page 단위로 쪼개고, 전부 invalid 인 조각은 아예 할당하지 않는다.' },
        { text: 'TLB 크기를 2 배로 늘린다.' },
        { text: '역방향 해시 테이블로 (PID, VPN) → PFN 을 저장한다.' },
      ],
      answerIndex: 1,
      explanation:
        'sparse 주소 공간에서 invalid 영역 전체는 table page 를 아예 안 만들어 절약한다.',
    },
    {
      id: 'ch14-mc-2',
      type: 'multiple-choice',
      prompt:
        'Multi-Level page table 의 대가로 지불하는 비용은?',
      options: [
        { text: 'external fragmentation 증가' },
        { text: 'TLB miss 시 메모리 접근 횟수가 단계 수만큼 늘어남' },
        { text: 'page 크기가 작아짐' },
        { text: 'Valid 비트 의미가 사라짐' },
      ],
      answerIndex: 1,
      explanation:
        '2 단계면 miss 당 1→2 회, 3 단계면 3 회 등 메모리 접근이 비례해서 늘어난다.',
    },
    {
      id: 'ch14-mc-3',
      type: 'multiple-choice',
      prompt: 'Inverted Page Table 의 장점과 단점의 조합으로 맞는 것은?',
      options: [
        { text: '장점: 프로세스 수에 따라 table 크기가 증가 / 단점: 빠른 lookup' },
        { text: '장점: 물리 메모리 크기에 비례하는 단 하나의 table / 단점: VPN→PFN 조회가 어려워 해시·검색이 필요' },
        { text: '장점: TLB 가 필요 없음 / 단점: 보호가 약함' },
        { text: '장점: 세그먼트가 자동으로 관리됨 / 단점: 페이지 크기가 가변' },
      ],
      answerIndex: 1,
      explanation:
        'PFN 기준이라 table 하나면 되지만, VPN 으로 검색하려면 해시 등 추가 자료구조 필요.',
    },

    // ── 코드 빈칸 ─────────────────────────────────────
    {
      id: 'ch14-code-1',
      type: 'code-blank',
      language: 'c',
      prompt:
        '2-단계 page table 번역. PDI / PTI / offset 순으로 분리하고 단계별 조회.',
      segments: [
        { kind: 'text', text: 'uint32_t translate(uint32_t va) {\n    uint32_t pdi    = (va >> PD_SHIFT) & PD_MASK;\n    uint32_t pti    = (va >> PT_SHIFT) & PT_MASK;\n    uint32_t offset = va & OFFSET_MASK;\n\n    pde_t pde = page_dir[pdi];\n    if (!pde.' },
        { kind: 'blank', answers: ['valid'], width: 6 },
        { kind: 'text', text: ') raise_fault();\n\n    pte_t *pt = (pte_t *)(pde.pfn << SHIFT);\n    pte_t pte = pt[' },
        { kind: 'blank', answers: ['pti'], width: 6 },
        { kind: 'text', text: '];\n    if (!pte.valid) raise_fault();\n\n    return (pte.pfn << SHIFT) | offset;\n}\n' },
      ],
      explanation:
        'pd[pdi] → (valid) → pt[pti] → (valid) → (pfn << shift) | offset.',
    },
    {
      id: 'ch14-code-2',
      type: 'code-blank',
      language: 'c',
      prompt:
        'Hybrid (Segmentation + Paging) 에서 가상 주소를 분해하는 코드의 뼈대.',
      segments: [
        { kind: 'text', text: '// VA = [segment | VPN | offset]\nuint32_t seg    = (va >> ' },
        { kind: 'blank', answers: ['SEG_SHIFT', 'seg_shift', '28'], width: 12 },
        { kind: 'text', text: ') & SEG_MASK;\nuint32_t vpn    = (va >> PAGE_SHIFT) & VPN_MASK;\nuint32_t offset = va & OFFSET_MASK;\n\npte_t *pt = seg_table[seg].' },
        { kind: 'blank', answers: ['pt_base', 'base', 'table'], width: 10 },
        { kind: 'text', text: ';  // 세그먼트마다 독립된 page table\n' },
      ],
      explanation:
        '세그먼트로 먼저 분기하여 해당 세그먼트의 page table 에서만 VPN 을 조회.',
    },

    // ── True / False ─────────────────────────────────
    {
      id: 'ch14-tf-1',
      type: 'true-false',
      prompt:
        '페이지 크기를 무작정 키우면 page table 엔트리 수는 줄지만 internal fragmentation 이 늘어난다.',
      answer: true,
    },
    {
      id: 'ch14-tf-2',
      type: 'true-false',
      prompt:
        'Hybrid(segmentation + paging) 는 세그먼트 사이의 큰 hole 은 제거하지만, 세그먼트 내부의 linear page table 은 여전히 연속적으로 존재한다.',
      answer: true,
    },
    {
      id: 'ch14-tf-3',
      type: 'true-false',
      prompt:
        '64-bit 주소 공간은 일반적으로 2 단계 page table 로 충분히 커버된다.',
      answer: false,
      explanation:
        '64-bit 는 보통 3 ~ 4 단계(리눅스 x86_64 는 PGD/P4D/PUD/PMD/PTE 구조)를 쓴다.',
    },
    {
      id: 'ch14-tf-4',
      type: 'true-false',
      prompt:
        'Inverted page table 은 프로세스 수가 많을수록 단일 선형 page table 대비 공간 절약 효과가 크다.',
      answer: true,
      explanation:
        '선형 table 은 프로세스마다 하나씩 필요한 반면, inverted 는 전체 물리 메모리 크기에 비례해 하나만 필요하다.',
    },

    // ── 단답 ───────────────────────────────────────
    {
      id: 'ch14-short-1',
      type: 'short-answer',
      prompt:
        '32-bit VA · 4KB 페이지 · 4B PTE 시스템에서 2 단계 page table 의 한 페이지(4KB) 에 들어가는 PTE 개수는? (숫자만)',
      answers: ['1024', '1,024'],
      hint: '한 페이지 크기 ÷ PTE 크기',
      explanation: '4096 / 4 = 1024 엔트리. 따라서 PTI 는 10 비트.',
    },
    {
      id: 'ch14-short-2',
      type: 'short-answer',
      prompt:
        '2 단계 page table 에서 TLB miss 가 발생했을 때, 물리 메모리 접근 횟수는 몇 회 필요한가? (데이터 접근 포함, 숫자만)',
      answers: ['3'],
      hint: 'PDE 1 + PTE 1 + data 1',
      explanation: '3 회: page directory 조회 → page table page 조회 → 실제 데이터 접근.',
    },

    // ── 서술형 ────────────────────────────────────────
    {
      id: 'ch14-essay-1',
      type: 'essay',
      prompt:
        '단일 선형 page table 의 크기 문제를 해결하는 후보로 (1) 페이지 크기 증가 (2) Hybrid (3) Multi-Level 세 가지를 비교하시오.',
      modelAnswer:
        '(1) 페이지 크기 증가: PTE 개수를 줄여 page table 자체를 작게 만들 수는 있다. 그러나 한 페이지 크기가 커지면 마지막 페이지의 미사용 공간이 커져 internal fragmentation 이 폭증한다. 공간 트레이드오프를 옮긴 것뿐이다.\n\n(2) Hybrid (Segmentation + Paging): 주소 공간을 code / heap / stack 같은 세그먼트로 나눈 뒤 각 세그먼트마다 page table 을 둔다. 세그먼트 간의 큰 hole(예: heap 과 stack 사이) 에 해당하는 엔트리는 아예 만들지 않으므로 유의미하게 절약된다. 그러나 세그먼트 내부는 여전히 선형 page table 이라, heap 이 희소하게 쓰이면 invalid 엔트리가 또 쌓인다.\n\n(3) Multi-Level: page table 을 다시 page 단위로 쪼개고, 전체가 invalid 인 table page 는 아예 할당하지 않는다. sparse 주소 공간에서 실제 사용 영역에 비례해서만 공간을 쓰므로 가장 일반적이고 효과적이다. 대신 TLB miss 시 메모리 접근이 단계 수만큼 늘어나는 시간 비용이 있다.',
      rubric: [
        '페이지 크기 증가의 한계(internal fragmentation)',
        'Hybrid 의 이득과 한계(세그먼트 내부의 희소성)',
        'Multi-Level 의 사용처와 비용(단계 수만큼 메모리 접근)',
      ],
    },
    {
      id: 'ch14-essay-2',
      type: 'essay',
      prompt:
        'Multi-Level page table 이 주소 공간이 "희소(sparse)" 할 때 특히 효과적인 이유를 예를 들어 설명하시오.',
      modelAnswer:
        '전형적인 프로세스는 32-bit 주소 공간 중 code(~MB), data, heap, stack 만 실제 사용하고, 그 사이의 큰 구간(수 GB) 은 매핑이 없다. 선형 page table 은 이 미사용 구간에 해당하는 엔트리까지 전부 invalid 로 채워 저장해야 해, 실제 사용하지 않는 영역에 대한 4MB 가량의 공간을 낭비한다.\n\nMulti-Level 에서는 page table 자체를 page 단위로 쪼개고, 상위 Page Directory 가 "이 영역에 해당하는 page table page 가 있는지" 를 한 엔트리로 표현한다. 만약 그 영역 전체가 invalid 라면 PDE 하나의 valid=0 으로만 나타내고 하위 table page 는 아예 할당하지 않는다. 예컨대 1 MB 짜리 data 와 1 MB 짜리 heap 만 쓰는 프로세스라면, 실제로 필요한 page table page 는 몇 개뿐이고 전체 공간 소비는 선형 방식의 일부에 불과하다.\n\n반면, 주소 공간 전체를 고르게 쓰는 워크로드라면 두 방식의 공간 소비 차이는 작아진다. 그러나 실제 시스템에서는 희소성이 일반적이므로 multi-level 이 기본 선택이 된다.',
      rubric: [
        '희소 주소 공간의 예시(code/data/heap/stack)',
        '선형 table 의 invalid 엔트리 낭비를 정량 비교',
        'Multi-Level 에서 상위 PDE 로 "영역 전체 없음" 표현',
      ],
    },
  ],
};

export default quiz;
