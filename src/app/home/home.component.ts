import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('assembleCard', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('1.5s ease-in-out', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ]
})
export class HomeComponent {

}
