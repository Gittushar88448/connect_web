// These mirror the enums in models/User.ts exactly. They live in their own
// dependency-free file specifically so client components (role dropdown,
// status toggle, the create/edit user form) can import the enum values
// without pulling mongoose/bcryptjs into the browser bundle — models/User.ts
// re-exports these for server-side code that wants them from one place.

export enum Account {
  SUPERADMIN = "superadmin",
  ADMIN = "admin",
  CUSTOMER = "customer",
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
  PREFER_NOT_TO_SAY = "prefer_not_to_say",
}

export enum UserStatus {
  ACTIVE = "active",
  PENDING = "pending",
  INACTIVE = "inactive",
  SUSPENDED = "suspended",
}
