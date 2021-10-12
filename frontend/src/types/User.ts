import { Project } from './Project'

export type Role = 'ADMIN' | 'USER'

export type User = {
  id: string
  name: string
  email: string
  avatar?: string
  role: Role
  projects: Omit<Project[], 'author'>
  createdAt: string
  updatedAt: string
}
