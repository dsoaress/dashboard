import { Role } from '../types/User'
import { validateUserPermissions } from '../utils/validateUserPermissions'
import { useAuth } from './useAuth'

type UseCanPros = {
  roles?: Role[]
}

export function useCan({ roles }: UseCanPros) {
  const { user } = useAuth()

  if (!user) {
    return false
  }

  const userHasValidPermissions = validateUserPermissions({
    userRole: user.role,
    roles
  })

  return userHasValidPermissions
}
