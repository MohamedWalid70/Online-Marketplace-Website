import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loaded : BehaviorSubject<boolean>

  constructor() {
    this.loaded = new BehaviorSubject<boolean>(false);
  }

  setLoader(value : boolean){
    this.loaded.next(value);
  }

  getLoaderState(){
    return this.loaded.asObservable();
  }

}
