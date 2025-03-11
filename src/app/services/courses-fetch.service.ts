import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesServiceWithFetch {
  // IN QUESTO SERVICE VERRANNO EFFETTUATE LE HTTP REQUEST CON IL FETCH() DI JS
  env = environment;

  // per definire cosa ritorna un metodo lo posso fare qui e dico che è una Promise che mi darà un array di Course
  // oppure potrei farlo nel return del metodo utilizzando un alias
  async loadAllCourses(): Promise<Course[]> {
    // per effettuare una chiamata http col fetch e ricevere una promise, quindi eseguire del codice asincrono, dobbiamo utilizzare la sintassi await all'interno di un metodo dichiarato async
    // quello che verrà restituito da codice await è una response, che salviamo in una const
    // await fa in modo che l'esecuzione del codice non vada avanti fino a che non viene eseguito il suo codice
    const response = await fetch(`${this.env.apiRoot}/courses`);

    // convertiamo la response restituita dal fetch da json a object js, lo facciamo tramite il metodo js per le Response .json()
    // anche questo ritorna una Promise e quindi anche in questo caso la salviamo in una const ed utilizziamo la sintassi await
    // Response.json() Note that despite the method being named json(), the result is not JSON but is instead the result of taking JSON as input and parsing it to produce a JavaScript object.
    // la response del server ci dà un oggetto contenente una proprietà courses con un array of course come valore
    const payload = await response.json();

    // potrei definire qui che ritorno payload.courses as Course[], tramite inference ts sa che queto metodo ritornerà una Promise (perchè è un metodo async) di un array di Course
    // return payload.courses as Course[];
    return payload.courses;

    // se il metodo non fosse contrassegnato come async dovrei ritornare esplicitamente un oggetto Promise e tramite metodo .resolve() wrappare quello che deve essere il contenuto della promise
    // la sintassi async indica che qualsiasi valore ritornato dal metodo vemga wrappato di default in una Promise
    // return Promise.resolve(payload.courses);
  }
}
