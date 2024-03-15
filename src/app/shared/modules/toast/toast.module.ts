import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';

@NgModule({
  declarations: [ToastComponent],
  exports: [ToastComponent],
  providers: [ToastService],
  imports: [CommonModule],
})
export class ToastModule {}
