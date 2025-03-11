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

// creiamo un type che sia un object literal
type Counter = {
  value: number;
};

@Component({
  selector: 'home',
  imports: [MatTabGroup, MatTab, CoursesCardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  // inizializziamo una variabile courses come un signal array di corsi con valore iniziale array vuoto
  courses: WritableSignal<Course[]> = signal<Course[]>([]);

  // inietto il CoursesService per fetchare i dati dal BE
  coursesService: CoursesService = inject(CoursesService);

  // inietto il CourseFetchService
  coursesFetchService: CoursesServiceWithFetch = inject(
    CoursesServiceWithFetch
  );

  constructor() {
    // chiamo il emetodo per fetcahe i courses
    this.loadCourses().then(() => console.log(this.courses()));
  }

  // metodo per fetchare i corsi by promise
  // loadCourses() {
  //   this.coursesFetchService
  //     .loadAllCourses()
  //     // tramite il .then() assegno al signal courses l'array di Course
  //     .then((courses) => this.courses.set(courses))
  //     // per gestire eventuali errori utilizzo il .catch()
  //     .catch(err => {});
  // }
  // è più semplice gestire il tutto tramite sintassi async await
  async loadCourses() {
    // quello che ricevo è una promise quindi posso utilizzare await al posto di stare a scivere il .then() e salvare tutto in una const
    // inoltre la gestione degli errori è molto semplice, si utilizza lo statement try catch
    try {
      const courses = await this.coursesFetchService.loadAllCourses();

      //  in questo modo quando si avrà la risposta dal backend con i dati, questi verranno assegnati al signal courses
      this.courses.set(courses);
    } catch (err) {
      // se nel blocco try c'è un await, quindi gestisce una promise, se la promise lancia un errore questo viene intercettato e può essere gestito nel catch block
      console.log(err);
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
}
