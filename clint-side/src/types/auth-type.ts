export enum LoginType {
  INITIALIZATION = "INITIALIZATION",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  FAIL = "FAIL",
}

export interface user {
  userEmail: string;
  userPassword?: string;
  userName: string;
  userRole: userRole | undefined
  userToken: string;
}

enum userRole {
  STUDENT = "Student",
  TEACHER = "Teacher",
  ADMIN = "Admin",
}
