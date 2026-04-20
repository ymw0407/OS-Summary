import type { QuizSet } from './types';

const quiz: QuizSet = {
  slug: '01-processes',
  chapterNumber: 1,
  title: 'Processes',
  description: 'CPU 가상화의 출발점 — 프로세스의 구성 요소와 상태 전이를 복습합니다.',
  questions: [
    // ── 객관식 ─────────────────────────────────────────
    {
      id: 'ch01-mc-1',
      type: 'multiple-choice',
      prompt:
        '프로세스의 주소 공간(Address Space) 구성 요소에 대한 설명 중 옳지 않은 것은?',
      options: [
        { text: 'Code(Text) 영역은 일반적으로 read-only 로 보호된다.' },
        { text: 'Heap 은 런타임에 동적으로 할당되며 주소가 낮은 쪽에서 높은 쪽으로 자란다.' },
        { text: 'Stack 은 함수 호출 시 생성·소멸되며 주소가 높은 쪽에서 낮은 쪽으로 자란다.' },
        { text: 'BSS 영역은 heap 의 일부로, malloc 으로 할당된 객체가 놓인다.' },
      ],
      answerIndex: 3,
      explanation:
        'BSS 는 초기화되지 않은 전역/정적 변수가 놓이는 data 영역의 한 부분이다. malloc 으로 할당된 메모리는 heap 에 들어간다.',
    },
    {
      id: 'ch01-mc-2',
      type: 'multiple-choice',
      prompt:
        '다음 중 프로세스 상태(Running / Ready / Blocked) 전이에 대한 설명으로 옳은 것은?',
      options: [
        { text: 'I/O 요청을 하면 Running → Ready 로 바로 바뀐다.' },
        { text: 'I/O 완료 인터럽트가 오면 Blocked → Ready 로 바뀐다.' },
        { text: 'Blocked 상태에서도 CPU를 점유할 수 있다.' },
        { text: 'Ready → Blocked 는 스케줄러에 의해 일어난다.' },
      ],
      answerIndex: 1,
      explanation:
        'I/O 요청 시 Running → Blocked, I/O 완료 시 Blocked → Ready. Running 은 CPU 를 점유하고 있는 유일한 상태다.',
    },
    {
      id: 'ch01-mc-3',
      type: 'multiple-choice',
      prompt: 'PCB(Process Control Block)에 저장되지 않는 항목은?',
      options: [
        { text: 'Program Counter, Stack Pointer 등 레지스터 상태' },
        { text: '프로세스 상태(Running/Ready/Blocked)' },
        { text: '프로세스가 마지막으로 호출한 printf 의 문자열 내용' },
        { text: '파일 디스크립터 테이블에 대한 포인터' },
      ],
      answerIndex: 2,
      explanation:
        'PCB 는 스케줄링·컨텍스트 스위칭에 필요한 메타데이터(레지스터, 상태, 메모리 매핑, FD 테이블 등)를 담는다. 프로세스의 구체적 데이터 값은 보관하지 않는다.',
    },

    // ── 코드 빈칸 ─────────────────────────────────────
    {
      id: 'ch01-code-1',
      type: 'code-blank',
      language: 'c',
      prompt:
        '다음 코드는 현재 실행 중인 프로세스의 PID 를 출력하고 정상 종료한다. 빈칸을 채우시오.',
      segments: [
        { kind: 'text', text: '#include <stdio.h>\n#include <unistd.h>\n\nint main(void) {\n    printf("pid = %d\\n", (int) ' },
        { kind: 'blank', answers: ['getpid()', 'getpid'], width: 12 },
        { kind: 'text', text: ');\n    return ' },
        { kind: 'blank', answers: ['0'], width: 4 },
        { kind: 'text', text: ';\n}\n' },
      ],
      explanation:
        'getpid() 로 자기 자신의 PID 를 얻고, main 은 정상 종료 시 0 을 반환한다.',
    },
    {
      id: 'ch01-code-2',
      type: 'code-blank',
      language: 'c',
      prompt:
        '프로세스의 상태 상수를 정의한 아래 enum 에서 세 가지 핵심 상태를 나타내는 심볼을 채우시오 (대문자 영문).',
      segments: [
        { kind: 'text', text: 'enum proc_state {\n    ' },
        { kind: 'blank', answers: ['RUNNING'], width: 10 },
        { kind: 'text', text: ',   // CPU 점유 중\n    ' },
        { kind: 'blank', answers: ['READY'], width: 10 },
        { kind: 'text', text: ',     // 실행 대기\n    ' },
        { kind: 'blank', answers: ['BLOCKED'], width: 10 },
        { kind: 'text', text: ',   // I/O 등 이벤트 대기\n};\n' },
      ],
      explanation: 'Running / Ready / Blocked 가 프로세스 3-상태 모델의 기본 상태다.',
    },

    // ── True / False ─────────────────────────────────
    {
      id: 'ch01-tf-1',
      type: 'true-false',
      prompt: 'Time Sharing 은 하나의 물리 CPU 로 여러 프로세스를 돌리기 위한 기법이며, 잠재적 비용은 각 프로세스 실행 속도 저하이다.',
      answer: true,
      explanation: '성능을 대가로 동시 실행 환상을 제공한다.',
    },
    {
      id: 'ch01-tf-2',
      type: 'true-false',
      prompt: 'Heap 영역이 계속 커져서 Stack 과 충돌하면 Stack Overflow 가 발생한다.',
      answer: false,
      explanation:
        'Stack Overflow 는 재귀 등으로 스택이 과도하게 자랄 때 발생한다. 힙이 스택을 침범하는 상황은 일반적으로 segmentation fault 로 이어진다.',
    },
    {
      id: 'ch01-tf-3',
      type: 'true-false',
      prompt:
        'PCB 는 각 프로세스마다 고유하게 존재하며 커널 공간(kernel space)에 저장된다.',
      answer: true,
      explanation: '사용자 프로그램은 PCB 에 직접 접근할 수 없다.',
    },
    {
      id: 'ch01-tf-4',
      type: 'true-false',
      prompt:
        '프로세스가 argc, argv 같은 commandline argument 를 받는 공간은 heap 의 최하단이다.',
      answer: false,
      explanation: 'argc / argv / 환경변수는 스택 최상단(초기 스택 프레임 영역)에 세팅된다.',
    },

    // ── 단답 ────────────────────────────────────────
    {
      id: 'ch01-short-1',
      type: 'short-answer',
      prompt:
        'Context Switch 시 현재 프로세스의 레지스터 상태를 저장하고 다음 프로세스의 상태를 복원하기 위해 사용되는 자료구조의 이름은? (약어)',
      answers: ['PCB', 'Process Control Block'],
      hint: '예: PCB',
      explanation: 'Process Control Block. xv6 의 struct proc 안의 context 등이 이에 해당한다.',
    },
    {
      id: 'ch01-short-2',
      type: 'short-answer',
      prompt:
        '프로세스가 open, read, write 같은 I/O 를 수행할 때 파일·파이프·장치 등을 가리키는 정수 식별자를 무엇이라고 부르는가? (영문)',
      answers: ['file descriptor', 'fd', 'File Descriptor'],
      hint: '약어 fd 도 허용',
      explanation: 'File Descriptor. 0/1/2 는 stdin/stdout/stderr 에 대응된다.',
    },

    // ── 서술형 ───────────────────────────────────────
    {
      id: 'ch01-essay-1',
      type: 'essay',
      prompt:
        '프로세스가 생성될 때 OS 가 수행하는 절차를 "디스크의 실행 파일 → main() 실행 시작" 까지 순서대로 설명하시오.',
      modelAnswer:
        '1) 디스크의 실행 파일에서 code 와 static data 를 읽어 프로세스의 주소 공간 내 code/data segment 로 로드한다 (최근에는 lazy loading 을 많이 쓴다).\n2) 함수 호출에 필요한 run-time stack 을 준비하고 argc / argv / 환경변수를 채운다.\n3) 동적 할당을 위한 heap 영역을 준비한다.\n4) 기본 파일 디스크립터 0/1/2 (stdin/stdout/stderr) 를 열어 둔다.\n5) 마지막으로 OS 가 CPU 제어권을 프로세스의 main() 엔트리로 넘긴다.',
      rubric: [
        '디스크 → 메모리 로드 단계를 언급',
        'stack / heap 초기화를 분리해서 서술',
        '기본 fd 설정을 언급',
        '마지막에 main 진입 / CPU 제어권 전달 언급',
      ],
    },
    {
      id: 'ch01-essay-2',
      type: 'essay',
      prompt:
        '프로세스의 상태 모델(Running / Ready / Blocked)과 각 전이가 언제 일어나는지를 설명하시오.',
      modelAnswer:
        'Running: CPU 를 실제로 점유하고 실행 중인 상태.\nReady: 실행 준비는 되었으나 CPU 를 할당받지 못해 대기하는 상태.\nBlocked: 어떤 이벤트(주로 I/O 완료)를 기다리는 상태로, CPU 를 점유하지 않는다.\n\n전이:\n- Running → Blocked: 프로세스가 I/O 를 요청하면 발생. 스케줄러는 CPU 를 다른 프로세스에 넘긴다.\n- Blocked → Ready: 대기하던 I/O 가 완료되어 인터럽트가 들어오면, 해당 프로세스는 다시 실행 준비 상태로 돌아간다.\n- Ready → Running: 스케줄러가 해당 프로세스를 선택해 CPU 를 할당할 때.\n- Running → Ready: 타이머 인터럽트 등으로 선점(preemption) 되거나, 스스로 양보(yield)할 때.',
      rubric: [
        '세 상태의 의미를 구분',
        '네 가지 전이(Run↔Ready, Run→Blocked, Blocked→Ready) 모두 언급',
        '전이의 트리거(이벤트)를 서술',
      ],
    },
  ],
};

export default quiz;
