import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-card2card',
  templateUrl: './card2card.component.html',
  styleUrls: ['./card2card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Card2cardComponent implements OnInit {
  isSmallScreen: boolean;

  constructor(private breakpointObserver: BreakpointObserver, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.breakpointObserver.observe('(max-width: 704px)').subscribe(val => {
      this.isSmallScreen = val.matches;
      this.cd.markForCheck();
    });
  }

}
