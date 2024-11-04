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
    { name: 'Angular', icon: 'logo_clark.png', color: '#dd0031', percentage: 100 },
    { name: 'Node.js', icon: 'jntu_logo.png', color: '#68a063', percentage: 70 },
    { name: 'Nest.js', icon: 'a.gs_logo.JPG', color: '#e0234e', percentage: 60 },
    // Add more skills as needed
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
