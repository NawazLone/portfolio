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
      year: "2018 - 2019",
      company: "Company A",
      role: "Junior Developer",
      description: "Worked on various web development projects, focusing on front-end technologies.",
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
