import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-education',
  standalone: true,
  templateUrl: './education.component.html',
  styleUrl: './education.component.css',
  imports:[CommonModule]
})
export class EducationComponent {

  educationalInfo = [
    {
      icon: 'school',
      name: 'Clark University',
      description: 'Focused studies on Mathematics, Physics, and Literature.',
      dates: '2010 - 2014'
    },
    {
      icon: 'local_library',
      name: 'University of Springfield',
      description: 'Bachelor of Science in Computer Science. Courses in Software Development, Data Structures, and Algorithms.',
      dates: '2014 - 2018'
    }
  ];
  educationEntries = [
    {
      icon: 'school',
      institution: 'Springfield High School',
      description: 'High School Diploma with an emphasis in Sciences and Mathematics.',
      dateRange: '2006 - 2010'
    },
    {
      icon: 'local_library',
      institution: 'University of Springfield',
      description: 'Bachelor of Science in Computer Science, specializing in Software Development and Data Structures.',
      dateRange: '2010 - 2014'
    },
    {
      icon: 'account_balance',
      institution: 'Springfield State University',
      description: 'Master of Science in Information Technology, focused on Advanced Computing Technologies.',
      dateRange: '2015 - 2017'
    }
  ];

}
