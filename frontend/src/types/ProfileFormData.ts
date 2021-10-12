import { User } from './User'

export interface ProfileFormData extends Partial<User> {
  oldPassword?: string
  password?: string
}
