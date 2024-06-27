import { Component, OnInit } from '@angular/core';
import { NavbarAnimationService } from '../navbar-animation.service';
import { Router } from '@angular/router';
import { PersonnelServiceService } from '../Services/personnel-service.service';
import { AvancementService } from '../Services/avancement.service';
import { Avancement } from '../Models/Avancement';

@Component({
  selector: 'app-barr',
  templateUrl: './barr.component.html',
  styleUrls: ['./barr.component.css']
})
export class BarrComponent implements OnInit {
  showLoader : boolean = true; 
  selectionsAvancements: any[] = [];
  sanctionsPersonnels : any 
  lengthSanctionsPersonnel : number =0; 
  constructor( public serviceAvancement: AvancementService , private router : Router , public servicePersonnel :PersonnelServiceService) {}

  ngOnInit() {
    setTimeout(() => {
      this.hideLoader();
    }, 3000); 
    this.serviceAvancement.loadSelectedAvancements();
  }
  
  hideLoader(): void {  this.showLoader = false;  }

  formatDate(timestamp: number): string {
    if (timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Les mois commencent à 0 en JavaScript
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return '';
  }
  updateDate(avancement: Avancement, field: keyof Avancement, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement?.valueAsDate) {
      // Ajuster le timestamp pour la date locale
      const date = inputElement.valueAsDate;
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      (avancement[field] as number) = date.getTime();
    }
  }

  annulation() {
    localStorage.clear();
    this.router.navigate(['/av'])
  }

  etatIcone(mle : string ){
    this.serviceAvancement.getSanctionsPersonnels18Mois(mle).subscribe(data=>{
    this.sanctionsPersonnels = data ; 
    this.lengthSanctionsPersonnel = this.sanctionsPersonnels.length ; 
    })
  }
  sauvgarde(){



    this.annulation() ; 
    this.ngOnInit() ; 
  }
}