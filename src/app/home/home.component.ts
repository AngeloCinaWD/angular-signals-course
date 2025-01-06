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
  // riscrivo il signal col nuovo type Counter che è un object literal
  //   counterSignal: WritableSignal<number> = signal(0);
  counterSignal: WritableSignal<Counter> = signal<Counter>({ value: 0 });

  // i signals possono essere anche read only, non modificabili tramite .set() e .uodtae()
  // per dichiarare un signal come read only si aggiunge il metodo .asReadonly() e sno di tipo Signal
  counterReadOnly: Signal<number> = signal(100).asReadonly();

  // signal di un array con numeri
  values: WritableSignal<number[]> = signal<number[]>([0]);

  incrementSignalCounter() {
    // ora che il counter è un oggetto Counter un modo sbagliato di modificarne il valore è accedere direttamente alla proprietà
    // questa modalità funziona con la change detection normale, quando ci sarà la signal based change detection questo non funzionerà, non verrà visto il cambiamento
    // this.counterSignal().value++;
    // il modo corretto è passare una copia dell'oggetto counter e modificare la proprietà col nuovo valore, sempre tramite metodo .update() o tramite .set()
    // this.counterSignal.set({
    //   ...this.counterSignal(),
    //   value: this.counterSignal().value + 1,
    // });
    this.counterSignal.update((counter) => ({
      ...counter,
      value: counter.value + 1,
    }));
  }

  // metodo per modificare il valore di un signal con array
  // appendo un nuovo valore che sia il precedente più uno
  append() {
    // // potrei modificare l'array pushando il nuovo valore, ma va evitato perchè non chiamando il .update() o il .set() questo non funzionerà con la signal based change detection
    // const values = this.values();
    // // ricavo il valore dell'ultimo elemento nell'array tramite la sua lunghezza meno 1
    // const lastValue = values[values.length - 1];
    // // pusho il nuovo valore
    // // funziona perchè values è una reference all'array originale this.values() e non una copia
    // values.push(lastValue + 1);

    // il modo corretto è passare sempre un nuovo valore tramite .update() o .set()
    // in questo modo creo un array nuovo con tutti i valori dell'array originale più uno che aggiungo soomando uno all'ultimo value dell'array
    this.values.update((values) => [...values, values[values.length - 1] + 1]);
  }
}
