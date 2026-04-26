import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('threeCanvas') threeCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('heroImage') heroImage!: ElementRef<HTMLElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private animationId!: number;
  private particles!: THREE.Points;
  private mouseX = 0;
  private mouseY = 0;
  private targetX = 0;
  private targetY = 0;
  private isBrowser: boolean;

  titles = ['Software Engineer', 'Cloud Architect', 'Full Stack Developer', 'Kubernetes Expert'];
  currentTitleIndex = 0;
  currentTitle = this.titles[0];
  private titleInterval!: ReturnType<typeof setInterval>;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.startTitleCycle();
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initThreeJS();
      this.bindMouseEvents();
    }
  }

  ngOnDestroy(): void {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    if (this.renderer) this.renderer.dispose();
    if (this.titleInterval) clearInterval(this.titleInterval);
    if (this.isBrowser) {
      window.removeEventListener('mousemove', this.onMouseMove);
    }
  }

  private startTitleCycle(): void {
    this.titleInterval = setInterval(() => {
      this.currentTitleIndex = (this.currentTitleIndex + 1) % this.titles.length;
      this.currentTitle = this.titles[this.currentTitleIndex];
    }, 3000);
  }

  private initThreeJS(): void {
    const canvas = this.threeCanvas.nativeElement;
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    this.camera.position.z = 400;

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.createParticles();

    window.addEventListener('resize', this.onResize);
    this.animate();
  }

  private createParticles(): void {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color1 = new THREE.Color('#667eea');
    const color2 = new THREE.Color('#764ba2');
    const color3 = new THREE.Color('#f093fb');

    for (let i = 0; i < count; i++) {
      const r = 200 + Math.random() * 200;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const t = Math.random();
      const mixColor = t < 0.5
        ? color1.clone().lerp(color2, t * 2)
        : color2.clone().lerp(color3, (t - 0.5) * 2);

      colors[i * 3] = mixColor.r;
      colors[i * 3 + 1] = mixColor.g;
      colors[i * 3 + 2] = mixColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);

    this.particles.rotation.y += 0.0008;
    this.particles.rotation.x += 0.0003;

    this.targetX += (this.mouseX * 0.0005 - this.targetX) * 0.05;
    this.targetY += (this.mouseY * 0.0005 - this.targetY) * 0.05;

    this.camera.position.x += (this.mouseX * 0.05 - this.camera.position.x) * 0.02;
    this.camera.position.y += (-this.mouseY * 0.05 - this.camera.position.y) * 0.02;
    this.camera.lookAt(this.scene.position);

    this.renderer.render(this.scene, this.camera);
  };

  private onMouseMove = (e: MouseEvent): void => {
    this.mouseX = e.clientX - window.innerWidth / 2;
    this.mouseY = e.clientY - window.innerHeight / 2;

    if (this.heroImage?.nativeElement) {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * -20;
      this.heroImage.nativeElement.style.transform =
        `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg) translateZ(20px)`;
    }
  };

  private onResize = (): void => {
    const canvas = this.threeCanvas.nativeElement;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  };

  private bindMouseEvents(): void {
    window.addEventListener('mousemove', this.onMouseMove);
  }

  trackResumeDownload() {
    if (typeof window !== 'undefined' && (window as any).trackResumeDownload) {
      (window as any).trackResumeDownload();
    }
  }

  scrollToContact(): void {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }
}
