import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Skill {
  name: string;
  icon: string;
  color: string;
  percentage: number;
}
@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  skills = [
    { name: 'Angular', image: './assets/angular_logo.png' },
    { name: 'JavaScript', image: 'assets/js_logo.png' },
    { name: 'Node Js', image: 'assets/nodejs_logo.jpeg' },
    { name: 'Java', image: 'assets/java_logo.png' },
    { name: 'GCP', image: 'assets/GCP_logo.png' },
    { name: 'AWS', image: 'assets/aws_logo.jpeg' },
    { name: 'CI/CD', image: './assets/cicd_logo.jpeg' },
    { name: 'NestJS', image: 'assets/nestjs_logo.png' },
    { name: 'SQL', image: 'assets/sql_logo.jpeg' },
    
    
  ];
}
