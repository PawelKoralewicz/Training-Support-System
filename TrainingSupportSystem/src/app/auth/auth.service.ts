import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly url = 'http://localhost:1337/api/auth/local';

  constructor(private http: HttpClient) { }

  register(registerModel: any) {
    return this.http.post(this.url + '/register', registerModel);
  }

  login(loginModel: any) {
    return this.http.post(this.url, loginModel);
  }

  getToken() {
    let token = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
    return token;
  }
}
