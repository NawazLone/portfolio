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
  skills: Skill[] = [
    { name: 'Angular', icon: 'code', color: '#dd0031', percentage: 95 },
    { name: 'JavaScript', icon: 'javascript', color: '#f7df1e', percentage: 95 },
    { name: 'Java', icon: 'coffee', color: '#f89820', percentage: 90 },
    { name: 'Python', icon: 'python', color: '#3776ab', percentage: 85 },
    { name: 'Kubernetes', icon: 'settings', color: '#326ce5', percentage: 90 },
    { name: 'AWS', icon: 'cloud', color: '#ff9900', percentage: 95 },
    { name: 'Google Cloud', icon: 'cloud_queue', color: '#4285f4', percentage: 90 },
    { name: 'Spring Boot', icon: 'spring', color: '#6db33f', percentage: 85 },
    { name: 'Node.js', icon: 'node', color: '#68a063', percentage: 85 },
    { name: 'Docker', icon: 'docker', color: '#2496ed', percentage: 80 },
    { name: 'Microservices', icon: 'architecture', color: '#ff6b6b', percentage: 85 },
    { name: 'System Design', icon: 'design_services', color: '#4ecdc4', percentage: 90 }
  ];
  showTooltip: boolean = false;
  hoveredSkill: Skill | null = null;

  onMouseEnter(skill: Skill): void {
    this.showTooltip = true;
    this.hoveredSkill = skill;
  }

  onMouseLeave(): void {
    this.showTooltip = false;
    this.hoveredSkill = null;
  }
}
