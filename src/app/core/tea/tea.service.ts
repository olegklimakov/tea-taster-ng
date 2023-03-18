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

  private convert(tea: TeaResponse): Tea {
    return { ...tea, image: `assets/img/${this.images[tea.id - 1]}.jpg` };
  }
}
