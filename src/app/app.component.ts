import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutComponent } from '../components/about/about.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { EducationComponent } from '../components/education/education.component';
import { ExperienceComponent } from '../components/experience/experience.component';
import 'intersection-observer';
import { SkillsComponent } from '../components/skills/skills.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AboutComponent,MatButtonModule,FontAwesomeModule,EducationComponent,ExperienceComponent,SkillsComponent],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  constructor() {}
  title = 'portfolio-nawaz';
  faDownload = faDownload;
  ngAfterViewInit() {
    
  }
  
}
