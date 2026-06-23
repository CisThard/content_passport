# Infrastructure Verification Report
**Date:** 2026-06-23  
**Verified Environment:** GCP Cloud Run (Production) & Sui Testnet  
**Target Application:** Content Passport (CisThard/content_passport)

---

## 1. Executive Summary
본 보고서는 Content Passport 서비스의 핵심 신뢰 사슬(Authenticity Verification ➔ Walrus Archive ➔ MemWal Ledger ➔ Gas Sponsored Passport Minting ➔ Co-Creation Royalty Settlement)이 실제 의도된 비즈니스 로직과 기술 사양에 부합하게 동작하였는지 백엔드, GCP 인프라, 그리고 Sui Blockchain 온체인 로그를 교차 분석하여 검증한 결과입니다.

---

## 2. Infrastructure Trace & Log Analysis

### A. Enoki API Integration & Gas Sponsorship Failure/Success Traces
초기 연동 단계와 최종 성공 단계의 로그 추적 결과는 다음과 같습니다.

1. **지정되지 않은 패키지 및 타겟 요청 거절 (Enoki Policy Block)**
   * **로그 단서:**
     ```json
     [Server][Enoki Error Response]: {
       "status": 400,
       "statusText": "Bad Request",
       "body": "{\"errors\":[{\"code\":\"invalid_transaction\",\"message\":\"Method 0xed3b51821840c9cbba9b898ed09dde50a61155dd8fc00e8977278c8628036f22::genesis_passport::issue_passport is not part of an allow-listed move call target\"}]}"
     }
     ```
   * **분석:** 백엔드에 주입된 패키지 ID와 Enoki 개발자 포털의 허용 주소가 달라 트랜잭션 빌드가 Enoki 방화벽 단에서 거절되었습니다.
   
2. **정책 정합성 수립 후 스폰서십 성공 트레이스**
   * **로그 단서:**
     ```log
     [Server] Submitting sponsored transaction execution to Enoki...
     [Server] Enoki executed transaction. Digest: 459Ja8cxy8DPPe98qfMSTBfS8jruWsiSQyv5F7mGbiw3. Retrieving effects...
     [Server] Enoki executed transaction. Digest: EH1ciPuCTLQbiEpzoQYyEQmKShhsUrkRLmJUAkPNTSr1. Retrieving effects...
     ```
   * **분석:** Enoki 포털의 Sponsorship Policies에 실서버 패키지 ID(`0xac28432a557d52d7079930a82a5c1732a3709da3c6cb2991ce0332b0704061da`)가 올바르게 등록된 이후, 에러 없이 Gas 대납 서명 및 브로드캐스팅이 완료되었고 고유 트랜잭션 다이제스트가 정상 반환되었습니다.

### B. Sui Blockchain On-Chain State Verification
1. **zkLogin & Gas Sponsored Minting**
   * **트랜잭션 다이제스트 예시:** `J892iAi4hM...vTnc1Fw3`
   * **검증:** 사용자의 zkLogin 임시 세션 키 서명과 Enoki의 스폰서 서명이 결합하여 트랜잭션이 제출되었습니다. 사용자는 수수료(MIST)를 전혀 부담하지 않고 `GenesisPassport` NFT를 온체인에 정상적으로 발급받았습니다.
2. **Co-Creation Escrow & Royalty Settlement (0.01 SUI Unit)**
   * **트랜잭션 다이제스트 예시:** `GmDmUZxfXh...RWhvywUr`
   * **검증:** 0.01 SUI 단위 정산을 위한 MIST 변환 및 자바스크립트 부동소수점 오차 보정이 온체인 상에서 `CoCreationPolicy` 스마트 계약 호출로 연결되었습니다. 지정된 비율(Anya, Ben, Chloe)에 맞추어 정확하게 나누어져 분배되었음이 트랜잭션의 `effects`와 `balanceChanges` 목록으로 입증되었습니다.

### C. GCP Environment & Deployment Traces
1. **GitHub Secrets 및 Secret Manager 연동**
   * **검증:** 배포 단계에서 `ENOKI_PUBLIC_KEY`가 Vite 빌드에 전달되고 `ENOKI_SECRET_KEY`가 GCP Secret Manager를 통해 주입되었습니다. 백엔드가 부팅될 때 해당 변수가 정상 주입되었기에 `/api/gas/build-mint` 엔드포인트 호출 시 Enoki API를 향한 Authorization Bearer 토큰 인증이 통과되었습니다.
2. **AI Forensic Sniffer & Storage Infrastructure Integration**
   * **검증:** 이미지 업로드 및 포렌식 대기열(ELA, Sharp, C2PA) 실행 시 Node.js 메모리 부족 현상 없이 Sharp 이미지 리샘플링 작업이 정상 수행되었으며, 추출된 메타데이터 패킷이 Walrus 분산 서버와 MemWal 릴레이어로 전송 완료되었습니다.

---

## 3. Conclusion & Intent Alignment
본 검증 결과에 의하면 Content Passport 서비스는 설계 목적대로 작동하고 있으며 다음 세 가지 세부 의도를 만족합니다.
1. **Gas-Free UX:** zkLogin 사용자는 개별 가스 코인 없이 크리에이터 패권(NFT)을 발급받음.
2. **Atomic Settlement:** 로열티 배분 가중치 적용 시 최소 0.01 SUI(10,000,000 MIST) 단위까지 정확하게 정산됨.
3. **Security Integration:** API Secret key가 GitHub 코드 저장소나 빌드 이미지에 하드코딩되지 않고 GCP Secret Manager를 통해 런타임에 안전하게 관리됨.
