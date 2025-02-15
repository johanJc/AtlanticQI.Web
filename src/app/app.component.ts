import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { GeneralService } from './services/general.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, SidebarComponent, LoadingComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {
	private unsubscribe$ = new Subject<void>();
	sharedDataService = inject(GeneralService);
	loading = false;
	cdr = inject(ChangeDetectorRef);

	ngOnInit(){
		this.sharedDataService.loadingObser
		.pipe(takeUntil(this.unsubscribe$))
		.subscribe({
		  next: (data: any) => {
			this.loading = data;
			this.cdr.detectChanges();
		  }
		});
	}
}
