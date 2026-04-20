import type { QuizSet } from './types';

const quiz: QuizSet = {
  slug: '08-address-space',
  chapterNumber: 8,
  title: 'Address Space',
  description: '메모리 가상화의 첫 추상화 — 가상 주소 공간의 개념과 영역 구성.',
  questions: [
    // ── 객관식 ─────────────────────────────────────────
    {
      id: 'ch08-mc-1',
      type: 'multiple-choice',
      prompt:
        '가상 주소 공간(Virtual Address Space) 의 장점으로 가장 적절한 것은?',
      options: [
        { text: '프로그램이 직접 물리 메모리를 조작할 수 있어 빠르다.' },
        { text: '프로세스 간 격리 및 프로그래머의 단순화된 추상.' },
        { text: '페이지 테이블을 없애 오버헤드가 사라진다.' },
        { text: '스왑이 필요 없어진다.' },
      ],
      answerIndex: 1,
      explanation:
        '가상 주소 공간의 본질은 "격리 + 단순화" 다. 페이지 테이블과 swap 은 오히려 이 추상화를 구현하는 도구.',
    },
    {
      id: 'ch08-mc-2',
      type: 'multiple-choice',
      prompt: '다음 중 heap 과 stack 에 대한 설명으로 옳지 않은 것은?',
      options: [
        { text: 'heap 은 낮은 주소에서 높은 주소로 자란다.' },
        { text: 'stack 은 높은 주소에서 낮은 주소로 자란다.' },
        { text: 'heap 은 프로세스가 살아 있는 동안 OS 에 의해 자동 축소된다.' },
        { text: 'stack 은 함수가 반환되면 자동으로 축소된다.' },
      ],
      answerIndex: 2,
      explanation:
        'heap 은 free() / brk 등을 거쳐야 축소된다. 자동으로 축소되지 않는다.',
    },
    {
      id: 'ch08-mc-3',
      type: 'multiple-choice',
      prompt:
        '32 bit 시스템에서 한 프로세스가 가질 수 있는 가상 주소 공간의 총 크기는?',
      options: [
        { text: '1 GB' },
        { text: '2 GB' },
        { text: '4 GB' },
        { text: '16 GB' },
      ],
      answerIndex: 2,
      explanation:
        '2^32 바이트 = 4 GB. 리눅스에서는 보통 user 2GB + kernel 2GB 로 쪼개 쓴다.',
    },

    // ── 코드 빈칸 ─────────────────────────────────────
    {
      id: 'ch08-code-1',
      type: 'code-blank',
      language: 'c',
      prompt:
        '한 프로그램의 각 영역 주소를 출력한다. 어떤 변수가 어느 영역인지 채우시오.',
      segments: [
        { kind: 'text', text: 'int global_var;           // ' },
        { kind: 'blank', answers: ['bss', 'BSS', 'data'], width: 6 },
        { kind: 'text', text: '\nint init_var = 7;         // ' },
        { kind: 'blank', answers: ['data', 'DATA'], width: 6 },
        { kind: 'text', text: '\n\nint main(void) {\n    int local = 42;       // ' },
        { kind: 'blank', answers: ['stack', 'STACK'], width: 8 },
        { kind: 'text', text: '\n    int *p = malloc(16); // ' },
        { kind: 'blank', answers: ['heap', 'HEAP'], width: 6 },
        { kind: 'text', text: '\n    printf("%p %p %p %p\\n", &global_var, &init_var, &local, p);\n    free(p);\n}\n' },
      ],
      explanation:
        'bss : 초기화 안 된 전역/정적, data : 초기화된 전역/정적, stack : 지역 변수, heap : malloc 블록.',
    },
    {
      id: 'ch08-code-2',
      type: 'code-blank',
      language: 'c',
      prompt:
        '현재 프로세스의 heap 크기를 확장하는 시스템콜 이름을 채우시오 (리눅스).',
      segments: [
        { kind: 'text', text: '// malloc 내부에서, free list 가 부족하면 OS 에 heap 확장 요청\nvoid *old_top = ' },
        { kind: 'blank', answers: ['sbrk(0)', 'sbrk', 'brk'], width: 10 },
        { kind: 'text', text: ';\n' },
        { kind: 'blank', answers: ['sbrk(size)', 'sbrk(n)', 'sbrk'], width: 14 },
        { kind: 'text', text: ';          // heap 의 top 을 size 만큼 밀어 올림\n' },
      ],
      explanation:
        'sbrk / brk 시스템콜이 heap 경계(break) 를 조정한다.',
    },

    // ── True / False ─────────────────────────────────
    {
      id: 'ch08-tf-1',
      type: 'true-false',
      prompt:
        '멀티프로그래밍에서 두 프로세스가 서로의 메모리를 침범할 수 있었던 원인은, 각 프로세스가 물리 주소를 직접 사용했기 때문이다.',
      answer: true,
    },
    {
      id: 'ch08-tf-2',
      type: 'true-false',
      prompt:
        '가상 주소 0 은 반드시 물리 주소 0 에 대응되어야 한다.',
      answer: false,
      explanation: '하드웨어 재배치(base + virtual 등)로 어디에도 놓일 수 있다.',
    },
    {
      id: 'ch08-tf-3',
      type: 'true-false',
      prompt:
        '텍스트 세그먼트(code) 가 read-only 로 보호되면, 한 프로그램의 같은 바이너리가 여러 프로세스에서 동시에 실행될 때 코드 페이지를 물리적으로 공유할 수 있다.',
      answer: true,
    },
    {
      id: 'ch08-tf-4',
      type: 'true-false',
      prompt:
        'address space 추상화는 "프로그래머는 물리 메모리의 실제 위치를 신경 쓰지 않아도 된다" 는 단순화를 제공한다.',
      answer: true,
    },

    // ── 단답 ───────────────────────────────────────
    {
      id: 'ch08-short-1',
      type: 'short-answer',
      prompt:
        '초기화되지 않은 전역 변수가 놓이는 영역의 이름은? (약어)',
      answers: ['bss', 'BSS'],
      explanation: 'BSS (Block Started by Symbol). 로더가 0 으로 초기화한다.',
    },
    {
      id: 'ch08-short-2',
      type: 'short-answer',
      prompt:
        '다음 중 "heap 이 비정상적으로 커져 stack 과 만나게 되면 무슨 fault 가 발생하는가?" (영문)',
      answers: ['segmentation fault', 'segfault', 'seg fault', 'SIGSEGV'],
      explanation: 'segmentation fault — 유효 영역을 벗어난 참조로 트랩된다.',
    },

    // ── 서술형 ────────────────────────────────────────
    {
      id: 'ch08-essay-1',
      type: 'essay',
      prompt:
        '단일 프로세스 시절에는 가상화가 필요하지 않았다. 멀티프로그래밍이 도입되면서 어떤 문제가 드러났는지, 그리고 virtual address space 가 이를 어떻게 해결하는지 설명하시오.',
      modelAnswer:
        '단일 프로세스 시대에는 OS 와 프로그램 하나만 메모리에 있었으므로, 프로그램이 물리 주소를 직접 써도 보호가 필요하지 않았다.\n\n멀티프로그래밍으로 여러 프로세스가 같은 물리 메모리에 공존하게 되자, 한 프로세스가 (의도적이든 실수든) 다른 프로세스나 OS 의 메모리 영역을 덮어쓸 위험이 생겼다. 또한 각 프로세스가 몇 번지에 놓일지를 컴파일 타임에 고정하기도 어려워졌다.\n\nVirtual address space 는 이 문제를 두 가지로 해결한다.\n1) 각 프로세스는 자기만의 가상 주소 0 ~ N 을 본다. 다른 프로세스의 가상 주소는 물리적으로 다른 프레임에 매핑되어 서로 접근할 수 없다(격리).\n2) 프로그램이 실제 물리 주소를 몰라도 된다. OS + 하드웨어가 뒤에서 가상→물리 매핑을 관리하므로, 같은 프로그램을 여러 프로세스가 동시에 돌려도 OS 가 서로 다른 프레임에 올려주면 된다(단순화).',
      rubric: [
        '단일 프로세스 → 멀티 전환에서 생긴 문제',
        '격리 관점의 해결',
        '프로그래머 단순화 관점의 해결',
      ],
    },
    {
      id: 'ch08-essay-2',
      type: 'essay',
      prompt:
        'Address Space 안의 각 영역(code, data, heap, stack) 이 어떤 용도로 쓰이는지, 크기가 어떻게 변하는지 설명하시오.',
      modelAnswer:
        '- Code(text) : 컴파일된 기계어 명령이 놓이는 읽기 전용 영역. 실행 중에는 크기가 변하지 않는다.\n- Data / BSS : 전역 · 정적 변수. 초기화 된 것은 data, 초기화 안 된 것은 bss 에 놓인다. 크기는 프로그램 로드 시점에 결정되며 실행 중에는 변하지 않는다.\n- Heap : 런타임에 malloc/free 로 동적 할당되는 영역. 낮은 주소에서 높은 주소 방향으로 자라며, sbrk/brk 로 OS 에 확장 요청할 수 있다. 해제해야만 줄어든다.\n- Stack : 함수 호출 프레임이 쌓이는 영역. LIFO. 높은 주소에서 낮은 주소로 자라며, 함수 종료와 함께 자동으로 해제된다. argc/argv/환경변수는 초기에 스택 최상단에 세팅된다.\n\nheap 과 stack 이 서로 마주보고 자라며, 그 사이의 빈 공간(hole) 이 프로세스가 확장에 쓸 수 있는 여분이다.',
      rubric: [
        '네 영역의 용도',
        '자라는 방향과 크기 변동 조건',
        'heap ↔ stack 관계(마주보며 자람)',
      ],
    },
  ],
};

export default quiz;
