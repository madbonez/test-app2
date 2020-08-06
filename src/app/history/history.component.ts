import {ChangeDetectionStrategy, Component, HostBinding, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

const ELEMENT_DATA: any[] = [
  {index: 1, cardSender: '1234123412341234', cardReceiver: '1234123412341234', total: 5000, date: 'date'},
  {index: 1, cardSender: '1234123412341234', cardReceiver: '1234123412341234', total: 5000, date: 'date'},
  {index: 1, cardSender: '1234123412341234', cardReceiver: '1234123412341234', total: 5000, date: 'date'},
  {index: 1, cardSender: '1234123412341234', cardReceiver: '1234123412341234', total: 5000, date: 'date'},
  {index: 1, cardSender: '1234123412341234', cardReceiver: '1234123412341234', total: 5000, date: 'date'},
  {index: 1, cardSender: '1234123412341234', cardReceiver: '1234123412341234', total: 5000, date: 'date'},
  {index: 1, cardSender: '1234123412341234', cardReceiver: '1234123412341234', total: 5000, date: 'date'},
  {index: 1, cardSender: '1234123412341234', cardReceiver: '1234123412341234', total: 5000, date: 'date'},
  {index: 1, cardSender: '1234123412341234', cardReceiver: '1234123412341234', total: 5000, date: 'date'}
];

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideUpDown', [
      state('*', style({ transform: 'translateY(0)', opacity: 1 })),
      state('void', style({ transform: 'translateY(-20%)', opacity: 0 })),
      transition('void <=> *', animate('300ms 200ms ease')),
    ])
  ]
})
export class HistoryComponent implements OnInit {
  displayedColumns: string[] = ['index', 'cardSender', 'cardReceiver', 'total', 'date', 'action'];
  dataSource = ELEMENT_DATA;


  constructor() { }

  @HostBinding('@slideUpDown') get value(): boolean {
    return true;
  }

  ngOnInit(): void {
  }

}
