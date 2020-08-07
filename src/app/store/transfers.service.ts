import {Injectable} from '@angular/core';
import {UserTransfer} from '../model/UserTransfer';
import {generateGuid} from './generateGuid';
import {TransfersStore} from './transfers.store';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  constructor(private transfersStore: TransfersStore) {

  }

  save(transfer: UserTransfer): void {
    this.transfersStore.update(state => {
      return {
        ...state,
        transfers: {
          ...state.transfers,
          [generateGuid()]: transfer
        }
      };
    });
  }

  deleteById(id: string): void {
    this.transfersStore.update(state => {
      delete state.transfers[id];
      return {
        ...state
      };
    });
  }
}
