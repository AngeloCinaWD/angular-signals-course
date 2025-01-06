import {
  Component,
  computed,
  effect,
  inject,
  Injector,
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

@Component({
  selector: 'home',
  imports: [MatTabGroup, MatTab, CoursesCardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  counterSignal: WritableSignal<number> = signal(0);

  // i signals possono essere anche read only, non modificabili tramite .set() e .uodtae()
  // per dichiarare un signal come read only si aggiunge il metodo .asReadonly() e sno di tipo Signal
  counterReadOnly: Signal<number> = signal(100).asReadonly();

  incrementSignalCounter() {
    // this.counterSignal.set(this.counterSignal() + 1);
    // per modificare il valore di un signal si può utilizzare anche un'altra API al posto di .set(), l'API .update()
    // questo metodo ritorna una callback che ha come primo parametro il valore attuale del signal e ritorna il valore che vogliamo noi
    this.counterSignal.update((counter) => counter + 1);
  }
}
