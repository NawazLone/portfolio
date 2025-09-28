import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutComponent } from '../../../components/about/about.component';
import { EducationComponent } from '../../../components/education/education.component';
import { ExperienceComponent } from '../../../components/experience/experience.component';
import { CertificationsComponent } from '../../../components/certifications/certifications.component';
import { AwardsComponent } from '../../../components/awards/awards.component';
import { SkillsComponent } from '../../../components/skills/skills.component';
import { ProjectsComponent } from '../../../components/projects/projects.component';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [RouterOutlet, AboutComponent, EducationComponent, ExperienceComponent, CertificationsComponent, AwardsComponent, SkillsComponent, ProjectsComponent, MatButtonModule, FontAwesomeModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  faDownload = faDownload;
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    console.log('Hamburger clicked, current state:', this.isMobileMenuOpen);
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    console.log('New state:', this.isMobileMenuOpen);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  // Navigation click handler
  onNavClick(event: Event, targetId: string) {
    event.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Track section visit in Google Analytics
      if (typeof window !== 'undefined' && (window as any).trackSectionVisit) {
        (window as any).trackSectionVisit(targetId);
      }
    }
    this.closeMobileMenu();
  }
}
