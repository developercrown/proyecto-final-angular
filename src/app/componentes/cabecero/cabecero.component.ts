import { Configuracion } from 'src/app/modelo/configuracion.model';
import { Observable } from 'rxjs';
import { ConfiguracionService } from './../../servicios/configuracion.service';
import { Router } from '@angular/router';
import { LoginService } from './../../servicios/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.scss']
})
export class CabeceroComponent implements OnInit {

  isLoggedIn: boolean = false;
  loggedInUser: string;
  permitirRegistro: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private configuracionService: ConfiguracionService
  ) {
    
  }

  ngOnInit() {
    this.loginService.getAuth().subscribe(auth =>{
      if(auth){
        this.isLoggedIn = true
        this.loggedInUser = auth.email
      }else{
        this.isLoggedIn = false
        this.loggedInUser = null
      }
    })

    this.configuracionService.getConfiguracion().subscribe((configuracion: Configuracion) =>{
      this.permitirRegistro = configuracion.permitirRegistro
    })
  }

  logout(){
    this.loginService.logout()
    this.isLoggedIn = false
    this.router.navigate(['login'])
  }


}
