import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private _authService:AuthService, private _router:Router ) { }

  ngOnInit(): void {  }

  salir(){

    this._authService.logout();
    this._router.navigateByUrl('/login');

  }

}
