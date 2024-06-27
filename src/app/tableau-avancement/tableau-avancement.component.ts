import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tableau-avancement',
  templateUrl: './tableau-avancement.component.html',
  styleUrls: ['./tableau-avancement.component.css']
})
export class TableauAvancementComponent implements OnInit{

showLoader : boolean = true; 
constructor(){}


ngOnInit() {
  setTimeout(() => {
    this.hideLoader();
  }, 4000); // Délai de 3 secondes (ajustez selon vos besoins)
 // this.navbarAnimationService.initNavbarAnimation();
}

hideLoader(): void { this.showLoader = false;  }

}