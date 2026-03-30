import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appFallbackImage]',
  standalone: true
})
export class FallbackImageDirective {
  @Input() appFallbackImage: string = '';
  private hasError = false;

  constructor(private el: ElementRef<HTMLImageElement>) {}

  @HostListener('error')
  onError() {
    if (!this.hasError) {
      this.hasError = true;
      const element = this.el.nativeElement;
      
      if (this.appFallbackImage) {
        element.src = this.appFallbackImage;
      } else {
        // Créer une image SVG placeholder
        element.src = this.getPlaceholderDataUrl();
      }
    }
  }

  private getPlaceholderDataUrl(): string {
    const svg = `
      <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="400" fill="#f0f0f0"/>
        <text x="50%" y="50%" 
              font-family="Arial, sans-serif" 
              font-size="24" 
              fill="#999" 
              text-anchor="middle" 
              dominant-baseline="middle">
          Pas d'image
        </text>
      </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }
}