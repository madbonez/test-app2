import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {BreakpointObserver} from '@angular/cdk/layout';

const ELEMENT_DATA: any[] = [
  {cardSender: '1234123412341234', cardReceiver: '1234123412341234', total: 5000, date: 'date'},
  {cardSender: '1234123412341234', cardReceiver: '1234123412341234', total: 5000, date: 'date'},
  {cardSender: '1234123412341234', cardReceiver: '1234123412341234', total: 5000, date: 'date'},
  {cardSender: '1234123412341234', cardReceiver: '1234123412341234', total: 5000, date: 'date'},
  {cardSender: '1234123412341234', cardReceiver: '1234123412341234', total: 5000, date: 'date'},
  {cardSender: '1234123412341234', cardReceiver: '1234123412341234', total: 5000, date: 'date'},
  {cardSender: '1234123412341234', cardReceiver: '1234123412341234', total: 5000, date: 'date'},
  {cardSender: '1234123412341234', cardReceiver: '1234123412341234', total: 5000, date: 'date'},
  {cardSender: '1234123412341234', cardReceiver: '1234123412341234', total: 5000, date: 'date'}
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
  private isSmallScreen: boolean;

  constructor(private breakpointObserver: BreakpointObserver, private cd: ChangeDetectorRef) { }

  @HostBinding('@slideUpDown') get value(): boolean {
    return true;
  }

  ngOnInit(): void {
    this.breakpointObserver.observe('(max-width: 704px)').subscribe(val => {
      this.isSmallScreen = val.matches;
      if (this.isSmallScreen) {
        this.displayedColumns = ['total', 'date', 'action'];
      } else {
        this.displayedColumns =  ['index', 'cardSender', 'cardReceiver', 'total', 'date', 'action'];
      }
      this.cd.markForCheck();
    });
  }

}
