# Google Apps Script Boilerplate

Google Apps Script 템플릿 입니다.

## ⚠️ 특이사항

### 0. .clasp.json

- 반드시 .gitignore 에 포함하세요.
- .clasp.dev.json, .clasp.prod.json
- mockServiceWorker.js는 .claspignore 에 포함됩니다 (복사되면 GAS 런타임에 오류납니다)

### 1. 하이브리드 아키텍처

- **프론트엔드**: React + TypeScript + Vite (일반적인 웹 앱)
- **백엔드**: Google Apps Script + TypeScript (서버리스 환경)
- **배포**: 단일 HTML 파일로 번들링하여 Google Apps Script 환경에 최적화

### 2. 환경별 빌드 시스템

- **개발 환경**: `pnpm build:dev` - 개발용 API 엔드포인트 사용
- **프로덕션 환경**: `pnpm build:prod` - 프로덕션 API 엔드포인트 사용
- 환경별 `.env` 파일을 통한 설정 관리 (`.env.dev`, `.env.prod`)

### 3. Google Apps Script 제약사항

- **전역 함수 방식**: ES6 모듈 시스템 대신 전역 함수 사용 필수
- **타입 시스템**: TypeScript로 개발하지만 JavaScript로 컴파일 후 배포
- **API 호출**: `UrlFetchApp`을 통한 외부 API 통신
- **빌드 결과물**: `dist/` 폴더의 모든 파일이 Google Apps Script에 업로드됨

### 4. 단일 파일 번들링

- `vite-plugin-singlefile`을 사용하여 모든 CSS, JS를 HTML에 인라인
- Google Apps Script 환경에서 외부 파일 참조 불가로 인한 제약
- 상대 경로 기반 설정으로 Apps Script 환경 최적화

### 5. 수동 배포 방식

- Google Clasp CLI를 통한 로컬 배포


## 🏗️ 프로젝트 구조

```
root/
├── src/                    # React 프론트엔드 (FSD 구조)
│   ├── app.tsx            # 메인 React 애플리케이션
│   ├── main.tsx           # React 앱 진입점
│   ├── router.tsx         # 라우팅 설정
│   ├── features/          # 비즈니스 기능 모듈
│   │   ├── login/         # 로그인 기능
│   ├── pages/             # 페이지 컴포넌트
│   │   ├── login/         # 로그인 페이지
│   ├── shared/            # 공통 컴포넌트 및 유틸리티
│   │   ├── hook/          # 커스텀 훅
│   │   ├── model/         # 데이터 모델 (queries, mutations, google-script, fetchers)
│   │   ├── type/          # 타입 정의
│   │   └── ui/layout/     # 재사용 컴포넌트
│   ├── client.d.ts        # 클라이언트 타입 정의
│   └── index.css          # 글로벌 스타일
├── server/                # Google Apps Script 백엔드
│   ├── appsscript.json    # Apps Script 프로젝트 설정
│   ├── auth.ts            # 인증 및 사용자 관리
│   ├── api-utils.ts       # API 호출 유틸리티 함수들
│   └── server.d.ts        # 서버 전용 타입 정의
├── dist/                  # 빌드 결과물 (배포용)
├── .env.dev               # 개발 환경 변수
├── .env.prod              # 프로덕션 환경 변수
├── .clasp.dev.json        # Google Clasp 설정
├── .clasp.prod.json       # Google Clasp 설정
├── .claspignore           # Clasp 배포 제외 파일
├── tsconfig.json          # 프론트엔드 TypeScript 설정
├── tsconfig.server.json   # 서버 TypeScript 설정
├── vite.config.ts         # Vite 빌드 설정
├── vitest.config.ts       # Vitest 테스트 설정
└── package.json
```

### 아키텍처 특징

#### 🎯 하이브리드 구조

- **프론트엔드**: React + TypeScript + Vite
- **백엔드**: Google Apps Script + TypeScript
- **빌드**: 단일 HTML 파일로 번들링하여 Apps Script 환경에 최적화

#### 📁 Feature-Sliced Design (FSD)

`src/` 폴더는 FSD 아키텍처를 따라 구성:

```
src/
├── pages/          # 라우트별 페이지 컴포넌트
├── features/       # 독립적인 비즈니스 기능
├── shared/         # 공통 유틸리티 및 컴포넌트
└── app.tsx         # 애플리케이션 루트
```

#### 🔧 Google Apps Script 백엔드

- **전역 함수 방식**: namespace나 module 시스템 대신 전역 함수 사용
- **타입 안전성**: TypeScript로 개발 후 JavaScript로 컴파일
- **API 통합**: 외부 API 호출을 위한 유틸리티 함수 제공

## 🚀 개발 및 빌드

### 개발 환경 설정

```bash
# 의존성 설치
pnpm install

# 프론트엔드 개발 서버 실행 (포트 3000)
pnpm dev

# 서버 코드 빌드 (TypeScript → JavaScript) (AppsScript 환경에서만 동작)
pnpm build:server

# 서버 코드 실시간 빌드 감시 (AppsScript 환경에서만 동작)
pnpm build:server:watch
```

### 환경별 빌드 시스템

```bash
# 개발 환경 빌드 (개발용 API 엔드포인트)
pnpm build:dev

# 프로덕션 환경 빌드 (프로덕션 API 엔드포인트)
pnpm build:prod

# 개발 환경 빌드 + 배포
pnpm migrate:dev

# 프로덕션 환경 빌드 + 배포
pnpm migrate:prod
```

### 코드 품질 관리

```bash
# 타입 체크 (모듈과 모듈이 아닌 JS루 구분되어 ts-config가 분리됨)
pnpm check-types
pnpm server-check-types

# 린트 검사
pnpm lint

# 코드 포맷팅
pnpm format

# 테스트 실행
pnpm test

# 테스트 감시 모드
pnpm test:watch
```

### 빌드 및 배포

```bash
# 환경별 전체 빌드 (프론트엔드 + 서버)
pnpm build:dev      # 개발 환경
pnpm build:prod     # 프로덕션 환경

# 프론트엔드만 빌드 (환경별)
vite build --mode dev   # 개발 환경
vite build --mode prod  # 프로덕션 환경

# 빌드 결과 미리보기
pnpm preview

# 빌드 파일 변경 감지
pnpm build:watch

# Google Apps Script 배포
pnpm clasp:push

# 환경별 빌드 + 배포 (원스톱)
pnpm migrate:dev    # 개발 환경
pnpm migrate:prod   # 프로덕션 환경
```

## 📦 빌드 시스템

### 프론트엔드 빌드

- **vite-plugin-singlefile**: 모든 CSS, JS를 단일 HTML 파일에 인라인
- **Vanilla Extract**: CSS-in-JS로 스타일 관리
- **상대 경로 기반**: Apps Script 환경에서 정상 동작하도록 설정

### 서버 빌드

- **TypeScript 컴파일**: `server/` → `dist/` 폴더로 JavaScript 변환
- **전역 함수 방식**: Google Apps Script 환경에 맞는 함수 구조
- **설정 파일 복사**: `appscript.json` 자동 복사

### 빌드 결과물

```
dist/
├── index.html        # 단일 HTML 파일 (모든 프론트엔드 코드 포함)
├── auth.js          # 인증 관련 Apps Script 함수들
├── api-utils.js     # API 유틸리티 함수들
├── appscript.json   # Apps Script 프로젝트 설정
└── images/          # 정적 이미지 파일들
```

## 🛠️ 기술 스택

### Frontend

- **React 18**: UI 라이브러리
- **TypeScript**: 타입 안전성
- **Vite**: 빌드 도구 및 개발 서버
- **React Router**: 클라이언트 사이드 라우팅
- **Vanilla Extract**: CSS-in-JS 스타일링
- **@tanstack/react-query**: 서버 상태 관리

### Backend (Google Apps Script)

- **Google Apps Script**: 서버리스 백엔드 플랫폼
- **TypeScript**: 개발 시 타입 안전성 (JavaScript로 컴파일)
- **Google Workspace APIs**: Sheets, Drive 등 Google 서비스 연동
- **UrlFetchApp**: 외부 API 호출

### Development Tools

- **ESLint**: 코드 품질 관리
- **Prettier**: 코드 포맷팅
- **Vitest**: 테스트 프레임워크
- **lint-staged**: Git 커밋 시 자동 린트

## 📝 개발 컨벤션

### 1. 프로젝트 구조 컨벤션

#### FSD (Feature-Sliced Design) 아키텍처

```
src/
├── pages/          # 라우트별 페이지 컴포넌트 (비즈니스 로직 최소화)
├── features/       # 독립적인 비즈니스 기능 모듈
│   ├── login/      # 로그인 기능
│   ├── gnb/        # 글로벌 네비게이션
│   ├── export/     # 데이터 내보내기 기능
│   └── export-history/ # 내보내기 이력 관리
└── shared/         # 공통 유틸리티 및 컴포넌트
    ├── hook/       # 커스텀 훅
    ├── model/      # 데이터 모델 및 쿼리
    ├── type/       # 타입 정의
    └── ui/         # 공통 UI 컴포넌트
```

### 2. 파일 및 폴더 명명 규칙

#### 폴더명

- **kebab-case** 사용: `export-history/`, `user-dropdown/`
- 기능별 그룹핑: `ui/`, `model/`, `hook/`, `type/`

#### 파일명

- **컴포넌트**: `PascalCase.tsx` (예: `Login.tsx`, `UserDropdown.tsx`)
- **훅**: `use-kebab-case.ts` (예: `use-workspace-id.ts`, `use-org-id.ts`)
- **유틸리티**: `kebab-case.ts` (예: `fetchers.ts`, `queries.ts`)
- **타입**: `kebab-case.types.ts` 또는 `server.d.ts`

### 3. 컴포넌트 작성 컨벤션

#### 컴포넌트 구조

```typescript
// ✅ 권장 패턴
export const Login = () => {
  // 1. 상태 및 훅
  const navigate = useNavigate()
  const toast = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // 2. 뮤테이션 및 쿼리
  const { mutate: refetchAccessToken, isPending: tokenLoading } = useAccessTokenMutation()
  const { mutate: loginMutate, isPending: loginLoading } = useLoginMutation()

  // 3. 이벤트 핸들러
  const handleSignupClick = () => {
    window.open(`${import.meta.env.VITE_URL}/join/signup`, '_blank')
  }

  const handleLoginClick = () => {
    loginMutate(/* ... */)
  }

  // 4. useEffect (항상 마지막에 위치)
  // useEffect(() => {}, [])

  // 5. 렌더링
  return (
    <Box position="relative">
      {/* JSX */}
    </Box>
  )
}
```

#### Import 순서

```typescript
// 1. React 관련
import { useState } from 'react'

// 2. 외부 라이브러리
import { useNavigate } from 'react-router-dom'

// 3. 내부 모듈 (절대 경로)
import { useAccessTokenMutation, useLoginMutation } from '@/shared'
```

### 4. 상태 관리 컨벤션

#### React Query 패턴

```typescript
// ✅ 쿼리 훅 - JSDoc 주석 필수
/**
 * 액세스 토큰을 가져오는 쿼리 훅
 */
export const useAccessTokenQuery = (enabled = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.ACCESS_TOKEN,
    queryFn: fetchAccessToken,
    enabled,
  })
}

// ✅ 뮤테이션 훅 - 성공/실패 처리 포함
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
  })
}
```

#### 구조분해할당 스타일

```typescript
// ✅ 권장: 각 속성을 개별 줄로 분리
const { mutate: refetchAccessToken, isPending: tokenLoading } = useAccessTokenMutation()

// ❌ 지양: 한 줄에 모든 속성 나열
const { mutate: refetchAccessToken, isPending: tokenLoading } = useAccessTokenMutation()
```

### 5. 스타일링 컨벤션

#### Vanilla Extract 사용

```typescript
// ✅ CSS-in-JS 패턴
import { style } from '@vanilla-extract/css'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
})
```

### 6. 타입 정의 컨벤션

#### 서버 타입 (server.d.ts)

```typescript
// ✅ Google Apps Script 환경을 위한 전역 타입
/// <reference types="google-apps-script" />

interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch'
```

#### 클라이언트 타입

```typescript
// ✅ 명확한 타입 정의
interface LoginCredentials {
  email: string
  password: string
}

interface User {
  user_id: string
  email: string
  name: string
  profile_image_url?: string
}
```

### 7. 환경 변수 컨벤션

#### 환경별 설정

```typescript
// ✅ import.meta.env 사용
const apiUrl = import.meta.env.URL
const isProduction = import.meta.env.MODE === 'prod'

// 환경별 빌드 명령어
// pnpm build:dev  - 개발 환경
// pnpm build:prod - 프로덕션 환경
```

### 8. 에러 처리 컨벤션

#### 뮤테이션 에러 처리

```typescript
// ✅ Toast를 통한 사용자 피드백
const { mutate: loginMutate } = useLoginMutation()

const handleLogin = () => {
  loginMutate(
    { email, password },
    {
      onSuccess: () => {
        // 성공 처리
      },
      onError: () => {
        toast.open(({ isOpen, close }) => (
          <Toast isOpen={isOpen} onClose={close}>
            로그인 실패
          </Toast>
        ))
      },
    }
  )
}
```

### 9. 백엔드 개발 컨벤션 (Google Apps Script)

#### 함수 작성 규칙

```typescript
// ✅ 올바른 방식: 전역 함수 (ES6 모듈 시스템 사용 불가)
function fetchExternalData(email: string) {
  const apiUrl = getApiUrl()
  const token = getToken()
  return fetchExternalApi(apiUrl, { method: 'get' }, token)
}

// ❌ 잘못된 방식: export/import 사용 불가
export function fetchData() { ... }
import { someFunction } from './utils'
```

#### API 호출 패턴

```typescript
// ✅ api-utils.ts의 유틸리티 함수 활용
function handleApiCall() {
  try {
    const response = fetchExternalApi(
      'https://api.example.com/data',
      {
        method: 'post',
        payload: { key: 'value' },
        headers: { 'Content-Type': 'application/json' },
      },
      'your-api-token',
    )

    if (response.success) {
      return response.data
    } else {
      Logger.log(`API Error: ${response.error}`)
      return null
    }
  } catch (error) {
    Logger.log(`Unexpected error: ${error}`)
    throw error
  }
}
```

#### 타입 안전성 확보

```typescript
// ✅ server.d.ts에서 전역 타입 정의
interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

// ✅ 함수에서 타입 활용
function processUserData(userData: User): ApiResponse<User> {
  try {
    // 데이터 처리 로직
    return {
      success: true,
      data: userData,
    }
  } catch (error) {
    return {
      success: false,
      error: error.toString(),
    }
  }
}
```

### 10. 빌드 및 배포 컨벤션

#### 환경별 빌드

```bash
# ✅ 개발 환경 빌드 및 배포
pnpm build:dev      # 개발용 API 엔드포인트 사용
pnpm migrate:dev    # 개발 환경에 배포

# ✅ 프로덕션 환경 빌드 및 배포
pnpm build:prod     # 프로덕션 API 엔드포인트 사용
pnpm migrate:prod   # 프로덕션 환경에 배포
```

#### 배포 전 체크리스트

```bash
# 1. 타입 체크
pnpm check-types
pnpm server-check-types

# 2. 린트 검사
pnpm lint

# 3. 테스트 실행
pnpm test

# 4. 빌드 확인
pnpm build:dev  # 또는 build:prod

# 5. 배포
pnpm clasp:push
```

### 11. 코드 품질 컨벤션

#### 린트 및 포맷팅

```bash
# ✅ 커밋 전 자동 실행 (lint-staged)
pnpm pre-commit

# ✅ 수동 실행
pnpm lint          # ESLint 검사
pnpm format        # Prettier 포맷팅
```

#### 테스트 작성

```typescript
// ✅ Vitest를 사용한 단위 테스트
import { describe, it, expect } from 'vitest'
import { someUtilFunction } from './utils'

describe('someUtilFunction', () => {
  it('should return expected result', () => {
    const result = someUtilFunction('input')
    expect(result).toBe('expected')
  })
})
```

### 12. 문서화 컨벤션

#### JSDoc 주석

```typescript
// ✅ 모든 public 함수에 JSDoc 주석 필수
/**
 * 사용자 로그인을 처리하는 뮤테이션 훅
 * @returns 로그인 뮤테이션 객체
 */
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: ({ email, password }: LoginCredentials) => login(email, password),
  })
}
```

#### README 업데이트

- 새로운 기능 추가 시 README 업데이트 필수
- 환경 설정 변경 시 문서 동기화
- 배포 프로세스 변경 시 가이드 업데이트

## 🔧 설정 파일

### `vite.config.ts`

- **viteSingleFile**: 단일 HTML 파일 번들링
- **vanillaExtractPlugin**: CSS-in-JS 지원 (런타임은 아님)
- **상대 경로 설정**: Apps Script 환경 최적화

### `tsconfig.server.json`

- **target**: ES2020
- **module**: None (전역 스코프 사용)
- **types**: google-apps-script

### `appscript.json`

```json
{
  "timeZone": "Asia/Seoul",
  "dependencies": {
    "enabledAdvancedServices": []
  },
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8"
}
```

## 📚 배포 프로세스

### 1. 로컬 개발

```bash
# 개발 서버 실행
pnpm dev

# 실시간 서버 코드 빌드
pnpm build:server:watch
```

### 2. 빌드 및 테스트

```bash
# 환경별 빌드
pnpm build:dev      # 개발 환경
pnpm build:prod     # 프로덕션 환경

# 테스트 실행
pnpm test

# 타입 체크 (프론트엔드 + 서버)
pnpm check-types
pnpm server-check-types
```

### 3. 수동 배포 (현재 방식)

#### 🛠️ Clasp을 통한 로컬 배포

```bash
# Clasp 로그인 (최초 1회)
pnpm clasp:login

# 환경별 빌드 + 배포 (원스톱)
pnpm migrate:dev    # 개발 환경에 배포
pnpm migrate:prod   # 프로덕션 환경에 배포

# 개별 명령어
pnpm build:dev      # 개발 환경 빌드
pnpm build:prod     # 프로덕션 환경 빌드
pnpm clasp:push     # Google Apps Script에 배포
```

#### ⚙️ Clasp 설정

**`.clasp.json`**

```json
{
  "scriptId": "your-apps-script-project-id",
  "rootDir": "./dist"
}
```

### 4. 환경별 배포 전략

#### 개발 환경 배포

```bash
# 개발용 API 엔드포인트 사용
pnpm migrate:dev

# 또는 단계별 실행
pnpm build:dev
pnpm clasp:push
```

#### 프로덕션 환경 배포

```bash
# 프로덕션 API 엔드포인트 사용
pnpm migrate:prod

# 또는 단계별 실행
pnpm build:prod
pnpm clasp:push
```

### 5. 배포 옵션

- **웹 앱**: 독립적인 웹 애플리케이션으로 배포
- **Google Workspace Add-on**: Sheets, Docs 등에 통합
- **조직 내부 공유**: 마켓플레이스 심사 없이 조직 내 배포

### 6. 배포 후 확인사항

1. **Google Apps Script 에디터에서 파일 업로드 확인**
2. **웹앱 URL에서 정상 동작 확인**
3. **환경별 API 엔드포인트 연결 확인**
4. **로그인 및 주요 기능 테스트**

> **참고**: 자동 배포에서 수동 배포로 전환한 이유는 안정성과 제어 가능성을 높이기 위함입니다. 자세한 수동 배포 가이드는 `CLASP_SETUP.md`를 참조하세요.

## 🔍 트러블슈팅

### 일반적인 문제들

#### 1. Apps Script에서 함수를 찾을 수 없음

```typescript
// 해결: 전역 함수로 선언 확인
function myFunction() { ... }  // ✅
export function myFunction() { ... }  // ❌
```

#### 2. 빌드 시 타입 에러

```bash
# 타입 체크 실행
pnpm check-types

# 서버 코드 별도 체크
tsc --project tsconfig.server.json --noEmit
```

#### 3. 단일 파일 빌드 실패

- `vite.config.ts`의 `assetsInlineLimit` 설정 확인
- `viteSingleFile` 플러그인 설정 확인

## 📚 참고 자료

- [Google Apps Script 문서](https://developers.google.com/apps-script)
- [Google Apps Script TypeScript 가이드](https://developers.google.com/apps-script/guides/typescript)
- [Google Workspace Add-ons](https://developers.google.com/workspace/add-ons)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Vite 문서](https://vitejs.dev/)
- [React Router 문서](https://reactrouter.com/)

### 개발 워크플로우

1. **개발 환경 설정**

   ```bash
   pnpm install
   pnpm dev
   ```

2. **코드 작성 및 테스트**

   ```bash
   pnpm test
   pnpm check-types
   pnpm server-check-types
   ```

3. **빌드 및 배포 테스트**

   ```bash
   pnpm build:dev
   pnpm migrate:dev  # 개발 환경에서 테스트
   ```

4. **코드 품질 검사**
   ```bash
   pnpm lint
   pnpm format
   pnpm pre-commit
   ```
