import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Couplet {
  english: {
    line1: string;
    line2: string;
    attribution: string;
  };
  urdu: {
    line1: string;
    line2: string;
    attribution: string;
  };
}

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnInit {
  selectedCouplet: Couplet | null = null;
  popupTitle = "TO A YOUNG MAN";

  couplets: Couplet[] = [
    {
      english: {
        line1: "Thy abode is not on the dome of a royal palace;",
        line2: "You are an eagle and should live on the rocks of mountains.",
        attribution: "Dr Sir Muhammad Iqbal"
      },
      urdu: {
        line1: "نہیں تیرا نشیمن قصرِ سلطانی کے گنبد پر",
        line2: "تو شاہین ہے، بسیرا کر پہاڑوں کی چٹانوں میں",
        attribution: "ڈاکٹر سر محمد اقبال"
      }
    },
    {
      english: {
        line1: "Your sofas are from Europe, your carpets from Iran;",
        line2: "This slothful opulence evokes my sigh of pity.",
        attribution: "Dr Sir Muhammad Iqbal"
      },
      urdu: {
        line1: "تیرے صوفے ہیں افرنگی، ترے قالین ہیں ایرانی",
        line2: "لہو مجھ کو رلاتی ہے جوانوں کی تن آسانی",
        attribution: "ڈاکٹر سر محمد اقبال"
      }
    },
    {
      english: {
        line1: "In vain if you possess Khusroe's imperial pomp,",
        line2: "If you do not possess prowess or contentment.",
        attribution: "Dr Sir Muhammad Iqbal"
      },
      urdu: {
        line1: "عمارت کیا، شکوۂ خسروی بھی ہو تو کیا حاصل",
        line2: "نہ زورِ حیدری تجھ میں، نہ استغنائے سلمانی",
        attribution: "ڈاکٹر سر محمد اقبال"
      }
    },
    // {
    //   english: {
    //     line1: "Seek not thy joy or greatness in the glitter of Western life,",
    //     line2: "For in contentment lies a Muslim's joy and greatness.",
    //     attribution: "Dr Sir Muhammad Iqbal"
    //   },
    //   urdu: {
    //     line1: "نہ ڈھونڈ اس چیز کو تہذیبِ حاضر کی تجلی میں",
    //     line2: "کہ پایا میں نے استغنا میں معراجِ مسلمانی",
    //     attribution: "ڈاکٹر سر محمد اقبال"
    //   }
    // },
    {
      english: {
        line1: "When an eagle's spirit awakens in youthful hearts,",
        line2: "It sees its luminous goal beyond the starry heavens.",
        attribution: "Dr Sir Muhammad Iqbal"
      },
      urdu: {
        line1: "عقابی روح جب بیدار ہوتی ہے جوانوں میں",
        line2: "نظر آتی ہے اس کو اپنی منزل آسمانوں میں",
        attribution: "ڈاکٹر سر محمد اقبال"
      }
    },
    {
      english: {
        line1: "Despair not, for despair is the decline of knowledge and gnosis:",
        line2: "The Hope of a Believer is among the confidants of God.",
        attribution: "Dr Sir Muhammad Iqbal"
      },
      urdu: {
        line1: "نہ ہو ناامید، ناامیدی زوالِ علم و عرفان ہے",
        line2: "امیدِ مردِ مومن ہے خدا کے رازدانوں میں",
        attribution: "ڈاکٹر سر محمد اقبال"
      }
    },
    {
      english: {
        line1: "Both soar in the same sky,",
        line2: "But the vulture's world is different, and the falcon's world is different.",
        attribution: "Dr Sir Muhammad Iqbal"
      },
      urdu: {
        line1: "پرواز ہے دونوں کی اسی ایک فضا میں",
        line2: "کرگس کا جہاں اور ہے، شاہیں کا جہاں اور",
        attribution: "ڈاکٹر سر محمد اقبال"
      }
    },
    {
      english: {
        line1: "I am a dervish in the world of birds,",
        line2: "For the falcon does not build a nest.",
        attribution: "Dr Sir Muhammad Iqbal"
      },
      urdu: {
        line1: "پرندوں کی دنیا کا درویش ہوں میں",
        line2: "کہ شاہیں بناتا نہیں آشیانہ",
        attribution: "ڈاکٹر سر محمد اقبال"
      }
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Small delay to ensure proper rendering
    setTimeout(() => {
      this.selectRandomCouplet();
    }, 100);
  }

  selectRandomCouplet() {
    const randomIndex = Math.floor(Math.random() * this.couplets.length);
    this.selectedCouplet = this.couplets[randomIndex];
  }

  goToPortfolio() {
    this.router.navigate(['/portfolio']);
  }
}
