import { Role } from '../enums/role';

export interface Message {
  text: string;
  role: Role;
}
