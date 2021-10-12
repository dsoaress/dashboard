import { User } from './User'

export type Project = {
  id: string
  title: string
  description: string
  status: 'OPEN' | 'CLOSED'
  author: User
  createdAt: string
  updatedAt: string
}
