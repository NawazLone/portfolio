import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('experienceSection', { static: false }) experienceSection!: ElementRef;
  
  isVisible = false;
  isHoverEnabled = false;
  private observer?: IntersectionObserver;

  experiences = [
    {
      year: "Jun 2025 - Present",
      company: "mavQ",
      role: "Software Developer",
      description: "Led onshore development for Georgia Department of Early Care and Learning's core subscription platform. Reduced API calls from 800K to 170K per hour, monitored cloud infrastructure across AWS and GCP, and managed containerized deployments to GCP Kubernetes.",
      icon: "work"
    },
    {
      year: "Feb 2025 - Apr 2025",
      company: "mavQ",
      role: "Software Development Engineer Intern",
      description: "Developed full-stack applications for child support, child welfare, and adult welfare services supporting a $12M revenue project for Oklahoma Human Services. Built and optimized front-end interfaces and backend APIs.",
      icon: "school"
    },
    {
      year: "Jun 2022 - Dec 2023",
      company: "mavQ",
      role: "Software Development Engineer",
      description: "Developed Customer Experience Cloud (CXC), an omnichannel case management system using Angular, Spring Boot, and AWS Connect, leading to 3x company growth. Led Miami Airport's call center project with AI-driven call management.",
      icon: "code"
    },
    {
      year: "Aug 2020 - Oct 2022",
      company: "MTX Group",
      role: "Full Stack Consultant",
      description: "Engineered COVID vaccination platforms for Arizona and New York, enabling appointment scheduling and inventory management. Led Oklahoma's contact tracing system and earned Google's Excellence in Cloud Solutions Award.",
      icon: "business"
    }
  ];
  public animate: boolean = false;

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
    // Check if we're in the browser environment
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      // Fallback for SSR or older browsers - enable after a delay
      setTimeout(() => {
        this.isVisible = true;
        this.isHoverEnabled = true;
        this.animate = true;
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
            this.animate = true;
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '0px 0px -20px 0px'
      }
    );

    if (this.experienceSection && this.experienceSection.nativeElement) {
      this.observer.observe(this.experienceSection.nativeElement);
    } else {
      // Fallback if ViewChild is not available - enable after delay
      setTimeout(() => {
        this.isVisible = true;
        this.isHoverEnabled = true;
        this.animate = true;
      }, 800);
    }
  }

  onSectionClick() {
    this.isVisible = true;
    this.isHoverEnabled = true;
    this.animate = true;
  }
  

}
