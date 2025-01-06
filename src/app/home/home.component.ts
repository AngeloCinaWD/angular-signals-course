import {
  Component,
  computed,
  effect,
  inject,
  Injector,
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

@Component({
  selector: 'home',
  imports: [MatTabGroup, MatTab, CoursesCardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // angular di default capisce cosa cambia nel DOM e va a mostrane il valore cambiato a schermo tramite change detection
  // per fare questo angular utilizza la libreria zone.js, atraverso questa i valori nel template vengono comparati con quelli del model prima e dopo un evento del DOM (ad esempio un click)
  counter = 0;

  // implementiamo un signal
  // un signal deve sempre avere un valore di default
  // questo non è un type number, ma un WritableSignal<number>, cioè un number wrappato in un container
  counterSignal: WritableSignal<number> = signal(0);

  increment() {
    this.counter++;
  }

  incrementSignalCounter() {
    // per incrementare il valore del signal lo possiamo fare settando il nuovo valore attraverso il .set()
    // il valore attuale del signal lo riceviamo invocando il signal
    this.counterSignal.set(this.counterSignal() + 1);
  }
}
