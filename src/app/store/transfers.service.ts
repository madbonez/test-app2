import {Injectable} from '@angular/core';
import {UserTransfer} from '../model/UserTransfer';
import {generateGuid} from './utils/generateGuid';
import {TransfersStore} from './transfers.store';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private transfersStore: TransfersStore) {

  }

  save(transfer: UserTransfer): void {
    transfer.date = new Date();
    transfer.id = generateGuid();

    this.transfersStore.update(state => {
      return {
        ...state,
        transfers: {
          ...state.transfers,
          [transfer.id]: transfer
        }
      };
    });
  }

  deleteById(id: string): void {
    this.transfersStore.update(state => {
      delete state.transfers[id];
      return {
        ...state,
        transfers: {
          ...state.transfers
        }
      };
    });
  }
}
