export class ToastData {
  text!: string;
  type!: ToastType;
}

export enum ToastType {
  Fail = 'fail',
  Success = 'success'
};
