import { OverlayRef } from '@angular/cdk/overlay';

export class ToastRef {
  constructor(private readonly overlay: OverlayRef) {}

  public close(): void {
    this.overlay.dispose();
  }
}
