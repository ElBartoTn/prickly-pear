import { User } from "./users.entity";

export class UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.lastName = user.lastName;
  }
}
