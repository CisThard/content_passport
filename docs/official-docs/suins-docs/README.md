# SuiNS (Sui Name Service) 공식 문서

> 출처: https://docs.suins.io/
> 수집일: 2026-06-20

Sui 블록체인의 탈중앙화 네이밍 서비스인 SuiNS의 전체 공식 문서이다.

## 폴더 구조

```
suins-docs/
├── index.md                          # 문서 홈
├── developer.md                      # 개요, 액티브 상수, 통합 가이드
├── communities.md                    # 커뮤니티 기능
├── dao.md                            # SuiNS DAO 거버넌스
├── node-operator.md                  # 풀노드 설정
├── search.md                         # 검색
├── suins.md                          # SuiNS 개요 (alias)
├── user.md                           # 사용자 가이드 (이름 등록, 갱신, 아바타, 링크 주소)
│
├── developer/
│   └── sdk.md                        # SuinsClient 설치 및 초기화
│   └── sdk/
│       ├── querying.md               # 이름 레코드, 가격, 갱신 가격 쿼리
│       ├── subnames.md               # 서브네임 PTB 커맨드
│       └── transactions.md           # 이름 등록/갱신/기본설정/메타데이터/소각 트랜잭션
│
└── move-registry/
    ├── move-registry.md              # MVR 개요, 디자인, PackageInfo, MVR 이름
    ├── maintainer-practices.md       # 패키지 유지보수 모범 사례
    ├── managing-package-info.md      # PackageInfo 객체 관리, 리버스 리졸루션, 소스코드 정보
    ├── mvr-names.md                  # MVR 앱 등록, 메타데이터 설정, 네트워크 연결
    └── tooling/
        ├── mvr-cli.md                # MVR CLI 설치 및 사용법
        └── typescript-sdk.md         # MVR TypeScript SDK 플러그인
```

## 주요 섹션

| 섹션 | 설명 |
|:---|:---|
| **User** | SuiNS 포털에서 이름 등록, 갱신, 아바타 설정, 주소 연결, IPFS 연동 |
| **Developer** | SuinsClient SDK, 이름 레코드 쿼리, 트랜잭션 빌딩, 서브네임 관리 |
| **Move Registry** | MVR 개념, PackageInfo 객체 관리, MVR CLI, TypeScript SDK 플러그인 |
| **DAO** | SuiNS DAO 거버넌스 규칙, 제안/투표/시행 절차 |
| **Node Operator** | 풀노드에서 SuiNS 이름 해석을 위한 설정 |
| **Communities** | SuiNS 커뮤니티 기능, 서브네임 페이스어, 커뮤니티 생성/관리 |

## Content Passport 관련 핵심 API

- `suins.registry<Registry>().lookup(domain::new(name))` — 온체인 이름 조회
- `name_record.target_address()` — 이름이 가리키는 주소 확인
- `name_record.has_expired(clock)` — 이름 만료 여부 확인
- `SuinsClient.getNameRecord('name.sui')` — 오프체인 이름 레코드 쿼리
- SuiNS 상수: Core V3 `0x00c2f85e...`, Core Object `0x6e0ddefc...`
