import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {onlyNumberValidator} from '../validators/onlyNumberValidator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TransferService} from '../store/transfers.service';
import {TransfersQuery} from '../store/transfers.query';
import {ActivatedRoute} from '@angular/router';
import {first} from 'rxjs/operators';
import {UserTransfer} from '../model/UserTransfer';

@Component({
  selector: 'app-card2card',
  templateUrl: './card2card.component.html',
  styleUrls: ['./card2card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideUpDown', [
      state('*', style({transform: 'translateY(0)', opacity: 1})),
      state('void', style({transform: 'translateY(-20%)', opacity: 0})),
      transition('void <=> *', animate('300ms 200ms ease')),
    ])
  ]
})
export class Card2cardComponent implements OnInit {
  @ViewChild('formDirective') formDirective: ElementRef<HTMLFormElement>;

  card2cardForm = this.fb.group({
    senderCardNumber: this.fb.group({
      senderNum1: [null, [Validators.required, Validators.minLength(4)]],
      senderNum2: [null, [Validators.required, Validators.minLength(4)]],
      senderNum3: [null, [Validators.required, Validators.minLength(4)]],
      senderNum4: [null, [Validators.required, Validators.minLength(4)]]
    }),
    cardHolder: [null, [Validators.required]],
    validMonth: [null, [Validators.required]],
    validYear: [null, [Validators.required]],
    receiverCardNumber: this.fb.group({
      receiverNum1: [null, [Validators.required, Validators.minLength(4)]],
      receiverNum2: [null, [Validators.required, Validators.minLength(4)]],
      receiverNum3: [null, [Validators.required, Validators.minLength(4)]],
      receiverNum4: [null, [Validators.required, Validators.minLength(4)]]
    }),
    total: [null, [Validators.required]]
  });

  isSmallScreen: boolean;

  constructor(private breakpointObserver: BreakpointObserver, private cd: ChangeDetectorRef, private fb: FormBuilder,
              private snackBar: MatSnackBar, private transferService: TransferService, private transfersQuery: TransfersQuery,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.breakpointObserver.observe('(max-width: 704px)').subscribe(val => {
      this.isSmallScreen = val.matches;
      this.cd.markForCheck();
    });

    this.route.queryParamMap.subscribe(param => {
      if (param.get('id')) {
        this.transfersQuery.userTransfers$.pipe(first()).subscribe(transfers => {
          const historyTransfer: UserTransfer = transfers[param.get('id')];
          if (historyTransfer) {
            this.card2cardForm.get('total').setValue(historyTransfer.total);
            this.card2cardForm.get('validYear').setValue(historyTransfer.validYear);
            this.card2cardForm.get('validMonth').setValue(historyTransfer.validMonth);
            this.card2cardForm.get('cardHolder').setValue(historyTransfer.cardHolder);
            this.card2cardForm.get('receiverCardNumber.receiverNum1').setValue(historyTransfer.cardReceiver[0]);
            this.card2cardForm.get('receiverCardNumber.receiverNum2').setValue(historyTransfer.cardReceiver[1]);
            this.card2cardForm.get('receiverCardNumber.receiverNum3').setValue(historyTransfer.cardReceiver[2]);
            this.card2cardForm.get('receiverCardNumber.receiverNum4').setValue(historyTransfer.cardReceiver[3]);
            this.card2cardForm.get('senderCardNumber.senderNum1').setValue(historyTransfer.cardSender[0]);
            this.card2cardForm.get('senderCardNumber.senderNum2').setValue(historyTransfer.cardSender[1]);
            this.card2cardForm.get('senderCardNumber.senderNum3').setValue(historyTransfer.cardSender[2]);
            this.card2cardForm.get('senderCardNumber.senderNum4').setValue(historyTransfer.cardSender[3]);
          }
        });
      }
    });
  }

  onSubmit(e: Event): void {
    this.card2cardForm.updateValueAndValidity();
    console.log(this.card2cardForm.value);
    if (this.card2cardForm.invalid) {
      e.preventDefault();
      e.stopPropagation();
      this.snackBar.open('Заполните обязательные поля', '', {
        duration: 2000,
      });
    } else {
      this.saveTransfer();
      this.formDirective.nativeElement.reset();
      this.snackBar.open('Отправлено!', '', {
        duration: 2000,
      });
    }
  }

  cardNumInput(e: KeyboardEvent): void {
    if (isNaN(e.key as any)) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  cardHolderKeypress(e: KeyboardEvent): void {
    if (!/[a-zA-Z]/.test(e.key) && e.key !== '.' && e.key !== ' ') {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  private saveTransfer(): void {
    const receiverCardNumber = [
      this.card2cardForm.get('receiverCardNumber.receiverNum1').value,
      this.card2cardForm.get('receiverCardNumber.receiverNum2').value,
      this.card2cardForm.get('receiverCardNumber.receiverNum3').value,
      this.card2cardForm.get('receiverCardNumber.receiverNum4').value
    ];

    const senderCardNumber = [
      this.card2cardForm.get('senderCardNumber.senderNum1').value,
      this.card2cardForm.get('senderCardNumber.senderNum2').value,
      this.card2cardForm.get('senderCardNumber.senderNum3').value,
      this.card2cardForm.get('senderCardNumber.senderNum4').value
    ];

    this.transferService.save({
      cardReceiver: receiverCardNumber,
      cardReceiverView: receiverCardNumber.map((val, index) => index === 1 || index === 2 ? '****' : val).join(' '),
      cardSender: senderCardNumber,
      cardSenderView: senderCardNumber.map((val, index) => index === 1 || index === 2 ? '****' : val).join(' '),
      total: this.card2cardForm.get('total').value,
      validYear: this.card2cardForm.get('validYear').value,
      validMonth: this.card2cardForm.get('validMonth').value,
      cardHolder: this.card2cardForm.get('cardHolder').value
    });
  }
}
