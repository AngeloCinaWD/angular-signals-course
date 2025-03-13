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

  // utilizzo il service che lavora con l'HttpClient di ng
  coursesService: CoursesService = inject(CoursesService);

  // non utilizzo più il fetch per ricevere i dati
  // coursesFetchService: CoursesServiceWithFetch = inject(
  //   CoursesServiceWithFetch
  // );

  constructor() {
    afterNextRender(() => {
      this.loadCourses().then(() => console.log(this.courses()));
    });
  }

  ngOnInit(): void {}

  async loadCourses() {
    try {
      // const courses = await this.coursesFetchService.loadAllCourses();
      const courses = await this.coursesService.loadAllCourses();
      this.courses.set(courses);
    } catch (err) {
      console.log(err);
    }
  }
}
