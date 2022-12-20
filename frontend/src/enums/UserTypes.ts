export enum UserTypes {
  Student = "stud",
  Professor = "prof",
  TA = "ta",
  Admin = "admin",
  Sysop = "sysop",
}

export enum DisplayedUserTypes {
  "Student" = "stud",
  "Teaching Assistant" = "ta",
  "Professor" = "prof",
  "TA Administrator" = "admin",
  "Sysop" = "sysop",
}

export const getDisplayedUserTypesKey = {
  "stud": "Student",
  "ta": "Teaching Assistant",
  "prof": "Professor",
  "admin": "TA Administrator",
  "sysop": "Sysop",
}

export function convertUserTypes(roles: string[]): string[] {
  return roles.map((role) => DisplayedUserTypes[role]);
};

export const availableUserTypes = ["Student", "Teaching Assistant", "Professor", "TA Administrator", "Sysop"]