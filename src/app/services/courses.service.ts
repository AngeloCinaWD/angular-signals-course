import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { Course } from '../models/course.model';
import { GetCoursesResponse } from '../models/get-courses.response';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  // metodo per ricevere tutti i corsi dal BE
  // utilizziamo le promises invece degli Observables di rxjs
  // quindi questo metodo ritorna una Promise di Course[]
  // sintassi async await, questo indica che verrà eseguito del codice asincrono e che verrà restituita una promise
  // se ritornassi non una promise, ma un primitive value (ad es. un array), questo valore viene automaticamente wrappato in una promise e come tale va gestito
  async loadAllCourses(): Promise<Course[]> {}
}
