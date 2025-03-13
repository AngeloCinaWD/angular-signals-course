import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { Course } from '../models/course.model';
import { GetCoursesResponse } from '../models/get-courses.response';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  // utilizzare l'http client di angular invece del .fetch() è meglio perchè si possono utilizzare al meglio gli interceptors (permettono di intercettare le request e le response) ed inoltre consente il testing dell'app

  // inject dell'HttpClient
  http: HttpClient = inject(HttpClient);

  // per gestire tutto come una promise dobbiamo utilizzare la sintassi async await
  async loadAllCourses(): Promise<Course[]> {
    // chiamata GET verso il backend
    // una chiamata effettuata con l'HttpClient di ng ci ritorna un Observable
    // salviamo questo observable in una const
    // utilizzo il type GetCoursesResponse perchè la response del backend è un oggetto contenente una proprietà courses che è un array di Course
    const courses$ = this.http.get<GetCoursesResponse>(
      `${environment.apiRoot}/courses`
    );
    // convertiamo l'observable in una promise tramite il metodo firstValueFrom di RxJs, questo prende il primo valore emesso da un observable e lo restituisce convertito in una promise
    // una request HttpClient restituisce un observable che emette un singolo valore, quindi se utilizzassi il metodo lastValueFrom() sarebbe lo stesso in questo caso
    // salvo la promise in ina const await
    const response: GetCoursesResponse = await firstValueFrom(courses$);

    // essendo la response un oggetto contenente una proprietà courses che è un array di Course, ritorno il valore di courses
    return response.courses;
  }
}
