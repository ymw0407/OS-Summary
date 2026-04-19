#!/usr/bin/env bash
# PDF 그림 추출 스크립트
#
# 사용법: bash scripts/extract-figures.sh
#
# 각 강의 PDF에서 본문에 인용된 핵심 다이어그램 페이지를 PNG로 출력합니다.
# 결과는 public/figures/ 에 저장되며, MDX 의 <Figure src="/figures/..." /> 에서 참조됩니다.
#
# 필요 도구: pdftoppm (brew install poppler)

set -euo pipefail
cd "$(dirname "$0")/.."

OUT=public/figures
mkdir -p "$OUT"

PDF=pdf

render() {
  local src="$1"     # pdf 파일 이름
  local page="$2"    # 1-based 페이지 번호
  local dst="$3"     # 출력 prefix (.png 자동 접미)
  local dpi="${4:-180}"
  echo "• $src p.$page -> $OUT/$dst.png"
  pdftoppm -r "$dpi" -f "$page" -l "$page" -png \
    "$PDF/$src" "$OUT/$dst-tmp"
  local generated
  generated=$(ls "$OUT/${dst}-tmp"*.png 2>/dev/null | head -n 1 || true)
  if [[ -n "$generated" ]]; then
    mv "$generated" "$OUT/${dst}.png"
  else
    echo "  ⚠️  $dst 를 생성하지 못했습니다."
  fi
}

# ──────────────────────────────────────────────────────────────
# 페이지 번호는 pdftotext 로 각 PDF 내용을 확인하여 선정.
# (이전 버전의 스크립트는 페이지가 맞지 않아 엉뚱한 이미지가 나왔었음)
# ──────────────────────────────────────────────────────────────

# Ch1 Processes — 주소 공간 레이아웃 "Loading: From Program To Process"
render 2_Processes.pdf 8 ch01-address-space

# Ch1 Processes — xv6 register context (struct context)
render 2_Processes.pdf 17 ch01-pcb

# Ch3 Limited Direct Execution — trap handler 실행 흐름 시퀀스
render 4_LimitedDirectExecution.pdf 13 ch03-trap-flow

# Ch5 MLFQ — Better Accounting: allotment 기반 강등 (Gaming Tolerance 비교)
render 6_MultiLevelFeedback.pdf 13 ch05-mlfq-allotment

# Ch5 MLFQ — 큐 레벨별 time slice (10/20/40ms 예시)
render 6_MultiLevelFeedback.pdf 14 ch05-mlfq-timeslices

# Ch10 Segmentation — Not compacted / Compacted 비교 (external fragmentation)
render 10_Segmentation.pdf 15 ch10-external-fragmentation

# Ch11 Free-Space — Buddy System split 시퀀스
render 11_FreeSpace_Management.pdf 25 ch11-buddy-split

# Ch11 Free-Space — Buddy System bitmap (coalesce 결과)
render 11_FreeSpace_Management.pdf 29 ch11-buddy-coalesce

# Ch11 Free-Space — Buddy System 특성 + Internal Fragmentation
render 11_FreeSpace_Management.pdf 30 ch11-buddy-fragmentation

# Ch13 TLB — LRU replacement
render 13_Translation_Lookaside_Buffer.pdf 16 ch13-tlb-lru

echo "✅ 추출 완료. public/figures/ 를 확인하세요."
