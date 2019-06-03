import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/modelo/cliente.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClienteServicio } from 'src/app/servicios/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss']
})
export class EditarClienteComponent implements OnInit {
  id: string = ""
  cliente: Cliente = {
    nombre: "",
    apellido: "",
    email: "",
    saldo: 0
  }

  constructor(
    private clienteServicio: ClienteServicio,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.params["id"]
    this.clienteServicio.getCliente(this.id).subscribe(
      cliente => {
        this.cliente = cliente
      }
    )
  }

  guardar({ value, valid }: { value: Cliente, valid: boolean }) {
    if (!valid) {
      this.flashMessages.show('Por favor llena todo los datos correctamente', {
        cssClass: 'alert-danger',
        timeout: 4000
      })
    } else {
      value.id = this.id
      //modificar el cliente
      this.clienteServicio.modificarCliente(value)
      this.router.navigate(['/'])
    }
  }

  eliminar() {
    if (confirm("seguro que desea eliminar el cliente?")) {
      this.clienteServicio.eliminarCliente(this.cliente)
      this.router.navigate(['/'])
    }
  }

}
