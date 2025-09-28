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

  // Track resume download in Google Analytics
  trackResumeDownload() {
    if (typeof window !== 'undefined' && (window as any).trackResumeDownload) {
      (window as any).trackResumeDownload();
    }
  }
}
