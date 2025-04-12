import { Component, ElementRef, ViewChild } from '@angular/core';
import { AboutComponent } from '../components/about/about.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { EducationComponent } from '../components/education/education.component';
import { ExperienceComponent } from '../components/experience/experience.component';
import 'intersection-observer';
import { SkillsComponent } from '../components/skills/skills.component';
import { CertificationsComponent } from '../components/certifications/certifications.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AboutComponent, FontAwesomeModule, EducationComponent, ExperienceComponent, SkillsComponent, CertificationsComponent, HomeComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('about') about!: ElementRef;
  @ViewChild('home') home!: ElementRef;
  @ViewChild('education') education!: ElementRef;
  @ViewChild('experience') experience!: ElementRef;
  @ViewChild('skills') skills!: ElementRef;
  private sections: Record<string, ElementRef> = {}
  isVisible = false;
  constructor() { }
  title = 'portfolio-nawaz';
  faDownload = faDownload;
  ngAfterViewInit() {
    this.sections = {
      about: this.about,
      home: this.home,
      education: this.education,
      experience:this.experience,
      skills:this.skills
    }
  }

  scrollTo(section: string) {
    console.log(section)
    const element = this.sections[section]?.nativeElement;
    if (element) {
      const navbarHeight = document.querySelector('.navbar')?.clientHeight || 60; // Adjust if needed
      const elementPosition = element.getBoundingClientRect().top + window.scrollY - navbarHeight - 10; // -10 for slight buffer
  
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  onVisible() {
    this.isVisible = true;
  }

}
