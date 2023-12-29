import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGroceries } from './data/groceries.interface';
import { serverUrl } from 'src/app/shared/paths/server-path';
import { Meal } from './meal-creator/data/meal';
import { IUser } from 'src/app/shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class DietGeneratorService {

  readonly url = serverUrl;

  constructor(private http: HttpClient) { }

  getGroceries() {
    return this.http.get<IGroceries>(this.url + 'groceries');
  }

  saveMeal(meal: Meal) {
    return this.http.post(this.url + 'meals', { data: meal })
  }

  savePrivateMeal(meal: Meal, user: number) {
    return this.http.post(this.url + 'users-meals', { data: { ...meal, user }});
  }

  getMeals(preferences = {}) {
    return this.http.get(this.url + 'meals', { params: { ...preferences }});
  }

  savePersonalInfo(info: any) {
    return this.http.post(this.url + 'personal-infos', { data: info })
  }

  getMyPersonalInfo() {
    return this.http.get<IUser>(this.url + 'users/me', { params: { populate: 'personalInfo' } })
  }

  updatePersonalInfo(id: number, info: any) {
    return this.http.put(this.url + `personal-infos/${id}`, { data: info })
  }
}
