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
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [RouterOutlet, AboutComponent, EducationComponent, ExperienceComponent, CertificationsComponent, AwardsComponent, SkillsComponent, ProjectsComponent, ChatbotComponent, MatButtonModule, FontAwesomeModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit, AfterViewInit, OnDestroy {
  faDownload = faDownload;
  isMobileMenuOpen = false;
  isScrolled = false;
  private isBrowser: boolean;
  private scrollObserver!: IntersectionObserver;
  private tiltCards: HTMLElement[] = [];
  private tiltHandlers: Array<{ el: HTMLElement; fn: (e: MouseEvent) => void; leave: () => void }> = [];
  private scrollListener!: () => void;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    setTimeout(() => {
      this.initScrollAnimations();
      this.init3DTilt();
    }, 200);

    this.scrollListener = () => {
      this.isScrolled = window.scrollY > 60;
    };
    window.addEventListener('scroll', this.scrollListener, { passive: true });
  }

  ngOnDestroy(): void {
    if (this.scrollObserver) this.scrollObserver.disconnect();
    this.tiltHandlers.forEach(({ el, fn, leave }) => {
      el.removeEventListener('mousemove', fn as EventListener);
      el.removeEventListener('mouseleave', leave);
    });
    if (this.scrollListener) window.removeEventListener('scroll', this.scrollListener);
  }

  private initScrollAnimations(): void {
    const sections = document.querySelectorAll<HTMLElement>(
      '.about-me-section, .expr, .certifications-section, .awards-section, #skills, #projects, #education, .contact-section'
    );

    sections.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'perspective(1200px) rotateX(6deg) translateY(60px)';
      el.style.transition = 'opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 0.9s cubic-bezier(0.4,0,0.2,1)';
    });

    this.scrollObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'perspective(1200px) rotateX(0deg) translateY(0)';
            this.scrollObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    sections.forEach(el => this.scrollObserver.observe(el));
  }

  private init3DTilt(): void {
    const cards = document.querySelectorAll<HTMLElement>(
      '.stat-item, .about-text-card, .cert-card, .skill-card, .project-card, .timeline-content, .education-card'
    );

    cards.forEach(card => {
      card.style.transition = 'transform 0.15s ease-out, box-shadow 0.15s ease-out';

      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        const rx = -dy * 12;
        const ry = dx * 12;
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px) scale(1.02)`;
        card.style.boxShadow = `${-ry * 2}px ${rx * 2}px 40px rgba(0,0,0,0.25)`;
      };

      const onLeave = () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
        card.style.boxShadow = '';
      };

      card.addEventListener('mousemove', onMove as EventListener);
      card.addEventListener('mouseleave', onLeave);
      this.tiltHandlers.push({ el: card, fn: onMove as (e: MouseEvent) => void, leave: onLeave });
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
