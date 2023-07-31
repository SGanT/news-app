import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import {filter, map} from 'rxjs/operators';

/**
 * Pretty simple substitution for NgRx library, that is meant to prevent components from injecting services directly
 */
@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private subject$ = new Subject<IEventData<any>>();

  constructor() { }

  public emit(event: IEventData<any>) {
    this.subject$.next(event);
    console.log('Event emitted: ', event);
  }

  public on(type: string, action: any): Subscription {
    return this.subject$
      .pipe(
        filter((e: IEventData<any>) => e.type === type),
        map((e: IEventData<any>) => e.value))
      .subscribe(action);
  }
}

export interface IEventData<T> {
  type: string;
  value: T;
}

export class EventData implements IEventData<any> {
  public type: string;
  public value: any;

  constructor(type: string, value: any) {
    this.type = type;
    this.value = value;
  }
}
