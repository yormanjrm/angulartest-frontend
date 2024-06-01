import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnsubscriptionService {

  public unsubscription(suscription: Subscription){
    if(suscription){
      suscription.unsubscribe();
    }
  }

}
