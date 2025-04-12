import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  experiences = [
    {
      year: "January 2025-Present ",
      company: "Maverick Quantum Private Limited",
      role: "Software Development Engineer Intern",
      location:'Albany, USA	',
      description: `• &nbsp Develop full-stack applications for child support services, child welfare services, and adult welfare services, supporting a $12M revenue project for Oklahoma Human Services.<br>
• &nbspBuild and optimize front-end interfaces and backend APIs to improve system performance, user experience, and data processing.<br>
• &nbspCollaborate with cross-functional teams using agile methodologies to deliver scalable and secure solutions.
`,
      imageUrl: "assets/logo_clark.png"
    },
    {
      year: "2019 - 2020",
      company: "Company B",
      role: "Developer",
      description: "Developed and maintained complex backend systems using Java and Spring Boot.",
      imageUrl: "assets/logo_clark.png"
    },
    {
      year: "2020 - 2021",
      company: "Company C",
      role: "Senior Developer",
      description: "Led a team of developers in creating mobile applications using Flutter and Dart.",
      imageUrl: "assets/logo_clark.png"
    },
    {
      year: "2021 - Present",
      company: "Company D",
      role: "Team Lead",
      description: "Managed projects and coordinated between teams to ensure timely delivery of software products.",
      imageUrl: "assets/logo_clark.png"
    }
  ];
  public animate: boolean = false;

  ngOnInit() {
    // Enable animations
    this.animate = true;
  }

  ngOnDestroy() {
    // Disable animations
    this.animate = false;
  }


}
