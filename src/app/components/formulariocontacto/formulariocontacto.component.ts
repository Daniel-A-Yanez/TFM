import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-formulariocontacto',
  templateUrl: './formulariocontacto.component.html',
  styleUrl: './formulariocontacto.component.css',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class FormulariocontactoComponent {
  contactoForm: FormGroup;
  mensajeRespuesta: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cargo: [''],
      empresa: [''],
      celular: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      politica: [false, Validators.requiredTrue],
      politicaComunicaciones: [false],
    });
  }

  onSubmit() {
    if (this.contactoForm.valid) {
      const endpoint = 'https://mock.apidog.com/m1/944912-928334-default/asesoria';
      this.http.post(endpoint, this.contactoForm.value).subscribe({
        next: (res:any) => {
          this.mensajeRespuesta = res?.mensaje || 'Formulario enviado con éxito.'; 
          this.contactoForm.reset();
        },
        error: () => {
          this.mensajeRespuesta = 'Error al enviar el formulario.';
        }
      });
    }
  }
}
