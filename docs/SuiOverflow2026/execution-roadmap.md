# 🚀 Sui Overflow 2026: Content Passport 최종 실행 로드맵

이 문서는 Sui Overflow 2026 해커톤 제출을 위한 최종 고도화 및 실행 계획을 담고 있습니다.

## 🎯 핵심 문제 및 가치 제안 (Value Proposition)
- **Problem**: AI 생성 콘텐츠의 범람으로 인한 디지털 미디어의 신뢰성 붕괴.
- **Solution**: Android 네이티브 카메라에서 캡처된 미디어의 메타데이터와 포렌식 분석 결과를 **Walrus(데이터 스토리지)**와 **MemWal(에이전트 메모리)**에 기록하여, 누구나 검증 가능한 '디지털 진본 증명서'를 발급.
- **Sui 활용 이유**: 고속 트랜잭션과 객체 중심 아키텍처를 통한 실시간 증명서 발급 및 Walrus와의 긴밀한 통합.

---

## 📅 단계별 실행 계획

### Phase A. 지능형 분석 엔진 완성 (Agents & AI) - **현 단계**
*에이전트 워크플로우를 실제 데이터와 AI 모델로 정교화하여 종합적인 판단 체계 구축*
- [x] **AiDetectionAgent 고도화**: Gemini 3.5 Flash API 연동 및 Structured Output(JSON) 적용 완료.
- [x] **ForensicAgent 구현**: Sharp 라이브러리를 활용한 실제 ELA(Error Level Analysis) 로직 구현 완료.
- [x] **MetadataAgent 정밀화**: 편집 툴 흔적 및 시간 일관성 검증 로직 강화 완료.
- [x] **MemWal 평판 시스템**: 장애 대응형(Resilient) 오케스트레이션 및 메모리 기록 로직 통합 완료.

### Phase B. Walrus & Sui 온체인 통합 (Infrastructure) - **완료**
*분석 결과를 영구 저장하고 온체인 증명서로 변환*
- [x] **Walrus 스토리지 연동**: 분석 완료된 미디어 및 JSON 보고서를 Walrus에 업로드하고 듀얼 Blob ID 확보 완료.
- [x] **Sui Certificate NFT**: Move 컨트랙트를 통해 Blob ID와 분석 점수를 포함한 NFT 발행 및 Orchestrator 통합 완료.
- [x] **Sui Explorer 연동**: 온체인 객체 ID 기반의 데이터 조회 체계 구축 완료.

### Phase C. 사용자 경험 및 데모 완성 (UX & Presentation)
*심사위원을 위한 시각적 완성도 및 스토리텔링*
- [ ] **Android 실시간 피드백**: 분석 진행 상황(에이전트별 분석 단계)을 모바일 앱에서 실시간 시각화.
- [ ] **Airport UX 시나리오**: '공항 검역/입국' 컨셉의 데모 시나리오 및 영상 제작 (5분 이내).
- [ ] **최종 검증**: Testnet 배포 및 엔드-투-엔드 워크플로우 확인.

---

## 🏅 해커톤 제출 준비 체크리스트 (Submission Strategy)
- [ ] **데모 영상**: 문제 제기 → 촬영/분석 → Walrus/MemWal 기록 → Sui 증명서 발행 흐름.
- [ ] **GitHub Repo**: 깔끔한 README, `lib/agents` 및 `contracts` 폴더 구조 명확화.
- [ ] **기술 문서**: Walrus/MemWal 선택 이유 및 에이전트 오케스트레이션 설계 원칙 기술.

---

## 🛠️ 기술 스택
- **L1 Blockchain**: Sui Network (Testnet)
- **Storage**: Walrus (Blob Storage)
- **Memory**: MemWal (Agentic Memory)
- **AI**: Gemini 2.0 Flash
- **Backend**: Next.js (API Routes)
- **Mobile**: Android (Native Camera)

---

## 📝 참고 문서
- [Walrus 트랙 제안서](./walrus-track.md)
- [해커톤 참가자 가이드](./hackathon-guide.md)
- [작업 로그 (2026-06-16)](../project/2026-06-16-work-log.md)
