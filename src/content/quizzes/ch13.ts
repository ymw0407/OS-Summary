import type { QuizSet } from './types';

const quiz: QuizSet = {
  slug: '13-tlb',
  chapterNumber: 13,
  title: 'TLB — Translation Lookaside Buffer',
  description: '번역 가속의 핵심. locality 에 힘입은 MMU 내부 캐시.',
  questions: [
    // ── 객관식 ─────────────────────────────────────────
    {
      id: 'ch13-mc-1',
      type: 'multiple-choice',
      prompt: 'TLB 가 가장 잘 동작하는 조건은?',
      options: [
        { text: 'random 한 주소 접근' },
        { text: '공간적/시간적 locality 가 높은 접근 패턴' },
        { text: 'write 가 많은 워크로드' },
        { text: '큰 페이지보다 작은 페이지' },
      ],
      answerIndex: 1,
      explanation:
        'Locality 덕분에 같은 페이지에 대한 번역이 반복되어 hit rate 가 높아진다.',
    },
    {
      id: 'ch13-mc-2',
      type: 'multiple-choice',
      prompt:
        'Context switch 시 TLB 가 문제를 일으킬 수 있는 이유는?',
      options: [
        { text: '프로세스 A 의 (VPN, PFN) 매핑이 프로세스 B 에서는 잘못된 PFN 으로 해석될 수 있어서' },
        { text: 'TLB 가 항상 write-through 캐시이기 때문에' },
        { text: 'TLB 가 kernel mode 에서 꺼지기 때문에' },
        { text: 'TLB miss 가 user mode 에서만 발생하기 때문에' },
      ],
      answerIndex: 0,
      explanation:
        'TLB entry 는 단순 (VPN, PFN) 이라 프로세스 구분이 안 된다. 해결책: flush 또는 ASID.',
    },
    {
      id: 'ch13-mc-3',
      type: 'multiple-choice',
      prompt:
        'HW-managed TLB 와 SW-managed TLB 의 차이로 옳은 것은?',
      options: [
        { text: 'HW-managed 는 OS 가 매 TLB miss 를 처리한다.' },
        { text: 'SW-managed 는 OS trap handler 가 TLB miss 를 처리한다.' },
        { text: 'SW-managed 는 페이지 테이블을 사용하지 않는다.' },
        { text: '두 방식 모두 미리 모든 매핑을 TLB 에 올려 둔다.' },
      ],
      answerIndex: 1,
      explanation:
        'HW-managed(x86 류): 하드웨어가 page table walk. SW-managed(일부 RISC): OS 가 trap 으로 처리.',
    },

    // ── 코드 빈칸 ─────────────────────────────────────
    {
      id: 'ch13-code-1',
      type: 'code-blank',
      language: 'c',
      prompt:
        'TLB lookup 의 흐름. hit 면 바로 PFN 으로, miss 면 page table 로.',
      segments: [
        { kind: 'text', text: 'uint32_t translate(uint32_t va) {\n    uint32_t vpn = va >> SHIFT;\n    tlb_entry_t *e = tlb_lookup(vpn);\n    if (e) {\n        // HIT\n        return (e->pfn << SHIFT) | (va & OFFSET_MASK);\n    }\n    // MISS — page table 로\n    pte_t pte = page_table[vpn];\n    tlb_' },
        { kind: 'blank', answers: ['insert', 'add', 'fill'], width: 8 },
        { kind: 'text', text: '(vpn, pte.pfn);\n    return (pte.pfn << SHIFT) | (va & ' },
        { kind: 'blank', answers: ['OFFSET_MASK', '0xFFF'], width: 14 },
        { kind: 'text', text: ');\n}\n' },
      ],
      explanation:
        'miss 시 page table 에서 pte 를 읽고 TLB 에 채운 뒤 계산.',
    },
    {
      id: 'ch13-code-2',
      type: 'code-blank',
      language: 'c',
      prompt:
        'ASID 태그를 사용하는 TLB 엔트리의 키를 완성하시오.',
      segments: [
        { kind: 'text', text: 'typedef struct tlb_entry {\n    uint32_t vpn;\n    uint32_t ' },
        { kind: 'blank', answers: ['asid', 'ASID'], width: 6 },
        { kind: 'text', text: ';    // 프로세스 구분\n    uint32_t pfn;\n    uint8_t  prot;\n} tlb_entry_t;\n\n// 조회 시 키는 (vpn, asid) 쌍\ntlb_entry_t *tlb_lookup(uint32_t vpn) {\n    uint32_t cur = current_' },
        { kind: 'blank', answers: ['asid', 'ASID'], width: 6 },
        { kind: 'text', text: ';\n    // vpn 과 cur asid 가 모두 일치해야 hit\n    // ...\n}\n' },
      ],
      explanation:
        'ASID (Address Space ID) 를 태그해 프로세스를 구분. context switch 시 flush 하지 않아도 됨.',
    },

    // ── True / False ─────────────────────────────────
    {
      id: 'ch13-tf-1',
      type: 'true-false',
      prompt:
        '배열을 순차로 읽는 코드는 TLB hit rate 가 높다. 같은 페이지 안의 여러 요소가 한 번의 번역으로 접근되기 때문이다.',
      answer: true,
    },
    {
      id: 'ch13-tf-2',
      type: 'true-false',
      prompt:
        '공유 페이지(예: 같은 라이브러리의 코드) 는 ASID 가 다른 두 TLB 엔트리가 동일한 PFN 을 가리키게 되어 자연스럽게 처리된다.',
      answer: true,
    },
    {
      id: 'ch13-tf-3',
      type: 'true-false',
      prompt:
        'LRU(Least Recently Used) 교체는 temporal locality 가 있는 워크로드에서 합리적인 정책이다.',
      answer: true,
    },
    {
      id: 'ch13-tf-4',
      type: 'true-false',
      prompt:
        'TLB 는 지역성을 활용해 번역 비용을 줄이지만, page table 자체가 메모리에 차지하는 공간 문제를 해결해 주지는 않는다.',
      answer: true,
    },

    // ── 단답 ───────────────────────────────────────
    {
      id: 'ch13-short-1',
      type: 'short-answer',
      prompt:
        'TLB 에서 entry 수 64개이고 히트율이 90% 일 때, 평균 번역 비용을 메모리 접근 1 사이클 기준으로 계산하면 몇 사이클인가? (page table 접근은 1 사이클 추가, TLB 접근은 무시)',
      answers: ['0.1', '0.1 사이클'],
      hint: 'miss rate × 추가 접근',
      explanation: '0.1 * 1 + 0.9 * 0 = 0.1 사이클/번역 (TLB 접근 비용은 무시).',
    },
    {
      id: 'ch13-short-2',
      type: 'short-answer',
      prompt:
        'TLB 엔트리에 프로세스를 구분하기 위해 추가로 태그하는 식별자의 이름은? (약어)',
      answers: ['ASID', 'asid'],
      explanation: 'Address Space ID.',
    },

    // ── 서술형 ────────────────────────────────────────
    {
      id: 'ch13-essay-1',
      type: 'essay',
      prompt:
        'TLB 가 왜 필요한지, 그리고 TLB miss 가 발생했을 때 HW-managed / SW-managed 방식이 각각 어떻게 처리하는지 설명하시오.',
      modelAnswer:
        'Paging 을 쓰면 매 메모리 접근마다 page table 에서 PTE 를 읽어야 해 사실상 접근 횟수가 2 배가 된다. TLB 는 MMU 내부에 두는 작은 하드웨어 캐시로, 최근에 번역한 (VPN → PFN) 매핑을 보관해 hit 면 page table 방문을 생략한다. locality 가 있는 보통 워크로드에서는 대부분의 번역이 hit 로 처리되어 번역 오버헤드가 크게 줄어든다.\n\nMiss 처리:\n- HW-managed (x86 등): 하드웨어가 직접 page table 을 walk 해서 PTE 를 읽고 TLB 에 채워 넣은 뒤 명령을 재시도한다. OS 개입이 없어 빠르지만, 페이지 테이블 구조가 하드웨어에 의해 고정된다.\n- SW-managed (일부 RISC): TLB miss 가 일어나면 예외(트랩)를 발생시켜 OS 의 trap handler 로 진입한다. 핸들러가 page table 을 순회해 필요한 PTE 를 찾고, 명시적 명령으로 TLB 에 삽입한 뒤 return-from-trap. 유연하지만 매 miss 비용이 더 크다.',
      rubric: [
        'TLB 의 역할과 locality 언급',
        'HW / SW managed 의 처리 방식 구분',
        '각 방식의 장단(속도 vs 유연성)',
      ],
    },
    {
      id: 'ch13-essay-2',
      type: 'essay',
      prompt:
        'Context switch 시 TLB 가 유발하는 문제와 두 가지 해결 전략(Flush vs ASID) 을 비교하시오.',
      modelAnswer:
        '문제: TLB 엔트리는 보통 (VPN → PFN) 쌍만 저장하므로 프로세스 구분 정보가 없다. 만약 context switch 를 하고도 TLB 를 그대로 두면, A 의 가상 VPN 10 에 대한 매핑이 B 의 VPN 10 접근에도 그대로 사용되어 엉뚱한 물리 프레임을 읽거나 쓰게 된다(보안·정확성 파괴).\n\n해결 1 - Flush: context switch 마다 TLB 전체를 무효화한다. 안전하지만 매번 cold cache 에서 시작하므로 초반 miss 가 폭증한다.\n\n해결 2 - ASID 태깅: 각 TLB 엔트리에 Address Space ID 를 함께 저장한다. 조회 시 (VPN, ASID) 가 모두 일치해야 hit. flush 없이 여러 프로세스의 매핑이 TLB 에 공존할 수 있어, 자주 스위치되는 워크로드에서 큰 이득. 공유 페이지도 서로 다른 ASID 가 같은 PFN 을 가리키게 되어 자연스럽게 처리된다.',
      rubric: [
        '공유 TLB 가 프로세스 구분이 없음을 지적',
        'Flush 방식의 단순함과 초기 miss 비용',
        'ASID 방식의 공존 가능성과 공유 페이지 처리',
      ],
    },
  ],
};

export default quiz;
