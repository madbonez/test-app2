import {Query} from '@datorama/akita';
import {TransfersState, TransfersStore} from './transfers.store';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserTransfer} from '../model/UserTransfer';

@Injectable({
  providedIn: 'root'
})
export class TransfersQuery extends Query<TransfersState> {
  userTransfers$ = this.select('transfers');
  userTransfersArray$: Observable<UserTransfer[]> = this.select('transfers')
    .pipe(map(transfers => Object.keys(transfers).map(key => transfers[key])));

  constructor(protected store: TransfersStore) {
    super(store);
  }
}
