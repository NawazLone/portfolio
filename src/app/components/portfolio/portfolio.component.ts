import { Component, OnInit, OnDestroy, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AboutComponent } from '../../../components/about/about.component';
import { EducationComponent } from '../../../components/education/education.component';
import { ExperienceComponent } from '../../../components/experience/experience.component';
import { CertificationsComponent } from '../../../components/certifications/certifications.component';
import { AwardsComponent } from '../../../components/awards/awards.component';
import { SkillsComponent } from '../../../components/skills/skills.component';
import { ProjectsComponent } from '../../../components/projects/projects.component';
import { ChatbotComponent } from '../../../components/chatbot/chatbot.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    AboutComponent,
    EducationComponent,
    ExperienceComponent,
    CertificationsComponent,
    AwardsComponent,
    SkillsComponent,
    ProjectsComponent,
    ChatbotComponent
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit, AfterViewInit, OnDestroy {
  isMobileMenuOpen = false;
  isScrolled = false;
  private isBrowser: boolean;
  private scrollObserver!: IntersectionObserver;
  private tiltHandlers: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];
  private scrollListener!: () => void;

  navItems = [
    { id: 'about', label: 'Home' },
    { id: 'about-section', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'awards', label: 'Awards' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    setTimeout(() => {
      this.initScrollAnimations();
      this.init3DTilt();
    }, 100);

    this.scrollListener = () => {
      this.isScrolled = window.scrollY > 40;
    };
    window.addEventListener('scroll', this.scrollListener, { passive: true });
  }

  ngOnDestroy(): void {
    if (this.scrollObserver) this.scrollObserver.disconnect();
    this.tiltHandlers.forEach(({ el, move, leave }) => {
      el.removeEventListener('mousemove', move as EventListener);
      el.removeEventListener('mouseleave', leave);
    });
    if (this.scrollListener) window.removeEventListener('scroll', this.scrollListener);
  }

  private initScrollAnimations(): void {
    const sections = document.querySelectorAll<HTMLElement>('.animate-section');

    this.scrollObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
            this.scrollObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    sections.forEach(el => this.scrollObserver.observe(el));
  }

  private init3DTilt(): void {
    const cards = document.querySelectorAll<HTMLElement>('.tilt-card');

    cards.forEach(card => {
      const move = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 50px rgba(99, 102, 241, 0.15)`;
      };

      const leave = () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        card.style.boxShadow = '';
      };

      card.addEventListener('mousemove', move as EventListener);
      card.addEventListener('mouseleave', leave);
      this.tiltHandlers.push({ el: card, move: move as (e: MouseEvent) => void, leave });
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  onNavClick(event: Event, targetId: string) {
    event.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (typeof window !== 'undefined' && (window as any).trackSectionVisit) {
        (window as any).trackSectionVisit(targetId);
      }
    }
    this.closeMobileMenu();
  }
}
