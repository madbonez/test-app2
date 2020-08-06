import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HistoryComponent} from './history/history.component';
import {TransferComponent} from './transfer/transfer.component';
import {Card2cardComponent} from './card2card/card2card.component';


const routes: Routes = [
  {
    path: 'card2card',
    component: Card2cardComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: '**',
    redirectTo: 'card2card'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
