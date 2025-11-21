import type { User } from '@/shared/type'

// User 타입에 맞는 모킹 사용자 데이터
export const mockUsers: User[] = [
  {
    user_id: 'user-1',
    name: '테스트 사용자',
    email: 'test@example.com',
    org_user_role: 'ADMIN',
    user_status: 'ACTIVE',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    user_id: 'user-2',
    name: '일반 사용자',
    email: 'user@example.com',
    org_user_role: 'USER',
    user_status: 'ACTIVE',
    created_at: '2024-01-02T00:00:00Z',
  },
  {
    user_id: 'user-3',
    name: '클라이언트 사용자',
    email: 'client@example.com',
    org_user_role: 'CLIENT',
    user_status: 'ACTIVE',
    created_at: '2024-01-03T00:00:00Z',
  },
  {
    user_id: 'user-4',
    name: '메이커 사용자',
    email: 'maker@example.com',
    org_user_role: 'MAKER',
    user_status: 'INACTIVE',
    created_at: '2024-01-04T00:00:00Z',
  },
]
