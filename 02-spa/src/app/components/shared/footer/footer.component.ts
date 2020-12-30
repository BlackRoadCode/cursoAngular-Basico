import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `<nav class="navbar fixed-bottom navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Pepe Sosa 2020</a>
</nav>`,
  styles: [ ]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
