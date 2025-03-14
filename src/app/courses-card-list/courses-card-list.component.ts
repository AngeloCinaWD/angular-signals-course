import { Component, inject, input, InputSignal, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Course } from '../models/course.model';
import { MatDialog } from '@angular/material/dialog';
import { Transform } from 'stream';

@Component({
  selector: 'courses-card-list',
  imports: [RouterLink],
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.scss',
})
export class CoursesCardListComponent {
  // passiamo i corsi da visualizzare tramite signal inputs
  // rendiamo required, obbligatoria, l'input
  // un'input obbligatoria non permette di passare un valore iniziale di default
  // courses: InputSignal<Course[]> = input.required<Course[]>();
  // i signals hanno sempre un valore iniziale, quindi nel caso si utilizzi una input required e non si può passare il valore iniziale, angular la considererà come undefined
  // utilizzo l'input come non obbligatoria e definisco come initial value un array vuoto
  courses: InputSignal<Course[]> = input<Course[]>([], {
    // possiamo passare un oggetto con delle opzioni
    //   alias: cambio il nome con cui deve essere chiamata questa input nel template del parent, ad esempio
    //   alias: 'courses-alias',
    //   in questo modo il nome della input da valorizzare non sarà più courses ma courses-alias [course-alias]="valore da passare"
    //   altra property è trasform, che ci permette di lavorare sull'input che passiamo dal parent
  });

  constructor() {}
}
