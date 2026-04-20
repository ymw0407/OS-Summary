import type { QuizSet } from './types';

const quiz: QuizSet = {
  slug: '11-free-space-management',
  chapterNumber: 11,
  title: 'Free-Space Management',
  description: '힙의 free list, splitting/coalescing, fit 정책, Segregated List, Buddy System.',
  questions: [
    // ── 객관식 ─────────────────────────────────────────
    {
      id: 'ch11-mc-1',
      type: 'multiple-choice',
      prompt:
        '할당자(allocator) 가 chunk 의 헤더(size / magic 등) 를 포인터 바로 앞에 숨겨 두는 가장 큰 이유는?',
      options: [
        { text: '보안을 위해' },
        { text: 'free(ptr) 호출 시 크기를 별도로 받지 않아도 해제할 수 있도록' },
        { text: '캐시 정렬을 맞추기 위해' },
        { text: '메모리 사용량을 줄이기 위해' },
      ],
      answerIndex: 1,
      explanation:
        'free 는 크기 인자가 없으므로, 헤더를 읽어 size 를 얻는다. magic 은 double-free / overflow 검증용.',
    },
    {
      id: 'ch11-mc-2',
      type: 'multiple-choice',
      prompt:
        '"best-fit" 정책의 특성으로 맞는 것은?',
      options: [
        { text: '탐색이 빠르고 자투리가 작다.' },
        { text: '탐색이 느리고 자투리(fragment)가 많이 생긴다.' },
        { text: '항상 앞에서부터 순회하므로 first-fit 과 동일하다.' },
        { text: '큰 chunk 를 우선 쪼개기 때문에 큰 요청에 불리하다.' },
      ],
      answerIndex: 1,
      explanation:
        'Best-fit 은 가장 딱 맞는 chunk 를 찾느라 전수 탐색하고, 작은 자투리가 많이 생긴다.',
    },
    {
      id: 'ch11-mc-3',
      type: 'multiple-choice',
      prompt:
        'Buddy System 의 한계로 가장 정확한 것은?',
      options: [
        { text: 'coalescing 이 복잡해 구현이 어렵다.' },
        { text: '2^k 크기의 블록만 지원해 33B 요청에도 64B 를 주는 식의 internal fragmentation 이 생긴다.' },
        { text: 'external fragmentation 이 매우 크다.' },
        { text: '주소만으로 buddy 를 계산할 수 없다.' },
      ],
      answerIndex: 1,
      explanation:
        '2 의 거듭제곱 단위라 요청 크기가 어중간하면 내부 낭비가 생긴다.',
    },

    // ── 코드 빈칸 ─────────────────────────────────────
    {
      id: 'ch11-code-1',
      type: 'code-blank',
      language: 'c',
      prompt:
        'Free chunk 의 노드 구조와 할당 chunk 의 헤더. 빈칸을 채우시오.',
      segments: [
        { kind: 'text', text: 'typedef struct free_node {\n    size_t size;\n    struct free_node *' },
        { kind: 'blank', answers: ['next'], width: 6 },
        { kind: 'text', text: ';\n} free_node_t;\n\ntypedef struct header {\n    size_t ' },
        { kind: 'blank', answers: ['size'], width: 6 },
        { kind: 'text', text: ';\n    int    magic;   // double-free 감지용\n} hdr_t;\n' },
      ],
      explanation:
        'free chunk: (size, next), allocated chunk: (size, magic) 헤더를 포인터 바로 앞에 둔다.',
    },
    {
      id: 'ch11-code-2',
      type: 'code-blank',
      language: 'c',
      prompt:
        'Buddy 블록의 주소를 size 만 주어지면 구할 수 있다. order 가 k 일 때 buddy 주소 계산을 완성하시오.',
      segments: [
        { kind: 'text', text: '// block 시작 주소 addr, 블록 크기 size = 2^k\nuintptr_t buddy = addr ^ ' },
        { kind: 'blank', answers: ['size', '(1 << k)', '1 << k'], width: 10 },
        { kind: 'text', text: ';   // XOR 로 한 비트 반전\n' },
      ],
      explanation:
        'Buddy 는 해당 크기 비트만 토글한 위치에 있다. XOR 연산이 그대로 동작.',
    },

    // ── True / False ─────────────────────────────────
    {
      id: 'ch11-tf-1',
      type: 'true-false',
      prompt:
        'Coalescing(병합) 은 방금 free 된 블록과 그 앞/뒤의 이웃 free 블록을 확인해 하나의 큰 free 블록으로 합치는 과정이다.',
      answer: true,
    },
    {
      id: 'ch11-tf-2',
      type: 'true-false',
      prompt:
        'Double free 가 발생해도 allocator 의 free list 는 항상 복구된다.',
      answer: false,
      explanation:
        '리스트 포인터가 꼬여 자신을 자신의 다음으로 가리키게 되면 사이클 / 유실이 생긴다.',
    },
    {
      id: 'ch11-tf-3',
      type: 'true-false',
      prompt:
        'Segregated list 는 "같은 크기" 요청이 반복될 때 탐색 비용을 극적으로 줄일 수 있다.',
      answer: true,
    },
    {
      id: 'ch11-tf-4',
      type: 'true-false',
      prompt:
        'Worst-fit 은 매번 가장 큰 free chunk 를 쪼개 써서, 많은 작은 요청에도 불필요하게 큰 블록을 잘라낸다.',
      answer: true,
    },

    // ── 단답 ───────────────────────────────────────
    {
      id: 'ch11-short-1',
      type: 'short-answer',
      prompt:
        'heap 이 부족할 때 malloc 이 OS 에 heap 확장을 요청하는 시스템콜 이름은? (영문 둘 중 하나)',
      answers: ['sbrk', 'brk', 'sbrk/brk'],
      explanation: '전통적인 리눅스에서는 sbrk/brk. mmap 으로도 확장 가능.',
    },
    {
      id: 'ch11-short-2',
      type: 'short-answer',
      prompt:
        'Buddy system 에서 48 B 할당을 요청하면 실제로 배정되는 블록 크기는 얼마인가? (숫자만, 바이트 단위. 최소 블록 8B 가정)',
      answers: ['64', '64B', '64 bytes'],
      explanation: '48B 는 2^6 = 64B 로 올림.',
    },

    // ── 서술형 ────────────────────────────────────────
    {
      id: 'ch11-essay-1',
      type: 'essay',
      prompt:
        'Free list 기반 할당자에서 splitting 과 coalescing 이 언제 일어나는지, 그리고 왜 필요한지 설명하시오.',
      modelAnswer:
        'Splitting: 요청된 크기보다 큰 free chunk 를 찾았을 때 발생한다. allocator 는 이 chunk 의 앞부분(또는 뒷부분)을 요청 크기만큼 잘라 사용자에게 주고, 남는 부분은 free list 에 다시 넣는다. 이렇게 하면 남은 공간이 버려지지 않고 계속 재사용될 수 있다.\n\nCoalescing: free(ptr) 시 해당 chunk 의 이전 / 이후 이웃이 free 상태라면 하나의 더 큰 free chunk 로 합치는 과정이다. 병합을 하지 않으면 시간이 갈수록 free list 에 작은 조각들이 쌓이고, 큰 요청을 받았을 때 공간은 남아 있음에도 할당에 실패하게 되는 단편화가 심해진다.\n\n즉 splitting 은 "공간을 쪼개서라도 최대한 많이 쓰기 위함", coalescing 은 "작은 조각이 쌓여 단편화되지 않도록 큰 조각을 복원하기 위함" 이다.',
      rubric: [
        'Splitting 의 조건과 효과',
        'Coalescing 의 조건과 효과',
        '두 연산이 단편화에 주는 영향',
      ],
    },
    {
      id: 'ch11-essay-2',
      type: 'essay',
      prompt:
        'best-fit / worst-fit / first-fit / next-fit 네 정책을 탐색 비용과 단편화 관점에서 비교하시오.',
      modelAnswer:
        '- best-fit: 매 요청마다 free list 를 전수 탐색해 요청 크기와 가장 근접한 chunk 를 고른다. 탐색 비용이 크고, 남은 자투리가 매우 작게 생겨 나중에 쓸모없어질 확률이 높다 → 작은 조각 단편화.\n- worst-fit: 항상 가장 큰 chunk 를 골라 쪼개 쓴다. 큰 덩어리를 잘게 쪼개기 때문에 역시 자투리가 늘고, 큰 요청을 받을 수 있는 블록이 빠르게 고갈된다.\n- first-fit: 앞에서부터 스캔해 맞는 첫 chunk 를 쓴다. 탐색이 짧고, 앞쪽에 자투리가 몰리는 경향이 있다.\n- next-fit: 직전 탐색 위치 이후부터 이어서 스캔. 자투리가 리스트 전체로 고르게 분산되고, 특정 구간 편중을 피한다.\n\n실전에서는 first-fit 과 next-fit 의 변형이 많이 쓰이며, 더 나아가 Segregated list 나 Buddy system 으로 특정 크기 분포에 맞춘 최적화를 한다.',
      rubric: [
        '네 정책의 동작 원리',
        '탐색 비용 / 단편화 특성 대비',
        '실전 관점의 코멘트',
      ],
    },
  ],
};

export default quiz;
