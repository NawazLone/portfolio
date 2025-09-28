import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-education',
  standalone: true,
  templateUrl: './education.component.html',
  styleUrl: './education.component.css',
  imports:[CommonModule]
})
export class EducationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('educationSection', { static: false }) educationSection!: ElementRef;
  
  isVisible = false;
  isHoverEnabled = false;
  private observer?: IntersectionObserver;

  educationEntries = [
    {
      icon: 'school',
      institution: 'Clark University',
      description: 'Master of Science in Information Technology (GPA: 4.0), Alpha Epsilon Lambda Honor Society Member, Exceptional Academic Award Recipient',
      dateRange: '2023 - 2025',
      level: 'masters',
      badge: '🏆',
      logo: 'assets/logo_clark.png'
    },
    {
      icon: 'local_library',
      institution: 'JNTU Hyderabad',
      description: 'Bachelor of Technology in Computer Science and Engineering, specializing in Software Development and Data Structures.',
      dateRange: '2016 - 2020',
      level: 'bachelors',
      badge: '🎓',
      logo: 'assets/jntu_logo.png'
    }
  ];


  ngOnInit() {
    // Initialize component
  }

  ngAfterViewInit() {
    // Add a small delay to ensure ViewChild is available
    setTimeout(() => {
      this.setupScrollObserver();
    }, 100);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupScrollObserver() {
    // Check if we're in the browser environment
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      // Fallback for SSR or older browsers - enable after a delay
      setTimeout(() => {
        this.isVisible = true;
        this.isHoverEnabled = true;
      }, 500);
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isVisible = true;
            // Enable hover effects immediately
            this.isHoverEnabled = true;
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '0px 0px -20px 0px'
      }
    );

    if (this.educationSection && this.educationSection.nativeElement) {
      this.observer.observe(this.educationSection.nativeElement);
    } else {
      // Fallback if ViewChild is not available - enable after delay
      setTimeout(() => {
        this.isVisible = true;
        this.isHoverEnabled = true;
      }, 800);
    }
  }

  onSectionClick() {
    this.isVisible = true;
    this.isHoverEnabled = true;
  }
}
