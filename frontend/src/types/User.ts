export type Role = 'ADMIN' | 'USER'

export type User = {
  id: string
  name: string
  email: string
  avatar?: string
  role: Role
  createdAt: string
  updatedAt: string
}
