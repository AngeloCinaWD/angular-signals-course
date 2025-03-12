import {
  afterNextRender,
  Component,
  computed,
  effect,
  EffectRef,
  inject,
  Injector,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Course, sortCoursesBySeqNo } from '../models/course.model';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';
import { MatDialog } from '@angular/material/dialog';
import { MessagesService } from '../messages/messages.service';
import { catchError, from, throwError } from 'rxjs';
import {
  toObservable,
  toSignal,
  outputToObservable,
  outputFromObservable,
} from '@angular/core/rxjs-interop';
import { CoursesServiceWithFetch } from '../services/courses-fetch.service';

@Component({
  selector: 'home',
  imports: [MatTabGroup, MatTab, CoursesCardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  courses: WritableSignal<Course[]> = signal<Course[]>([]);

  // coursesService: CoursesService = inject(CoursesService);

  coursesFetchService: CoursesServiceWithFetch = inject(
    CoursesServiceWithFetch
  );

  constructor() {
    // this.loadCourses().then(() => console.log(this.courses()));
    // console.log('constructor');

    // il fetch dei corsi può essere fatto o nel constructor, o nel lifecycle onInit o qui nel costruttore con il lifecycle afterNextRender()
    // la callback in questo lifecycle viene chiamata una volta dopo che il next render viene effettuato
    // viene triggerato dopo l'onInit
    afterNextRender(() => {
      this.loadCourses().then(() => console.log(this.courses()));
      // console.log('afternextrender');
    });
  }

  ngOnInit(): void {
    // console.log('oninit');
    // this.loadCourses().then(() => console.log(this.courses()));
  }

  async loadCourses() {
    try {
      const courses = await this.coursesFetchService.loadAllCourses();
      this.courses.set(courses);
    } catch (err) {
      console.log(err);
    }
  }
}
