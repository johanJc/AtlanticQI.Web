import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  imports: [],
  template: `
  <div class="loading-page">
    <div>
        <div class="loader"></div>    
        <!-- text -->
    </div>
</div>`,
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {

}
