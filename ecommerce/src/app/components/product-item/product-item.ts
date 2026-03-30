import { Component, Input } from '@angular/core';
import { Product } from '../../models/product/product.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FallbackImageDirective } from '../../directives/fallbackimage';

@Component({
  selector: 'app-product-item',
  imports: [CommonModule,RouterModule,FallbackImageDirective],
  templateUrl: './product-item.html',
  styleUrls: ['./product-item.css'],
})
export class ProductItem {
  @Input()
  product! : Product;

  @Input()
  catId! : number;

  defaultImage = `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" fill="#f0f0f0"/>
      <g transform="translate(200, 200)">
        <circle cx="0" cy="-20" r="30" fill="#ccc"/>
        <circle cx="-15" cy="-25" r="5" fill="#999"/>
        <circle cx="15" cy="-25" r="5" fill="#999"/>
        <path d="M -20,-10 Q 0,0 20,-10" stroke="#999" stroke-width="3" fill="none"/>
        <rect x="-40" y="20" width="80" height="60" fill="#ccc" rx="5"/>
      </g>
      <text x="200" y="350" 
            font-family="Arial, sans-serif" 
            font-size="18" 
            fill="#999" 
            text-anchor="middle">
        Pas d'image
      </text>
    </svg>
  `)}`;
  constructor(){}

}
