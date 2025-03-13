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
  // dichiaro questa proprietà private tramite shorthand di js #
  // in questo modo questa non sarà più visibile dall'esterno della classe e quindi neanche nel template
  #courses: WritableSignal<Course[]> = signal<Course[]>([]);

  coursesService: CoursesService = inject(CoursesService);

  // voglio dividere i corsi ricevuti secondo la categoria
  // utilizzo i computed signals
  beginnerCourses: Signal<Course[]> = computed(() => {
    // il modo migliore per definire una computed è indicare all'inizio quali sono i signals da cui dipende
    const courses = this.#courses();
    // filtro i corsi secondo categoria con array method js .filter()
    // senza il return mi restituirebbe un undefined
    return courses.filter((course) => course.category === 'BEGINNER');
  });

  // advanced courses
  advancedCourses: Signal<Course[]> = computed(() => {
    const courses = this.#courses();
    return courses.filter((course) => course.category === 'ADVANCED');
  });

  constructor() {
    this.loadCourses().then(() =>
      console.log(
        this.#courses(),
        this.beginnerCourses(),
        this.advancedCourses()
      )
    );
  }

  ngOnInit(): void {}

  async loadCourses() {
    try {
      const courses = await this.coursesService.loadAllCourses();
      this.#courses.set(courses);
    } catch (err) {
      console.log(err);
    }
  }
}
