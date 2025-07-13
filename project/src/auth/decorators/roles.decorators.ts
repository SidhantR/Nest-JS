import { SetMetadata } from "@nestjs/common"
import { UserRole } from "src/user/entities/user.entity"

// storing metadata on route handlers (role)
// roles guad later read this metadata to check if user has permission
export const ROLES_KEY = "roles"

export const Roles = (...roles : UserRole[]) => SetMetadata(ROLES_KEY, roles)