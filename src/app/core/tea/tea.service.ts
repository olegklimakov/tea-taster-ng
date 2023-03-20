import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tea } from '@app/models';
import { environment } from '@env/environment';
import { EMPTY, map, Observable } from 'rxjs';

type TeaResponse = Omit<Tea, 'image'>;

@Injectable({
  providedIn: 'root',
})
export class TeaService {
  private images: Array<string> = ['green', 'black', 'herbal', 'oolong', 'dark', 'puer', 'white', 'yellow'];

  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<Tea>> {
    return this.http
      .get<Array<TeaResponse>>(`${environment.dataService}/tea-categories`)
      .pipe(map((teas) => teas.map((t) => this.convert(t))));
  }

  get(id: number): Observable<Tea> {
    // This is the part you will fill in once the tests are in place
    return this.http
      .get<TeaResponse>(`${environment.dataService}/tea-categories/${id}`)
      .pipe(map((tea) => this.convert(tea)));
  }

  private convert(tea: TeaResponse): Tea {
    return { ...tea, image: `assets/img/${this.images[tea.id - 1]}.jpg` };
  }
}
