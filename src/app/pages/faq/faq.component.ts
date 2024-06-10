import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared-component/header/header.component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {

}
