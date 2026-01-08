import { Role } from '../enums/role';

export interface Message {
  message: string;
  role: Role;
}
