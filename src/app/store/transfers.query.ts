import {Query} from '@datorama/akita';
import {TransfersState, TransfersStore} from './transfers.store';

export class TransfersQuery extends Query<TransfersState> {
  userTransfers$ = this.select('transfers');

  constructor(protected store: TransfersStore) {
    super(store);
  }
}
