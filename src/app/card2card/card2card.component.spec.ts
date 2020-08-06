import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Card2cardComponent } from './card2card.component';

describe('Card2cardComponent', () => {
  let component: Card2cardComponent;
  let fixture: ComponentFixture<Card2cardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Card2cardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Card2cardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
