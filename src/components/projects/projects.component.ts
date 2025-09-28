import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution built with Angular, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, and payment integration.',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe API', 'JWT'],
      imageUrl: 'assets/store-commerce-and-shopping-svgrepo-com.svg',
      featured: true
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      technologies: ['Angular', 'Socket.io', 'Express.js', 'PostgreSQL'],
      imageUrl: 'assets/task-svgrepo-com.svg',
      featured: true
    },
    {
      title: 'Weather Dashboard',
      description: 'A responsive weather dashboard that displays current weather conditions and forecasts using multiple weather APIs.',
      technologies: ['React', 'TypeScript', 'Chart.js', 'OpenWeather API'],
      imageUrl: 'assets/a.gs_logo.JPG',
      featured: false
    },
    {
      title: 'Portfolio Website',
      description: 'This responsive portfolio website built with Angular 17, featuring modern design, animations, and mobile-first approach.',
      technologies: ['Angular', 'TypeScript', 'Angular Material', 'CSS3'],
      imageUrl: 'assets/account-avatar.svg',
      featured: true
    },
    {
      title: 'REST API Service',
      description: 'A scalable REST API built with Node.js and Express, featuring authentication, data validation, and comprehensive documentation.',
      technologies: ['Node.js', 'Express', 'JWT', 'Swagger', 'PostgreSQL'],
      imageUrl: 'assets/store-commerce-and-shopping-svgrepo-com.svg',
      featured: false
    },
    {
      title: 'Mobile Banking App',
      description: 'A cross-platform mobile banking application with secure transactions, biometric authentication, and real-time notifications.',
      technologies: ['Flutter', 'Dart', 'Firebase', 'Node.js', 'MongoDB'],
      imageUrl: 'assets/mobile-svgrepo-com.svg',
      featured: true
    }
  ];

  get featuredProjects(): Project[] {
    return this.projects.filter(project => project.featured);
  }

  get otherProjects(): Project[] {
    return this.projects.filter(project => !project.featured);
  }
}
