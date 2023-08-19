import { Injectable } from '@nestjs/common';

@Injectable()
export class ListUserDomain {
  users = [
    {
      name: 'hallexcosta',
    },
    {
      name: 'hallancosta',
    },
  ];
  public listUsers() {
    return this.users;
  }
}
