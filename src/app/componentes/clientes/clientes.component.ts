import { ClienteServicio } from './../../servicios/cliente.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Cliente } from 'src/app/modelo/cliente.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  cliente: Cliente = {
    nombre: "",
    apellido: "",
    email: "",
    saldo: 0
  }
  @ViewChild("clienteForm") clienteForm: NgForm
  @ViewChild("botonCerrar") botonCerrar: ElementRef

  constructor(
    private clienteServicio: ClienteServicio,
    private flashMessages: FlashMessagesService
    ) {
    
  }

  ngOnInit() {
    this.clienteServicio.getClientes().subscribe(clientes=>{
      this.clientes = clientes
    })
  }

  getSaldoTotal(){
    let saldoTotal: number = 0;
    if(this.clientes){
      this.clientes.forEach(cliente=>{
        saldoTotal+=cliente.saldo
      })
    }
    return saldoTotal
  }

  agregar({value, valid}: {value: Cliente, valid: boolean}){
    if(!valid){
      this.flashMessages.show("por favor llena el formulario correctamente", {
        cssClass: "alert-danger",
        timeout: 4000
      })
    }else{
      //agregar nuevo componente
      this.clienteServicio.agregarCliente(value)
      this.clienteForm.resetForm()
      this.cerrarModal()
    }
  }

  private cerrarModal(): void{
    this.botonCerrar.nativeElement.click()
  }


}
