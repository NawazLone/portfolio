import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.css'
})
export class CertificationsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('certificationsSection', { static: false }) certificationsSection!: ElementRef;
  
  isVisible = false;
  isHoverEnabled = false;
  private observer?: IntersectionObserver;

  certifications = [
    {
      name: 'AWS Certified Developer Associate',
      provider: 'Amazon Web Services',
      date: 'Dec 2024',
      icon: 'cloud',
      color: '#ff9900',
      gradient: 'linear-gradient(135deg, #ff9900, #ff6600)',
      expires: 'Dec 2027'
    },
    {
      name: 'Google Cloud Certified Professional Cloud Architect',
      provider: 'Google',
      date: 'Feb 2022',
      icon: 'architecture',
      color: '#4285f4',
      gradient: 'linear-gradient(135deg, #4285f4, #34a853)',
      status: 'Expired Feb 2024'
    },
    {
      name: 'Google Cloud Certified Associate Cloud Engineer',
      provider: 'Google',
      date: '2022',
      icon: 'cloud_done',
      color: '#4285f4',
      gradient: 'linear-gradient(135deg, #4285f4, #34a853)'
    },
    {
      name: 'Advanced Certificate Program in Data Science',
      provider: 'IIIT Bangalore',
      date: 'Oct 2023',
      icon: 'analytics',
      color: '#9c27b0',
      gradient: 'linear-gradient(135deg, #9c27b0, #673ab7)',
      credentialId: 'iitb/0623/DC/4296'
    },
    {
      name: 'Preparing for Google Cloud Professional Cloud Architect Exam',
      provider: 'Coursera',
      date: 'Oct 2021',
      icon: 'school',
      color: '#0056d3',
      gradient: 'linear-gradient(135deg, #0056d3, #4285f4)',
      credentialId: 'HR4P7GHJCTUB'
    },
    {
      name: 'Algorithmic Toolbox',
      provider: 'Coursera',
      date: 'Sep 2021',
      icon: 'code',
      color: '#0056d3',
      gradient: 'linear-gradient(135deg, #0056d3, #4285f4)',
      credentialId: 'T2MKS89642PA'
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
    if (this.observer && typeof window !== 'undefined') {
      this.observer.disconnect();
    }
  }

  private setupScrollObserver() {
    if (!this.certificationsSection || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
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
            this.isHoverEnabled = true;
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    this.observer.observe(this.certificationsSection.nativeElement);
  }

  onSectionClick() {
    // Optional: Add click functionality if needed
  }
}
