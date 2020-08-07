import {Store, StoreConfig} from '@datorama/akita';
import {Injectable} from '@angular/core';
import {UserTransfer} from '../model/UserTransfer';

export interface TransfersState {
  transfers: {
    [key: string]: UserTransfer
  };
}

export function createInitialState(): TransfersState {
  return {
    transfers: {}
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'transfers' })
export class TransfersStore extends Store<TransfersState> {
  constructor() {
    super(createInitialState());
  }
}
