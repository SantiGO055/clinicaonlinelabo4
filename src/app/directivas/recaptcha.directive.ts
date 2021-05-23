import { Directive, ElementRef, Input } from '@angular/core';
export interface ReCaptchaConfig {
  theme? : 'dark' | 'light';
  type? : 'audio' | 'image';
  size? : 'compact' | 'normal';
  tabindex? : number;
}
declare const grecaptcha : any;

declare global {
  interface Window {
    grecaptcha : any;
    reCaptchaLoad : () => void
  }
}

@Directive({
  selector: '[appRecaptcha]'
})
export class RecaptchaDirective {
  @Input() key : string;
  @Input() config : ReCaptchaConfig = {};
  @Input() lang : string;
  constructor( private element : ElementRef ) {}
  // private onChange : ( value : string ) => void;
  // private onTouched : ( value : string ) => void;

  // ngOnInit() {
  //   this.registerReCaptchaCallback();
  //   this.addScript();
  // }
  // registerReCaptchaCallback() {
  //   window.reCaptchaLoad = () => {
  //     const config = {
  //       ...this.config,
  //       'sitekey': this.key,
  //       'callback': this.onSuccess.bind(this),
  //       'expired-callback': this.onExpired.bind(this)
  //     };
  //     this.widgetId = this.render(this.element.nativeElement, config);
  //   };
  // }
  // writeValue( obj : any ) : void {
  // }

  // registerOnChange( fn : any ) : void {
  //   this.onChange = fn;
  // }

  // registerOnTouched( fn : any ) : void {
  //   this.onTouched = fn;
  // }

  // private render( element : HTMLElement, config ) : number {
  //   return grecaptcha.render(element, config);
  // }

  // addScript() {
  //   let script = document.createElement('script');
  //   const lang = this.lang ? '&hl=' + this.lang : '';
  //   script.src = `https://www.google.com/recaptcha/api.js?onload=reCaptchaLoad&render=explicit${lang}`;
  //   script.async = true;
  //   script.defer = true;
  //   document.body.appendChild(script);
  // }

}
