export interface UserTransfer {
  id?: string;
  date?: Date;
  total: number;
  cardHolder: string;
  validYear: string;
  validMonth: string;
  cardReceiver: number[];
  cardReceiverView: string;
  cardSender: number[];
  cardSenderView: string;
}
