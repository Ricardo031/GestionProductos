import { Component } from '@angular/core';
import { ProductoListComponent } from './productos/producto-list/producto-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductoListComponent],
  template: '<app-producto-list></app-producto-list>',
})
export class AppComponent {}
