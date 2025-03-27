import { Component, Inject } from '@angular/core';
import { 
  MatDialogRef, 
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose
} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductoService } from '../producto.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent {
  form = new FormGroup({
    id: new FormControl<number | null>(null),
    nombre: new FormControl('', Validators.required),
    precio: new FormControl(0, [Validators.required, Validators.min(0)]),
    descripcion: new FormControl('')
  });

  constructor(
    private productoService: ProductoService,
    public dialogRef: MatDialogRef<ProductoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'add' | 'edit'; producto?: Producto }
  ) {
    if (data.mode === 'edit' && data.producto) {
      this.form.patchValue(data.producto);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value as Producto;
  
      if (this.data.mode === 'add') {
        //* Extrae el resto de las propiedades y omite el id
        const { id, ...productoData } = formValue;
        this.productoService.agregarProducto(productoData).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Error al crear', err)
        });
      } else {
        this.productoService.actualizarProducto(formValue.id!, formValue).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Error al actualizar', err)
        });
      }
    }
  }
  
  
}