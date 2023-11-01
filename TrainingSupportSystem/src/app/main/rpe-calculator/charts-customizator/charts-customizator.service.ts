import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICharts } from './data/charts.interface';

@Injectable({
  providedIn: 'root'
})
export class ChartsCustomizatorService {

  readonly url = 'http://localhost:1337/api/'

  constructor(private http: HttpClient) { }

  postCharts(model: ICharts) {
    return this.http.post(this.url + 'rpes', { data: model })
  }

  getCharts() {
    return this.http.get<any>(this.url + 'users/me', { params: { populate: '*' } } );
  }

  editCharts(id: number, model: ICharts) {
    return this.http.put(this.url + `rpes/${id}`, { data: model })
  }

  customize(table: number[][], eightyFive: number, seventy: number) {
    for (let i = 0; i <= 10; i++) {
      table.pop();
    }
    for (let i = 0; i <= 10; i++) {
      table.push([]);
    }

    table[0][0] = 1;
    table[0][eightyFive - 1] = 0.85;
    table[0][seventy - 1] = 0.7;
    const x = 0.15 / (eightyFive - 1);
    const y = 0.15 / (seventy - eightyFive);

    for (let i = 1; i < 15; i++) {
      if (i >= 1 && i < eightyFive - 1) {
        table[0][i] = parseFloat((table[0][i - 1] - x).toFixed(4));
      } 
      else if (i > (eightyFive - 1) && i < (seventy - 1)) {
        table[0][i] = parseFloat((table[0][i - 1] - y).toFixed(4));
      } 
      else if (i > (seventy - 1)) {
        table[0][i] = parseFloat((table[0][i - 1] - (y / 2)).toFixed(4))
      }
    }

    for (let i = 1; i <= 10; i++) {
      for (let j = 0; j < 15; j++) {

        if (j < (eightyFive - 1)) {
          table[i][j] = parseFloat((table[i - 1][j] - (x / 2)).toFixed(4));
        } 
        else if (j >= (eightyFive - 1) && j <= (seventy - 1)) {
          table[i][j] = parseFloat((table[i - 1][j] - (y / 2)).toFixed(4));
        } 
        else if (j > (seventy - 1)) {
          table[i][j] = parseFloat((table[i - 1][j] - (y / 4)).toFixed(4));
        }

      }
    }
  }
}
