import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent implements OnInit {
  productos: any[] = [];
  isLoading = true;
  mostrarFormulario = false;
  modoEdicion = false;
  productoForm: any = {
    id: null,
    nombre: '',
    descripcion: '',
    precio: null
  };

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.obtenerProductos().subscribe(
      data => {
        this.productos = data;
        this.isLoading = false;
      },
      error => {
        console.error('Error al cargar productos:', error);
        this.isLoading = false;
      }
    );
  }

  mostrarFormularioNuevo(): void {
    this.mostrarFormulario = true;
    this.modoEdicion = false;
    this.productoForm = { id: null, nombre: '', descripcion: '', precio: null };
  }

  editarProducto(producto: any): void {
    this.modoEdicion = true;
    this.mostrarFormulario = true;
    this.productoForm = { ...producto };
  }

  guardarProducto(): void {
    console.log('Guardando producto...', this.productoForm);
  
    if (this.modoEdicion) {
      this.productoService.actualizarProducto(this.productoForm.id, this.productoForm).subscribe(() => {
        this.cargarProductos();
        this.mostrarFormulario = false;
      });
    } else {
      const { id, ...nuevoProducto } = this.productoForm;
      
      this.productoService.agregarProducto(nuevoProducto).subscribe((productoCreado) => {
        this.productos.push(productoCreado); // Agregar el nuevo producto a la tabla
        this.mostrarFormulario = false;
      });
    }
  }
  
  
  cancelar(): void {
    this.mostrarFormulario = false;
  }

  eliminarProducto(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe(() => {
        this.productos = this.productos.filter(producto => producto.id !== id);
      });
    }
  }
  
}
