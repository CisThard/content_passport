# Content Passport — 데모 브리핑 동영상 제작 기획서 (v3)

> **목표 분량**: 5분 (300초)  
> **장르**: 프로덕트 데모 / 기술 브리핑  
> **타겟 시청자**: Sui Overflow 2026 해커톤 심사위원 (Walrus Track)  
> **핵심 목표**: "이 프로젝트가 왜 독보적인지, 5분 안에 설득하기"

---

## 0. 기획 전제

### 0.1 심사 기준과 시간 배분

| 심사 항목 | 가중치 | 해당 씬 | 배분 시간 |
|-----------|--------|---------|-----------|
| **Practicality (실용성)** | 50% | 씬 0 (문제 정의) + 씬 1 (접근성) | ~100초 |
| **Product & UX** | 20% | 씬 1 (접근성) + 씬 5 (Journey) | ~60초 |
| **Technical Implementation** | 20% | 씬 2 (AI 탐지) + 씬 3 (보안) | ~100초 |
| **Presentation & Vision** | 10% | 씬 5 (Journey) + 씬 6 (클로징) | ~40초 |

### 0.2 핵심 원칙

이 동영상은 기술 데모가 아니다. **"왜 이 프로젝트가 필요한가"에 대한 증거**이다.

> *"AI가 만든 콘텐츠와 사람이 만든 콘텐츠를 구분할 수 없는 시대에,  
> créative 저작물을 안전하게 증명하고, 자동으로 로열티를 분배하는 시스템을  
> 실제로 구축했는가?"*

이 질문에 대한 답을 7단계로 제시한다.

### 0.3 Walrus Track 핵심 매핑

| Walrus Track 심사 항목 |我们的 대응 | 증거 씬 |
|------------------------|-----------|---------|
| **Long-term memory** | MemWal 에이전트 메모리 — 이전 분석 기록을 기억하고 크로스체크 | 씬 2 |
| **Persistent data & file access** | Walrus 블롭 스토리지 — 원본/증거/리포트 영구 저장 | 씬 2, 3 |
| **Integrations & tooling** | MemWal + Walrus HTTP API 통합 | 씬 2, 3 |

---

## 1. 전체 구조 — 7단계 서사 구조

| 시간 | 단계 | 제목 | 핵심 메시지 (1문장) | 심사 기준 |
|------|------|------|---------------------|-----------|
| 0:00~0:50 | **0** | **Problem Statement** | "90%의 AI 콘텐츠 시대에, 원본 증명 인프라가 없다" | Practicality |
| 0:50~1:40 | **1** | **Zero-Friction Identity** | "지갑 없이, 구글 로그인 하나로 온체인 créateur가 된다" | Practicality / UX |
| 1:40~2:45 | **2** | **Multi-Agent Forensics + MemWal** | "4개 눈이 가짜를 잡고, MemWal은 기억한다" | Technical / Walrus |
| 2:45~3:45 | **3** | **Shamir Threshold Vault** | "원본은 5개 조각으로 쪼개져 전 세계에 흩어진다" | Technical / Walrus |
| 3:45~4:25 | **4** | **Automated Royalties** | "계약서 없이, 코드로 로열티가 자동 분배된다" | Technical |
| 4:25~4:50 | **5** | **Live Journey Graph** | "6단계 여정이 실제로 작동한다" | Product / Vision |
| 4:50~5:00 | **6** | **Closing** | "콘텐츠의 새로운 국경" | Vision |

---

## 2. 씬 상세 기획

---

### 씬 0 — Problem Statement Cold Open (0:00 ~ 0:50)

**목표**: 50초 안에 "이 프로젝트가 왜 필요한지"를 강렬하게 각인시킨다. **Practicality 50%에 직접 대응한다.**

**Shot 구성:**

| 구간 | 시간 | 화면 | 심사위원에게 전달하는 것 |
|------|------|------|--------------------------|
| 0-1 | 0:00~0:08 | 충격적 통계 카드 | "이 문제는 이미 현실이다" |
| 0-2 | 0:08~0:18 | 3개 문제 카드 순차 등장 | "3가지 구조적 결함이 존재한다" |
| 0-3 | 0:18~0:28 | "What if..." 전환 | "해답이 있다면?" |
| 0-4 | 0:28~0:42 | Content Passport 로고 + 4개 챔버 | "이것이 그 해답이다" |
| 0-5 | 0:42~0:50 | 한 줄 요약 + URL | "content-passport.xyz" |

**화면 세부 묘사:**

**0-1 (0:00~0:08) — 충격적 통계:**
```
2026년, 인터넷상의 이미지 중
AI가 생성한 비율: 60% 이상
— Cisco Annual Report, 2026
```
- 어두운 배경에 흰색 텍스트가 타이핑 효과로 등장
- 숫자 `60%`는 빨간색으로 강조
- 하단에 출처 표시 (신뢰성 확보)

**0-2 (0:08~0:18) — 3개 문제 카드:**
화면을 3등분하여 순서대로 문제 카드가 등장:

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  🔍              │  │  🛡️              │  │  💰              │
│  AI 생성물       │  │  원본 증명       │  │  로열티          │
│  판별 불가       │  │  인프라 부재     │  │  분쟁           │
│                  │  │                  │  │                  │
│  "진짜와 가짜를  │  │  "카메라 원본을  │  │  "크리에이터 간   │
│  구분할 수 없다"  │  │  증명할 방법이   │  │  정산이 매번      │
│                  │  │  없다"           │  │  분쟁이다"        │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```
- 각 카드가 2초 간격으로 왼쪽에서 오른쪽으로 슬라이드 인
- 각 카드 등장 시 경고 효과음 (낮은 톤)
- 카드 배경: 어두운 네이비, 테두리만 빨간색

**0-3 (0:18~0:28) — "What if..." 전환:**
- 3개 문제 카드가 서서히 흐려짐
- 화면 중앙에 텍스트 페이드인:

```
What if every piece of content had a passport?
```

- 3초 정지 → 화이트 플래시

**0-4 (0:28~0:42) — Content Passport 등장:**
- 로고가 중앙에 등장
- 4개 아이콘이 로고 주위로 원형 배치:
  - 🪪 Identity (인디고)
  - 🔍 Verify (시안)
  - 🔒 Seal (에메랄드)
  - 💰 Royalty (골드)
- 각 아이콘이 등장할 때 해당 씬의 1초 미리보기가 배경에 표시됨

**0-5 (0:42~0:50) — 한 줄 요약:**
```
Identity → Verify → Seal → Settle
One ecosystem. Zero friction.
https://content-passport.xyz
```
- 브라우저 주소창에 `content-passport.xyz`를 타이핑하는 장면 (1초)
- "이것은 로컬 데모가 아니라, 실제 배포된 서비스"라는 인상

**한 줄 자막:**
```
[0:05] "60% of images online are now AI-generated"
[0:15] "No proof. No privacy. No payouts."
[0:22] "What if every content had a passport?"
[0:45] "Live at content-passport.xyz"
```

**음향**: 
- 0:00~0:18: 긴장감 있는 저주파 앰비언트
- 0:18~0:28: "What if" 구간에서 잠시 정적
- 0:28~0:50: 로고 등장과 함께 희망적인 일렉트로닉 비트 시작

---

### 씬 1 — Zero-Friction Identity (0:50 ~ 1:40)

**핵심 메시지**: *"지갑을 모르는 사람도, 구글 로그인 하나로 온체인 créateur가 된다."*

**Shot 구성:**

| 구간 | 시간 | 화면 | 심사위원에게 전달하는 것 |
|------|------|------|--------------------------|
| 1-1 | 0:50~0:57 | `content-passport.xyz` 주소창 표시 | "실제 배포 사이트" |
| 1-2 | 0:57~1:05 | Landing → "Identity Gate" 카드 클릭 | "첫 번째 챔버" |
| 1-3 | 1:05~1:12 | "Sign In with Google" 클릭 | "메타마스크 없음" |
| 1-4 | 1:12~1:20 | 콘솔: `Derived zkLogin address` | "ZK Proof로 주소 생성" |
| 1-5 | 1:20~1:28 | `charles.sui` 입력 → "Mint Passport" | "이름만 입력하면 됨" |
| 1-6 | 1:28~1:38 | 3D 패스포트 카드 생성 | "NFT가 곧 여권" |
| 1-7 | 1:38~1:40 | 패스포트 클로즈업 + "Gas: $0.00" | "가스비 제로" |

**화면 세부 묘사 (1-1):**
- 크롬 브라우저 주소창이 화면 상단에 클로즈업
- 사용자가 `content-passport.xyz`를 타이핑
- 엔터 키 입력 → 사이트 로딩
- **이 장면은 반드시 1배속** (타이핑 속도를 높이지 않음)

**화면 세부 묘사 (1-6):**
- 패스포트 카드 생성 시 **홀로그램 레이저 스캔** 효과
- 카드 정보 순서대로 등장:
  - `SUI CREATOR PASSPORT` (상단)
  - `charles.sui` (가운데, 큰 글씨)
  - `Object: 0x7a3f...b2c1` (하단)
  - `Issued: Jun 21, 2026` (하단)
  - `Suiscan` 링크 (우측)

**한 줄 자막:**
```
[0:52] "Live: content-passport.xyz"
[1:07] "No wallet extension. No gas fees."
[1:15] "zkLogin — Zero-knowledge proof identity"
[1:35] "Genesis Passport NFT — $0.00 gas (Sponsored Tx)"
```

---

### 씬 2 — Multi-Agent Forensics + MemWal (1:40 ~ 2:45)

**핵심 메시지**: *"4개 눈이 가짜를 잡고, MemWal은 기억한다."*

**왜 중요한가**: 단순 분석이 아니라 **학습하는 시스템**이다. 이전 분석 기록을 기억하고, 크로스체크한다. 이것이 Walrus Track의 핵심이다.

**Shot 구성:**

| 구간 | 시간 | 화면 | 심사위원에게 전달하는 것 |
|------|------|------|--------------------------|
| 2-1 | 1:40~1:48 | Verify 페이지, 샘플 이미지 2장 | "카메라 원본 vs AI 생성" |
| 2-2 | 1:48~1:52 | AI 생성 이미지 선택 → "Start Audit" | "가짜를 집어넣었다" |
| 2-3 | 1:52~2:02 | 레이저 스캔 + 콘솔 로그 | "시스템 가동" |
| 2-4 | 2:02~2:12 | 4개 에이전트 순차 진행 | "독립적 판단" |
| 2-5 | 2:12~2:20 | **"F — Synthetic Alert"** 배지 | "판정" |
| 2-6 | 2:20~2:30 | **MemWal 크로스체크 장면** | "이전 기록을 기억한다" |
| 2-7 | 2:30~2:38 | 상세 리포트 (에이전트 스코어) | "근거가 있다" |
| 2-8 | 2:38~2:45 | ELA 슬라이더 | "눈으로 보여준다" |

**화면 세부 묘사 (2-4) — 콘솔 로그:**
```
[AGENT] ForensicAgent — ELA Pixel Recompression: Score 23/100 ⚠
[AGENT] MetadataAgent — EXIF Consistency: Score 45/100 ⚠
[AGENT] AI Sniffer — Gemini 3.5 Vision: Score 12/100 🔴
[AGENT] MemWal Memory — Prior Clues Cross-ref: Score 100/100 ✓
[AASE] Final Grade: F (Synthetic Content Detected)
```

**화면 세부 묘사 (2-6) — MemWal 크로스체크 (핵심 장면):**

이 장면은 **Walrus Track 심사에서 가장 중요한 장면**이다.

- 콘솔에 새로운 로그가 등장:

```
[MEMWAL] 🐳 Querying Walrus Semantic Memory...
[MEMWAL] 🐳 Found 3 prior audits with similar DCT patterns
[MEMWAL] ⚠ CROSS-REFERENCE: This image matches 87% with 
         previously flagged AI-generated content
[MEMWAL] 🐳 Audit trail permanently stored on Walrus
```

- 화면 오른쪽에 **이전 분석 기록 카드**가 팝업:
  - 이전에 분석한 유사 이미지의 썸네일
  - `Previously flagged: Grade F` 배지
  - `Similarity: 87%` 텍스트
  - `Stored on: Walrus 🐳` 뱃지

- **이 장면은 반드시 1배속** (메모리 조회 과정을 강조)

**한 줄 자막:**
```
[1:55] "4 agents. 4 independent eyes."
[2:10] "Grade F — AI-generated content detected"
[2:22] "🐳 MemWal: Walrus memory never forgets"
[2:28] "Every audit becomes permanent evidence"
[2:40] "ELA residuals don't lie"
```

---

### 씬 3 — Shamir Threshold Vault (2:45 ~ 3:45)

**핵심 메시지**: *"원본 파일은 하나의 서버에 없다. 5개 조각으로 쪼개져 전 세계에 흩어진다."*

**Shot 구성:**

| 구간 | 시간 | 화면 | 심사위원에게 전달하는 것 |
|------|------|------|--------------------------|
| 3-1 | 2:45~2:52 | Vault 페이지, 락 아이콘 | "잠긴 금고" |
| 3-2 | 2:52~2:58 | 파일 드래그 & 드롭 | "원본을 넣는다" |
| 3-3 | 2:58~3:06 | 암호화 콘솔 로그 | "AES-256으로 감싼다" |
| 3-4 | 3:06~3:18 | **파티클 애니메이션**: 중앙 → 5개 노드 | "키를 5조각으로 쪼촜" |
| 3-5 | 3:18~3:28 | 가디언 노드 카드 5개 | "전 세계 분산" |
| 3-6 | 3:28~3:36 | 3개 노드 "Approve Share" | "3/5 동의" |
| 3-7 | 3:36~3:45 | 키 재구성 → 복호화 | "라그랑주 보간법" |

**화면 세부 묘사 (3-4) — 파티클 애니메이션:**
- 화면 중앙에 락 아이콘 (크기 80px)
- 120개의 에메랄드 파티클이 중앙에서 5개 방향으로 퍼져나감
- 각 파티클이 노드에 도착하면 노드가 밝게 빛남
- **반드시 1배속** (속도 조절 금지)

**화면 세부 묘사 (3-5) — 가디언 노드:**
```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  Node-01        │  │  Node-02        │  │  Node-03        │
│  Frankfurt, DE  │  │  Singapore, SG  │  │  Oregon, US     │
│  Latency: 42ms  │  │  Latency: 89ms  │  │  Latency: 112ms │
│  Shard: A7f3... │  │  Shard: 2b1c... │  │  Shard: 9d4e... │
│  🐳 Walrus     │  │  🐳 Walrus     │  │  🐳 Walrus     │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```
- 각 노드에 🐳 Walrus 뱃지 표시

**한 줄 자막:**
```
[2:58] "AES-256-GCM — client-side only"
[3:10] "Shamir Secret Sharing: k=3, n=5 over GF(256)"
[3:20] "🐳 5 shards distributed via Walrus nodes"
[3:30] "3 out of 5 guardians must agree"
[3:40] "Lagrange interpolation reconstructs the key"
```

---

### 씬 4 — Automated Royalties (3:45 ~ 4:25)

**핵심 메시지**: *"계약서도, 중개인도 없다. 코드가 곧 계약이고, 코드가 곧 정산이다."*

**Shot 구성:**

| 구간 | 시간 | 화면 | 심사위원에게 전달하는 것 |
|------|------|------|--------------------------|
| 4-1 | 3:45~3:52 | Blueprint 페이지 | "리믹스 경제" |
| 4-2 | 3:52~4:02 | Anya/Ben/Chloe 슬라이더 | "실시간 가중치 조절" |
| 4-3 | 4:02~4:12 | **파티클 흐름 그래프** | "SUI가 자동 분배" |
| 4-4 | 4:12~4:20 | PTB 실행 → Tx Digest | "온체인 확인" |
| 4-5 | 4:20~4:25 | **듀얼 모드 탭 전환** | "보너스: Bounty Quest" |

**화면 세부 묘사 (4-3) — 파티클 흐름:**
- 하단 중앙: "Escrow" 노드 (골드)
- 상단 3개 크리에이터: Anya (인디고), Ben (시안), Chloe (로즈)
- Bezier 곡선을 따라 골드 파티클이 3개 방향으로 흘러감
- 도착 시 "+30 SUI" 같은 텍스트가 떠오름

**화면 세부 묘사 (4-5) — 듀얼 모드 탭:**
- Blueprint 페이지 하단의 "Supply-Side" / "Demand-Side" 탭이 보임
- 빠르게 탭 전환 (2초)
- Bounty Quest 섹션이 잠깐 표시됨
- **이 장면은 2초만 노출** ("더 많은 것이 있다"는 인상)

**한 줄 자막:**
```
[3:55] "Dynamic Royalty Weight Configurator"
[4:05] "SUI flows automatically to creators"
[4:15] "PTB — Programmable Transaction Block"
[4:22] "Two models: Remix Chain + Bounty Quest"
```

---

### 씬 5 — Live Journey Graph (4:25 ~ 4:50)

**핵심 메시지**: *"6단계 여정이 실제로 작동한다. 이것이 실제 제품이다."*

**왜 중요한가**: 정적 다이어그램이 아니라, **실제 구현된 Journey 페이지**를 보여준다. "이것이 완성된 제품"이라는 증거다.

**Shot 구성:**

| 구간 | 시간 | 화면 | 심사위원에게 전달하는 것 |
|------|------|------|--------------------------|
| 5-1 | 4:25~4:32 | Journey 페이지 로드 | "심사위원 전용 페이지" |
| 5-2 | 4:32~4:40 | 6단계 여정 그래프 (펄스 라인) | "전체 워크플로우" |
| 5-3 | 4:40~4:47 | 각 단계 클릭 → 온체인 영수증 | "실제 작동" |
| 5-4 | 4:47~4:50 | Suiscan 링크 오버레이 | "온체인 검증" |

**화면 세부 묘사 (5-2):**
- Journey 페이지의 6단계 그래프가 펄스 라인으로 연결
- 각 단계가 순서대로 밝아지며 애니메이션
- 단계 이름: Identity → Audit → Seal → Rights → Settlement → Archive

**화면 세부 묘사 (5-3):**
- 각 단계를 클릭하면 해당 단계의 상세 정보가 팝업
- 온체인 트랜잭션 해시가 표시됨
- `View on Suiscan` 링크가 보임

**한 줄 자막:**
```
[4:28] "Judge Mode — Live Journey Graph"
[4:35] "6 stages. Each step on-chain."
[4:42] "Verified. Immutable. Transparent."
```

---

### 씬 6 — Closing (4:50 ~ 5:00)

**화면:**
```
Content Passport
https://content-passport.xyz/

Your content. Your rules. Your borders.

Sui Overflow 2026 — Walrus Track
```

---

## 3. Walrus 뱃지 규칙

Walrus가 사용되는 모든 순간에 **統一된 시각적 마커**를 표시한다.

| 씬 | Walrus 활용 지점 | 뱃지 표시 |
|----|-----------------|-----------|
| 씬 2 | MemWal 조회 시 | 🐳 우하단 뱃지 |
| 씬 2 | 포렌식 리포트 저장 시 | 🐳 우하단 뱃지 |
| 씬 3 | 원본 업로드 시 | 🐳 우하단 뱃지 |
| 씬 3 | 가디언 노드 카드 | 🐳 각 노드에 표시 |

**뱃지 스타일:**
- 크기: 24px
- 위치: 화면 우하단
- 배경: 반투명 블랙
- 효과: 부드러운 펄스 애니메이션

---

## 4. 자막 언어 전략

### 4.1 기술 키워드 하이라이트

다음 기술 키워드는 **볼드** 또는 **컬러 강조**로 시각적으로 부각한다:

| 키워드 | 색상 | 관련 씬 |
|--------|------|---------|
| **zkLogin** | 인디고 | 씬 1 |
| **Sponsored Transaction** | 시안 | 씬 1 |
| **ELA** | 골드 | 씬 2 |
| **MemWal** | 에메랄드 | 씬 2 |
| **AES-256-GCM** | 로즈 | 씬 3 |
| **Shamir 3/5** | 골드 | 씬 3 |
| **Walrus Blob** | 시안 | 씬 2, 3 |
| **PTB** | 인디고 | 씬 4 |
| **SEAL** | 에메랄드 | 씬 3 |

### 4.2 자막 스타일

- 폰트: 모노스폰 (JetBrains Mono 또는 동등)
- 크기: 14px
- 위치: 화면 하단 중앙
- 배경: 반투명 블랙 (padding: 4px 8px)
- 노출 시간: 3초
- 최대 줄 수: 2줄

---

## 5. 편집 원칙

| 규칙 | 상세 | 이유 |
|------|------|------|
| **문제→해결 쌍** | 각 씬 시작 3초에 문제를, 나머지에서 해결을 보여줌 | Practicality 대응 |
| **Walrus 뱃지 규칙** | Walrus 연동 순간마다 우하단 뱃지 표시 | 트랙 적합성 시각화 |
| **숫자 강조 규칙** | `$0.00`, `3/5`, `4 agents`, `87%` 등 숫자는 항상 크게 | 핵심 데이터 강조 |
| **라이브 URL 규칙** | 최소 1회는 `content-passport.xyz` 주소창이 보여야 함 | 배포 상태 증명 |
| **콘솔 로그 2배속** | 지루한 스크롤은 시선을 뺏음 | 집중도 유지 |
| **파티클 애니메이션 1배속** | 시각적 임팩트는 속도에서 나옴 | 임팩트 보장 |
| **자막 2줄, 3초** | 최대한 간결하게 | 정보 과부하 방지 |
| **화이트 플래시 0.5초** | 씬 전환 시 | 깔끔한 전환 |

---

## 6. 촬영 사전 체크리스트

| 항목 | 확인 |
|------|------|
| `content-passport.xyz` 라이브 사이트 접속 가능 | ☐ |
| Chrome 1920x1080, 100% 배율 | ☐ |
| `web/public/samples/` 샘플 이미지 준비 | ☐ |
| Google OAuth 설정 완료 | ☐ |
| `GOOGLE_GENERATIVE_AI_API_KEY` 설정 | ☐ |
| `c2pa-node` 빌드 완료 | ☐ |
| Sui Wallet 연결 (Blueprint용) | ☐ |
| Journey 페이지 접속 가능 | ☐ |
| 화면 녹화 소프트웨어 (OBS 등) | ☐ |
| 배경 음악 라이선스 확인 | ☐ |

---

## 7. 심사 항목별 어필 포인트 요약

| 심사 항목 | 가중치 | 해당 씬 | 핵심 증거 |
|-----------|--------|---------|-----------|
| **Practicality** | 50% | 씬 0, 1 | 문제 정의 + 실제 배포 사이트 + $0.00 가스비 |
| **Product & UX** | 20% | 씬 1, 5 | 지갑 없이 로그인 + Journey Graph 라이브 |
| **Technical** | 20% | 씬 2, 3 | 4개 에이전트 + MemWal + Shamir + Walrus |
| **Vision** | 10% | 씬 5, 6 | 전체 워크플로우 + 확장성 |

---

## 8. Walrus Track 핵심 어필 포인트

| 심사 항목 | 우리의 대응 | 증거 씬 | 자막 키워드 |
|-----------|-----------|---------|-----------|
| **Long-term memory** | MemWal 에이전트 메모리 — 이전 분석 기록을 기억하고 크로스체크 | 씬 2 | "MemWal: Walrus memory never forgets" |
| **Persistent data** | Walrus 블롭 스토리지 — 원본/증거/리포트 영구 저장 | 씬 2, 3 | "🐳 Walrus blob" |
| **Integrations** | MemWal + Walrus HTTP API 통합 | 씬 2, 3 | "Walrus Semantic Memory" |

---

## 9. 대안 시나리오 (시간 초과 시)

| 축약 대상 | 변경 내용 | 절약 시간 |
|-----------|-----------|-----------|
| 씬 4 듀얼 모드 | Bounty Quest 탭 전환 삭제 | -5초 |
| 씬 5 Journey | 6단계 → 3단계로 축소 | -10초 |
| 전체 콘솔 로그 | 3배속 처리 | -15초 |

**축약 시 총 분량**: 약 4분 30초

---

## 10. 요약: 핵심 변경 사항 (v2 → v3)

| 변경 사항 | 내용 | 임팩트 |
|-----------|------|--------|
| **Problem Statement 추가** | 씬 0을 15초→50초로 확장, 충격적 통계+3개 문제 카드 | Practicality 50% 대응 |
| **MemWal 독립 비트** | 씬 2에 "이전 기록 크로스체크" 장면 추가 | Walrus Track 핵심 |
| **content-passport.xyz** | 씬 1 시작 시 라이브 URL 타이핑 장면 | 배포 상태 증명 |
| **Journey Graph 교체** | 씬 5를 정적 다이어그램→라이브 Journey로 교체 | 제품 완성도 증명 |
| **Walrus 뱃지 규칙** | Walrus 활용 순간마다 🐳 뱃지 표시 | 트랙 적합성 시각화 |
| **기술 키워드 하이라이트** | zkLogin, MemWal, Shamir 등 색상 강조 | 기술 인지도 |
| **듀얼 모드 힌트** | 씬 4 마지막에 Bounty Quest 탭 전환 | 확장성 시사 |

---

*본 기획서는 Content Passport이 Walrus Track 심사 기준에 부합하는가에 대한 증거를 시각적으로 제시하기 위한 가이드라인입니다.*
