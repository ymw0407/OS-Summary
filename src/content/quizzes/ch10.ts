import type { QuizSet } from './types';

const quiz: QuizSet = {
  slug: '10-segmentation',
  chapterNumber: 10,
  title: 'Segmentation',
  description: '세그먼트 단위 base/bound, direction · protection bit, 그리고 external fragmentation.',
  questions: [
    // ── 객관식 ─────────────────────────────────────────
    {
      id: 'ch10-mc-1',
      type: 'multiple-choice',
      prompt:
        'Segmentation 에서 가상 주소 4200 (heap 세그먼트, heap 시작 가상 주소 4096, heap base 34KB) 의 물리 주소는?',
      options: [
        { text: '34,304' },
        { text: '34,920' },
        { text: '38,296' },
        { text: '38,192' },
      ],
      answerIndex: 1,
      explanation:
        'offset = 4200 − 4096 = 104. PA = 34 × 1024 + 104 = 34,816 + 104 = 34,920.',
    },
    {
      id: 'ch10-mc-2',
      type: 'multiple-choice',
      prompt: '세그먼트의 "direction bit" 가 필요한 가장 큰 이유는?',
      options: [
        { text: 'code 세그먼트를 공유하기 위해' },
        { text: 'stack 처럼 반대 방향으로 자라는 세그먼트를 처리하기 위해' },
        { text: 'heap 의 크기를 동적으로 조절하기 위해' },
        { text: '캐시 라인을 맞추기 위해' },
      ],
      answerIndex: 1,
      explanation: 'stack 은 역방향으로 자라므로 offset 계산 방법이 달라야 한다.',
    },
    {
      id: 'ch10-mc-3',
      type: 'multiple-choice',
      prompt:
        '세그먼트 번호를 "가상 주소의 상위 비트" 에 넣어 식별하는 방식의 단점은?',
      options: [
        { text: '하드웨어 비용이 크다.' },
        { text: '상위 비트를 세그먼트 번호로 떼어 쓰는 만큼 주소 표현력이 줄어든다.' },
        { text: '보호가 약해진다.' },
        { text: 'code 공유가 불가능해진다.' },
      ],
      answerIndex: 1,
      explanation:
        'Explicit 방식은 주소 비트 일부를 세그먼트 인덱스로 소모한다.',
    },

    // ── 코드 빈칸 ─────────────────────────────────────
    {
      id: 'ch10-code-1',
      type: 'code-blank',
      language: 'c',
      prompt:
        '상위 2 비트를 세그먼트 번호로, 나머지를 offset 으로 분리하는 코드. 14-bit 가상 주소 기준.',
      segments: [
        { kind: 'text', text: '// va 는 14-bit: [세그 2][offset 12]\nuint16_t seg = (va >> ' },
        { kind: 'blank', answers: ['12'], width: 4 },
        { kind: 'text', text: ') & 0x3;\nuint16_t off = va & ' },
        { kind: 'blank', answers: ['0xFFF', '0xfff', '4095'], width: 8 },
        { kind: 'text', text: ';\n\nif (off >= seg_table[seg].size) raise_segfault();\nuint32_t pa = seg_table[seg].base + off;\n' },
      ],
      explanation:
        '12 비트 offset 의 마스크는 0xFFF. 상위 2 비트(>>12 & 0x3) 가 세그먼트 번호.',
    },
    {
      id: 'ch10-code-2',
      type: 'code-blank',
      language: 'c',
      prompt:
        'stack 처럼 grows-negative 세그먼트의 offset 계산. MAX_SEG 는 해당 세그먼트의 최대 크기.',
      segments: [
        { kind: 'text', text: 'int32_t offset;\nif (seg_table[seg].grows_positive) {\n    offset = va_offset;\n} else {\n    offset = va_offset - ' },
        { kind: 'blank', answers: ['MAX_SEG', 'MAX', 'MAX_SIZE'], width: 10 },
        { kind: 'text', text: ';           // 음수\n}\n// 경계 검사 후\nuint32_t pa = seg_table[seg].base + ' },
        { kind: 'blank', answers: ['offset', 'off'], width: 8 },
        { kind: 'text', text: ';\n' },
      ],
      explanation:
        'grows-negative 에서는 va_offset − MAX 가 음수의 offset 이 되어 base 에서 차감되는 효과.',
    },

    // ── True / False ─────────────────────────────────
    {
      id: 'ch10-tf-1',
      type: 'true-false',
      prompt:
        '세그먼트 단위 protection bit(예: code 는 read-execute) 를 두면, 코드 영역을 실수로 덮어쓰는 것을 하드웨어가 차단할 수 있다.',
      answer: true,
    },
    {
      id: 'ch10-tf-2',
      type: 'true-false',
      prompt:
        '세그먼테이션에서도 내부 단편화(internal fragmentation) 가 주요 문제이다.',
      answer: false,
      explanation:
        '세그먼트는 가변 크기이므로 외부 단편화(external fragmentation) 가 문제.',
    },
    {
      id: 'ch10-tf-3',
      type: 'true-false',
      prompt:
        'Compaction 은 external fragmentation 을 줄이는 방법이지만, 실행 중 세그먼트 이동 + 메모리 복사 + base 재설정으로 비용이 크다.',
      answer: true,
    },
    {
      id: 'ch10-tf-4',
      type: 'true-false',
      prompt:
        '같은 프로그램의 여러 인스턴스가 실행될 때 code 세그먼트를 공유해 물리 메모리를 절약하는 기법의 전제는 "code 세그먼트가 read-only 로 보호되어 있다" 는 점이다.',
      answer: true,
    },

    // ── 단답 ───────────────────────────────────────
    {
      id: 'ch10-short-1',
      type: 'short-answer',
      prompt:
        '가변 크기 세그먼트를 물리 메모리에 여기저기 배치하다 보면 "총량은 충분한데 연속 공간이 없어" 새 세그먼트를 못 넣는 문제가 생긴다. 이 문제 이름은? (영문)',
      answers: ['external fragmentation', '외부 단편화', 'External Fragmentation'],
      explanation: 'External Fragmentation — 세그먼트 같은 가변 크기 할당의 근본 난제.',
    },
    {
      id: 'ch10-short-2',
      type: 'short-answer',
      prompt:
        '세그먼트 번호를 "주소의 상위 비트" 가 아니라 "어느 레지스터로 접근했느냐(PC=code, SP=stack 등)" 로 추정하는 방식의 이름은? (영문)',
      answers: ['implicit', 'Implicit', 'implicit segmentation'],
      explanation: 'Implicit 방식. Explicit 과 달리 주소 표현력을 희생하지 않는다.',
    },

    // ── 서술형 ────────────────────────────────────────
    {
      id: 'ch10-essay-1',
      type: 'essay',
      prompt:
        'Segmentation 이 Base & Bound 에 비해 가진 장점과, 새롭게 발생시킨 문제를 설명하시오.',
      modelAnswer:
        '장점:\n- Sparse Address Space 지원: code, heap, stack 을 각각 독립적으로 배치하므로, 실제 사용하는 세그먼트 크기만큼만 물리 메모리를 소모한다. Base & Bound 의 "hole 까지 차지하는" 낭비를 피한다.\n- 세그먼트별 속성 제어: direction bit 로 반대 방향 성장을 지원하고, protection bit 로 read-only / read-write 등을 다르게 설정해 보호와 공유를 가능하게 한다.\n- Code Sharing: read-only 로 보호된 code 세그먼트를 물리적으로 하나 두고 여러 프로세스가 공유해 메모리 절약.\n\n새 문제:\n- External Fragmentation: 가변 크기 세그먼트를 여기저기 놓다 보면 작은 빈틈들이 많이 생기고, 총량은 충분한데 "큰 연속 공간" 이 없어 새 세그먼트를 받지 못하게 된다.\n- Compaction 으로 일부 해소 가능하지만 비싸다.\n- 이 문제가 "가변 크기 할당의 근본 한계" 임을 드러내, 다음 단계인 고정 크기 Paging 으로의 전환을 유도한다.',
      rubric: [
        'Sparse address space · direction · protection · sharing 중 2 개 이상 언급',
        'External fragmentation 문제 제시',
        'Compaction 의 한계 또는 paging 연결',
      ],
    },
    {
      id: 'ch10-essay-2',
      type: 'essay',
      prompt:
        '세그먼트 식별의 Explicit 방식과 Implicit 방식을 설명하고 각자의 장단점을 비교하시오.',
      modelAnswer:
        'Explicit 방식은 가상 주소의 상위 비트 일부를 세그먼트 번호로 할당한다. 예를 들어 14-bit 주소에서 상위 2 비트를 세그먼트 번호, 나머지 12 비트를 offset 으로 사용한다. 장점은 CPU 하드웨어가 어느 세그먼트인지 직접적으로 알 수 있다는 것, 단점은 상위 비트를 소모하므로 동일한 address space 크기에서 주소 표현력이 줄어든다는 것이다.\n\nImplicit 방식은 주소 자체에는 세그먼트 번호가 없고, 그 주소를 어느 레지스터로 접근했는지에 따라 세그먼트를 추정한다. PC 로 가져오면 code, SP 로 접근하면 stack 세그먼트 등으로 분류한다. 장점은 주소 공간 전체를 offset 으로 쓸 수 있어 표현력 손해가 없다는 것, 단점은 분류 규칙이 암묵적이라 일반 포인터로 접근하는 데이터는 규칙에 맞게 처리하기 까다롭다는 점이다.',
      rubric: [
        '두 방식의 메커니즘 차이',
        '표현력 / 규칙 명확성 등 trade-off',
        '실제 CPU 가 두 방식을 모두 썼다는 사실(선택)',
      ],
    },
  ],
};

export default quiz;
