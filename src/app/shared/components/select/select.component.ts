import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SelectOption } from './select.interface';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  @Input() public control!: any;
  @Input() public id?: string;
  @Input() public label?: string;
  @Input() public required = true;
  @Input() public options: SelectOption<string>[] = [];
}
