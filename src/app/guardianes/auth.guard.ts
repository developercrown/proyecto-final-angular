import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router/';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable()
export class AuthGuard implements CanActivate{
    constructor( private router: Router, private afAuth: AngularFireAuth){}

    canActivate(): Observable<boolean>{
        return this.afAuth.authState.pipe(
            map(
                auth =>{
                    if(!auth){
                        this.router.navigate(["/login"])
                        return false
                    }
                    return true
                }
            )
        )
    }
}