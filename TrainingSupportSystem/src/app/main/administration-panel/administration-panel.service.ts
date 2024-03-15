import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from 'src/app/shared/enums/permissions.enum';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { serverUrl } from 'src/app/shared/paths/server-path';

@Injectable({
  providedIn: 'root'
})
export class AdministrationPanelService {

  readonly url = serverUrl;

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<IUser[]>(this.url + 'users', { params: { populate: 'role' } });
  }

  getRoles() {
    return this.http.get(this.url + 'users-permissions/roles');
  }

  updateUser(user: IUser) {
    return this.http.put(this.url +  `users/${user.id}`, { role: user.role.id });
  }

  deleteUser(user: IUser) {
    return this.http.delete(this.url + `users/${user.id}`);
  }
}
