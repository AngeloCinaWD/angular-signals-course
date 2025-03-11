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
  // async await sintax is native language sintax, non è una feature di angular
  // ci sono diversi client che possono essere utilizzati al posto dell'httpclient di angular, ad esempio tRPC
  // oppure utlizzare il fetch() di js
  // IN QUESTO SERVICE VERRANNO EFFETTUATE LE HTTP REQUEST CON L'HTTP DI ANGULAR
  async loadAllCourses(): Promise<Course[]> {
    return [];
  }
}
