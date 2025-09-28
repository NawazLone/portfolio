import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-awards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent implements OnInit, OnDestroy {
  @ViewChild('awardsSection') awardsSection!: ElementRef;
  
  isVisible = false;
  isHoverEnabled = false;
  private observer?: IntersectionObserver;

  awards = [
    {
      title: 'MTX Going Above and Beyond',
      organization: 'MTX IT Consultancy Services',
      year: '2021-2022',
      description: 'Awarded for exceptional performance and dedication during my tenure as Full Stack Consultant',
      category: 'Professional Excellence',
      icon: 'star',
      color: '#ff6b35',
      gradient: 'linear-gradient(135deg, #ff6b35, #f7931e)',
      significance: 'Recognized for outstanding contribution to COVID vaccination platform projects'
    },
    {
      title: 'Alpha Epsilon Lambda Honor Society',
      organization: 'Clark University',
      year: '2024-2025',
      description: 'Inducted for outstanding scholarship, character, and leadership during MSIT program',
      category: 'Academic Excellence',
      icon: 'school',
      color: '#4285f4',
      gradient: 'linear-gradient(135deg, #4285f4, #34a853)',
      significance: 'Top 20% of graduate students demonstrating exceptional academic performance'
    },
    {
      title: 'Exceptional Academic Award',
      organization: 'Clark University',
      year: '2024-2025',
      description: 'Outstanding performance Award for MSIT program (Batch Topper)',
      category: 'Academic Achievement',
      icon: 'emoji_events',
      color: '#9c27b0',
      gradient: 'linear-gradient(135deg, #9c27b0, #673ab7)',
      significance: 'Achieved 4.0 CGPA and recognized as top performer in the program'
    },
    {
      title: 'Prime Minister\'s Special Scholarship Scheme',
      organization: 'Government of India',
      year: '2016-2020',
      description: 'Fully funded scholarship for bachelor\'s education in top Indian universities',
      category: 'Merit Scholarship',
      icon: 'account_balance',
      color: '#ff9800',
      gradient: 'linear-gradient(135deg, #ff9800, #f57c00)',
      significance: 'Prestigious national scholarship awarded to top 1% of students nationwide'
    }
  ];

  ngOnInit() {
    this.setupScrollObserver();
  }

  ngOnDestroy() {
    if (this.observer && typeof window !== 'undefined') {
      this.observer.disconnect();
    }
  }

  private setupScrollObserver() {
    if (!this.awardsSection || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      // Fallback for SSR or browsers without IntersectionObserver
      this.isVisible = true;
      this.isHoverEnabled = true;
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isVisible = true;
            setTimeout(() => {
              this.isHoverEnabled = true;
            }, 500);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    this.observer.observe(this.awardsSection.nativeElement);
  }

  onSectionClick() {
    // Optional: Handle section click if needed
  }
}
