import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-card2card',
  templateUrl: './card2card.component.html',
  styleUrls: ['./card2card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideUpDown', [
      state('*', style({ transform: 'translateY(0)', opacity: 1 })),
      state('void', style({ transform: 'translateY(-20%)', opacity: 0 })),
      transition('void <=> *', animate('300ms 200ms ease')),
    ])
  ]
})
export class Card2cardComponent implements OnInit {
  isSmallScreen: boolean;

  @HostBinding('@slideUpDown') get value(): boolean {
    return true;
  }

  constructor(private breakpointObserver: BreakpointObserver, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.breakpointObserver.observe('(max-width: 704px)').subscribe(val => {
      this.isSmallScreen = val.matches;
      this.cd.markForCheck();
    });
  }

}
