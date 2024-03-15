import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverUrl } from '../shared/paths/server-path';
import { IUser } from '../shared/interfaces/user.interface';
import { Role } from '../shared/enums/permissions.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  role: Role = Role.AUTHENTICATED;

  // readonly url = 'http://localhost:1337/api/auth/local';
  readonly url = serverUrl;
  readonly authUrl = this.url + 'auth/local';

  constructor(private http: HttpClient) { }

  register(registerModel: any) {
    return this.http.post(this.authUrl + '/register', registerModel);
  }

  login(loginModel: any) {
    return this.http.post(this.authUrl, loginModel);
  }

  getToken() {
    let token = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
    return token;
  }

  getRole() {
    return this.http.get<IUser>(this.url + 'users/me', { params: {populate: 'role' }})
  }
}
