import { ConfiguracionService } from './../../servicios/configuracion.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuracion } from 'src/app/modelo/configuracion.model';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {
  permitirRegistro: boolean;

  constructor(
    private router: Router,
    private configuracionService: ConfiguracionService
  ) { }

  ngOnInit() {
    this.configuracionService.getConfiguracion().subscribe((configuracion: Configuracion) =>{
      this.permitirRegistro = configuracion.permitirRegistro
    })
  }

  guardar(){
    let configuracion = {permitirRegistro: this.permitirRegistro}
    this.configuracionService.modificarConfiguracion(configuracion)
    this.router.navigate(["/"])
  }

}
