import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appCheckValidity]',
  standalone: true,
})
export class CheckValidityDirective implements OnInit, OnDestroy {
  @Input() public control!: any;

  private statusSubscription!: Subscription;
  private errorsDefinitions: { [rule: string]: string } = {
    required: 'Required field.',
    email: 'Not correct email.',
  };

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  public ngOnInit(): void {
    this.statusSubscription = this.control.statusChanges.subscribe(() => {
      const isInvalid = this.control.invalid;
      const inputField =
        this.el.nativeElement.querySelector('.form-field__input');
      const errorsContainer = this.el.nativeElement.querySelector(
        '.form-field__errors'
      );

      if (isInvalid) {
        this.renderer.addClass(inputField, 'form-field__input--invalid');
        const combinedErrors = this.getControlCombineErrors();
        errorsContainer.childNodes.forEach((node: any) => {
          this.renderer.removeChild(errorsContainer, node);
        });
        const text = this.renderer.createText(combinedErrors);
        this.renderer.appendChild(errorsContainer, text);
      } else {
        this.renderer.removeClass(inputField, 'form-field__input--invalid');
        errorsContainer.childNodes.forEach((node: any) => {
          this.renderer.removeChild(errorsContainer, node);
        });
      }
    });
  }

  public ngOnDestroy(): void {
    this.statusSubscription.unsubscribe();
  }

  private getControlCombineErrors(): string {
    return Object.entries(this.control.errors)
      .reduce(
        (acc: string[], [key, value]) => [
          ...acc,
          this.errorsDefinitions[key] || (value as string),
        ],
        []
      )
      .join(' ');
  }
}
