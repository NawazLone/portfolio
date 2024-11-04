import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  typewriterText: string = "Salam";
  displayedText: string = "";
  private currentIndex: number = 0;


  constructor() { }

  ngOnInit(): void {
  
  }



}
