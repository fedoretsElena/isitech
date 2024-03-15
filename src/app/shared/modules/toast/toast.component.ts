import { Component, OnDestroy, OnInit } from '@angular/core';

import { ToastData } from './toast.interface';
import { ToastRef } from './toast-ref';

@Component({
  selector: 'app-toast', 
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent implements OnInit, OnDestroy {
  private intervalId!: number;

  constructor(readonly data: ToastData, readonly ref: ToastRef) {}

  public ngOnInit(): void {
    this.intervalId = setTimeout(() => this.ref.close(), 1000);
  }

  public ngOnDestroy(): void {
    clearTimeout(this.intervalId);
  }
}
