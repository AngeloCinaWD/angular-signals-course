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
export class HomeComponent {
  counterSignal: WritableSignal<Counter> = signal<Counter>({ value: 0 });

  // COMPUTED SIGNALS
  // una computed signals è un signal readonly (type Signal e non WritableSignal) che viene automaticamente ricalcolato in base ad un signal sorgente a cui fa riferimento
  // quando definiamo un computed signal basta indicare un signal all'interno del codice della sua callback, bisogna invocarlo
  // una computed deve sempre ritornare un valore
  tenXCounter: Signal<number> = computed(() => {
    const valCounter = this.counterSignal().value;
    return valCounter * 10;
  });

  // posso derivare un altro computed signal anche da un computed signal
  hundredXCounter: Signal<number> = computed(() => {
    return this.tenXCounter() * 10;
  });

  values: WritableSignal<number[]> = signal<number[]>([0]);

  constructor() {
    // se volessi far fare qualcosa ogni volta che un signal cambia il suo valore, posso dichiarare un PURE SIDE EFFECT
    // utilizzando l'API effect() qui nel costruttore
    // nel corpo della funzione indico quello che devve accadere quando un signal cambia valore, invocandolo
    // posso invocare anche un computed signal
    // non vanno utilizzati spesso i pure side effects è meglio utilizzare le funzioni in modo esplicito, ad esempio salvare i dati di un form in un BE quando clicco un button
    effect(() => {
      // console.log('Value of counter signal: ' + this.counterSignal().value);
      console.log('Value of computed signal: ' + this.tenXCounter());
    });
  }

  incrementSignalCounter() {
    this.counterSignal.update((counter) => ({
      ...counter,
      value: counter.value + 1,
    }));
  }

  append() {
    this.values.update((values) => [...values, values[values.length - 1] + 1]);
  }
}
