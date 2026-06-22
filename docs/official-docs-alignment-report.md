# 공식 문서 기술 요구사항 정합성 분석 보고서 (Official Docs Alignment Report)

본 보고서는 `/Users/charles/Projects/content_passport/docs/official-docs`에 수록된 수이(Sui), 왈러스(Walrus), 왈러스 메모리(MemWal), 씰(SEAL) 등 핵심 기반 인프라 기술 명세서와 본 프로젝트(`content_passport`)의 실제 적용 현황을 대조 및 검증한 기록입니다.

---

## 1. Sui zkLogin 연동 정합성
* **참조 공식 문서**: [Sui Stack - zkLogin Integration](file:///Users/charles/Projects/content_passport/docs/official-docs/sui-docs/sui-stack/zklogin-integration/index.md)
* **주요 적용 파일**: [zklogin-salt.ts](file:///Users/charles/Projects/content_passport/src/zklogin-salt.ts), [server.ts](file:///Users/charles/Projects/content_passport/src/server.ts), [Register.tsx](file:///Users/charles/Projects/content_passport/web/src/pages/Register.tsx)

### 대조 결과
* **주소 결정성 검증 (`jwtToAddress`)**: JWT 토큰과 솔트(Salt)값을 입력으로 받아 고유 주소를 매핑하는 `jwtToAddress(jwt, salt, false)` 표준 파라미터가 백엔드 서버에 정확하게 구현되어 있습니다.
* **주소 솔트 유도 식 (`genAddressSeed`)**: 솔트 유도 함수 `genAddressSeed(salt, "sub", sub, aud)`가 적용되어, 사용자의 구글 계정 식별정보(`sub`)와 오디언스(`aud`) 청구 정보로부터 해시 충돌 없이 고유한 zkLogin 주소 시드를 동적으로 안전하게 파생합니다.
* **세션 키 서명 검증 (`getZkLoginSignature`)**: 
  * Ephemeral KeyPair의 서명(`ephemeralSignature.signature`)과 ZK Proof, `maxEpoch`를 병합해 온체인이 식별할 수 있는 최종 복합 서명 포맷을 반환합니다.
  * 기존 비동기 로딩 딜레이 과정에서 프론트엔드와 백엔드의 Epoch 불일치(100 vs 실전 Epoch)로 인한 임시 세션 키 재생성 현상을 `currentEpoch` 상태 초기화 제어로직 변경 및 온디맨드 fetch 패턴을 도입하여 완벽히 교정하였습니다.

---

## 2. Walrus 분산 데이터 저장소 연동 정합성
* **참조 공식 문서**: [Storing Blobs](file:///Users/charles/Projects/content_passport/docs/official-docs/walrus-docs/docs/http-api/storing-blobs.md) & [Reading Blobs](file:///Users/charles/Projects/content_passport/docs/official-docs/walrus-docs/docs/http-api/reading-blobs.md)
* **주요 적용 파일**: [walrus.ts](file:///Users/charles/Projects/content_passport/src/walrus.ts)

### 대조 결과
* **업로드 명세 (`PUT /v1/blobs`)**: 
  * `HttpWalrusClient.storeBlob` 호출 시 `PUT` 메서드를 사용하여 `epochs` 및 `permanent` 등의 정책 쿼리 문자열과 데이터를 바이너리 Body로 정상 투과합니다.
  * 헤더에 프로젝트 고유 데이터 속성 표기를 위한 `x-content-right-stored-at` 등의 메타데이터 필드가 정확히 적용되었습니다.
* **다운로드 명세 (`GET /v1/blobs/<BLOB_ID>`)**: Aggregator 노드를 경유해 대역폭 병목 없이 저장한 여권 미디어를 바이트 스트림 형태로 정확히 로드합니다.
* **응답 처리**: Walrus 노드 응답 포맷 규격(`newlyCreated.blobObject`, `alreadyCertified`)에 대한 분기 처리가 `parseWalrusStoreResponse` 헬퍼 함수로 체계화되어 있어, 블록체인 등록 전/후 상태에 유연하게 대응합니다.

---

## 3. Walrus Memory Ledger (MemWal) SDK 연동 정합성
* **참조 공식 문서**: [MemWal Quick Start Guide](file:///Users/charles/Projects/content_passport/docs/official-docs/walrus-memory-docs/getting-started/quick-start.md)
* **주요 적용 파일**: [memwal.ts](file:///Users/charles/Projects/content_passport/src/memwal.ts)

### 대조 결과
* **SDK 펙토리 초기화 (`MemWal.create`)**: 대리 실행 서명키(`key`), 온체인 고유 등록 계정 ID(`accountId`), 릴레이어 라우트 주소(`serverUrl`) 정보를 받아 규격화된 인스턴스를 반환합니다.
* **동기 저장 대기 (`rememberAndWait`)**: 메모리를 온체인 및 분산 인덱스 노드에 완결성 있게 저장하기 위해 백엔드 스레드를 차단(Block)하고 대기하는 `rememberAndWait` 프로토콜을 구현해 트랜잭션 도중 탈락하는 현상을 원천 차단했습니다.
* **조회 및 복원 (`recall`, `restore`)**: 벡터 유사성 점수 기준점(`maxDistance: 0.85`)을 사용해 사용자 신원 및 데이터 위변조 탐색 히스토리를 시맨틱 레벨에서 정확히 탐색합니다.

---

## 4. SEAL (Shamir Secret Sharing) 암호화 정합성
* **참조 공식 문서**: [SEAL Cryptographic Overview](file:///Users/charles/Projects/content_passport/docs/official-docs/seal-docs/index.md)
* **주요 적용 파일**: [evidence.ts](file:///Users/charles/Projects/content_passport/src/evidence.ts)

### 대조 결과
* **암호화 독립성**: 중요 원본 정보 및 단서(Evidence) 데이터를 AES-256-GCM 알고리즘으로 클라이언트 사이드에서 즉시 자체 봉인합니다.
* **다항식 분할 알고리즘 (`GF(256)`)**: 
  * 비밀키 조각 생성 시 GF(256) 갈루아 필드 연산을 완벽히 모사하는 다항식 연산식(`evaluatePolynomial`, `gfMul`)을 기반으로 동작합니다.
  * 복원 시 라그랑주 보간법 분모가 0이 되는 논리 에러 방지 구문(`gfDiv` 예외 처리)이 탑재되어 안전하게 조각을 병합하고 복호화해 냅니다.
