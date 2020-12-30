import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  constructor( public _authService:AuthService ) { 
    // this._authService.loginWithPopup();
   }

  ngOnInit(): void {  }

  

}


// https://localhost:4200/

// authorize?
// redirect_uri=http%3A%2F%2Flocalhost%3A4200&
// client_id=Pn43Yhom4EJdYXX2pOS6CvygDfCt6RGx&
// scope=openid%20profile%20email&
// response_type=code&
// response_mode=query&
// state=V0lES2JqellkZmdtT1FnZTdvVkl4cG4yVUoucmJxeFlWR2NiUU5uejhhOA%3D%3D&
// nonce=TS5fSTYtMmR0TXdNczVWb2loZUs0VS5%2BeFp5OU5oTEt5ZXlIdUZRS2l0dA%3D%3D&
// code_challenge=melbxJLWt0QB77oRj6dGPtE_NWcNSVmwm5uIJTFLvMI&
// code_challenge_method=S256&
// auth0Client=eyJuYW1lIjoiQGF1dGgwL2F1dGgwLWFuZ3VsYXIiLCJ2ZXJzaW9uIjoiMS4yLjAifQ%3D%3D