import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.css'
})
export class CertificationsComponent {
    certificates = [
      { image: './assets/associate_gcp.png', name: 'Google Cloud Certified Associate Cloud Engineer' },
      { image: './assets/architec_gcp.png', name: 'Google Cloud Certified Professional Cloud Architect' },
      { image: './assets/aws_devl.png', name: 'AWS Certified Developer Associate' },
      { image: './assets/iitb_logo.png', name: 'Advance Certificate Program  in Data Science' },
      { image: './assets/algorithmic_tool.png', name: 'Algorithmic Tool Box'},
    ];
}
