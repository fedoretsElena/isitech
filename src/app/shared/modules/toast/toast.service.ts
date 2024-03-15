import { Injectable, Injector } from '@angular/core';
import { GlobalPositionStrategy, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import { ToastComponent } from './toast.component';
import { ToastData } from './toast.interface';
import { ToastRef } from './toast-ref';

@Injectable()
export class ToastService {
  constructor(private overlay: Overlay, private parentInjector: Injector) {}

  public show(data: ToastData): ToastRef {
    const positionStrategy = this.getPositionStrategy();
    const overlayRef = this.overlay.create({ positionStrategy });
    const toastRef = new ToastRef(overlayRef);
    const injector = this.getInjector(data, toastRef, this.parentInjector);
    const toastPortal = new ComponentPortal(ToastComponent, null, injector);

    overlayRef.attach(toastPortal);

    return toastRef;
  }

  public getPositionStrategy(): GlobalPositionStrategy {
    return this.overlay.position().global().top('20px').right('20px');
  }

  public getInjector(
    data: ToastData,
    toastRef: ToastRef,
    parentInjector: Injector
  ) {
    const tokens = new WeakMap();

    tokens.set(ToastData, data);
    tokens.set(ToastRef, toastRef);

    return new PortalInjector(parentInjector, tokens);
  }
}
