# Walrus 트랙 - 문제 제안서

> **원본:** Sui Overflow 2026 Walrus Track Problem Statement

---

## 한국어 (Korean)

### 핵심 문제

오늘날의 AI 에이전트는 강력하지만, 근본적으로 **상태가 없고 분산되어** 있습니다. 에이전트는 격리된 상태로 작업을 완료하고, 세션 간에 컨텍스트를 잃으며, 도구, 팀 또는 워크플로우 전반에 걸쳐 지식을 공유하는 데 어려움을 겪습니다. 메모리는 종종 단일 앱, 모델 또는 장치에 종속되어 있어 에이전트 시스템을 취약하고, 확장하기 어렵고, 신뢰하기 어렵게 만듭니다.

에이전트가 단순한 어시스턴트에서 자율적이고 장기 실행되는 시스템으로 진화함에 따라, 더 지속 가능한 기반이 필요합니다:

- **장기 메모리** — 에이전트를 위한 지속 가능하고 검증 가능한 메모리
- **지속 가능한 데이터 및 파일 접근** — Walrus 사용 (직접 또는 파일 관리 인터페이스를 통해)
- **통합 및 도구** — 개발자가 에이전틱 시스템에서 Walrus 또는 MemWal을 쉽게 채택할 수 있도록 지원

---

### 구축 대상

도메인에 관계없이 기능적인 AI 에이전트 또는 에이전틱 워크플로우(단일 또는 다중 에이전트)를 구축하여 다음을 시연합니다:

#### 1. 장기 메모리
에이전트를 위한 지속 가능하고 검증 가능한 메모리 사용.

#### 2. 지속 가능한 데이터 및 파일 접근
Walrus를 기본 스토리지 레이어로 사용.

#### 3. 통합 및 도구
에이전틱 시스템에서 Walrus/MemWal을 채택하기 위한 개발자 친화적 도구.

---

### 관심 영역

- **장기 실행 워크플로우** — 시간에 따라 상태를 추적하는 에이전트 (리서치 에이전트, 트레이딩 에이전트, 모니터링 시스템)
- **다중 에이전트 조정** — 협상, 작업 위임, 에이전트 간 단계별 실행
- **아티팩트 기반 워크플로우** — 에이전트가 데이터셋, 로그, 보고서 또는 중간 출력과 같은 파일을 생성, 저장 및 재사용

#### 통합 및 도구 아이디어

- 기존 에이전트 프레임워크 또는 도구에 지속 가능한 메모리 추가
- Walrus와 함께 메모리, 메시징 및 실행을 결합한 워크플로우 오케스트레이션 레이어
- Walrus의 공유 컨텍스트를 통한 크로스 도구/크로스 에이전트 메모리 공유
- Walrus에 저장된 에이전트 메모리 및 데이터를 검사, 디버깅 또는 관리하기 위한 인터페이스 또는 개발자 도구

---

### 프로젝트 유형

- 사용자 대상 에이전트 또는 다중 에이전트 시스템
- 개발자 도구 또는 프레임워크 통합
- 지속 가능한 AI 메모리 및 데이터와 상호작용하기 위한 새로운 인터페이스

---

### 평가 기준

다음을 보여주는 **작동하는 시스템**을 찾고 있습니다:

1. 에이전트가 시간에 따라 기억하고 구축할 때 어떻게 더 유용해지는지
2. 데이터가 공유되고 지속 가능하고 이동 가능할 때 워크플로우가 어떻게 개선되는지
3. 개발자가 취약하고 고립된 메모리 설정에서 어떻게 벗어날 수 있는지

---

### 참고 자료

#### Walrus 문서
- 시작하기
- CLI / HTTP API / TypeScript SDK
- 공개 어그리게이터 및 퍼블리셔

#### Walrus Sites 문서
- 사이트 빌더 CLI 설치
- 사이트 게시

#### MemWal (Walrus Memory) 문서
- [MemWal 플레이그라운드](https://memwal.app) — 계정 생성 및 에이전트용 대리 키 생성
- [MemWal GitHub 저장소](https://github.com/walrus-memwal) — 샘플 앱, 스킬 등 포함

#### Seal 문서
- Walrus 및 MemWal용 프라이버시 레이어

#### Sui Stack Messaging
- Walrus 스토리지 및 복구 및 Seal 프라이버시를 활용하는 메시징 도구

---

### 지원 채널

- **Walrus 텔레그램 그룹** — 질문, 토론, Walrus 팀의 직접 지원
- **Walrus Discord #developers 채널** — 아이디어 검증 및 프로젝트 논의

---

## English (Original)

### The Core Problem

AI agents today are powerful, but still fundamentally **stateless and fragmented**. They complete tasks in isolation, lose context across sessions, and struggle to share knowledge across tools, teams, or workflows. Memory is often tied to a single app, model, or device — making agent systems brittle, hard to scale, and difficult to trust.

As agents evolve from simple assistants to autonomous, long-running systems, they need a more durable foundation:

- **Long-term memory** — persistent, verifiable memory for agents
- **Persistent data and file access** — using Walrus (directly or via a file management interface)
- **Integrations and tooling** — making it easier for developers to adopt Walrus or MemWal in agentic systems

---

### What to Build

Build functional AI agents or agentic workflows (single or multi-agent) in any domain that demonstrate:

#### 1. Long-Term Memory
Using persistent, verifiable memory for agents.

#### 2. Persistent Data & File Access
Using Walrus as the underlying storage foundation.

#### 3. Integrations & Tooling
Developer-friendly tools to adopt Walrus/MemWal in agentic systems.

---

### Areas of Interest

- **Long-running workflows** — agents tracking state over time (research agents, trading agents, monitoring systems)
- **Multi-agent coordination** — negotiation, task delegation, step-by-step execution across agents
- **Artifact-driven workflows** — agents generate, store, and reuse files like datasets, logs, reports, or intermediate outputs

#### Integration & Tooling Ideas

- Adding persistent memory to existing agent frameworks or tools
- Workflow orchestration layers combining memory, messaging, and execution with Walrus
- Cross-tool / cross-agent memory sharing via shared context on Walrus
- Interfaces or developer tools to inspect, debug, or manage agent memory and data on Walrus

---

### Project Types

- User-facing agent or multi-agent system
- Developer tool or framework integration
- New interface for interacting with persistent AI memory and data

---

### Evaluation Criteria

We're looking for **working systems** that show:

1. How agents become more useful when they can remember and build over time
2. How workflows improve when data is shared, durable, and portable
3. How developers can move beyond fragile, siloed memory setups

---

### Reference Materials

#### Walrus Docs
- Getting started
- CLI / HTTP API / TypeScript SDK
- Public aggregators and publishers

#### Walrus Sites Docs
- Install the site-builder CLI
- Publish a site

#### MemWal (Walrus Memory) Docs
- [MemWal Playground](https://memwal.app) — create an account and a delegate key for your agent
- [MemWal Github Repo](https://github.com/walrus-memwal) — includes sample apps, skills, etc.

#### Seal Docs
- Privacy layer for Walrus and MemWal

#### Sui Stack Messaging
- Messaging tooling that uses Walrus for storage & recovery and Seal for privacy

---

### Support Channels

- **Walrus Telegram group** — questions, discussions, direct support from the Walrus team
- **Walrus Discord #developers channel** — idea validation and project discussion
