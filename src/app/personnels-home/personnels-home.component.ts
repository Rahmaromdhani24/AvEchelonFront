import { Component, OnInit } from '@angular/core';
import { PersonnelServiceService } from '../Services/personnel-service.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-personnels-home',
  templateUrl: './personnels-home.component.html',
  styleUrls: ['./personnels-home.component.css']
})
export class PersonnelsHomeComponent implements OnInit {
  showLoader : boolean = true; 
  informationsPersonnel: any // Personnel | null = null; 
  constructor(private router : Router , public service :PersonnelServiceService) {}

  ngOnInit() {
    setTimeout(() => {
      this.hideLoader();
    }, 4000); // Délai de 3 secondes (ajustez selon vos besoins)
   // this.navbarAnimationService.initNavbarAnimation();
     this.getAllPersonnels()  ;
  }

  hideLoader(): void { this.showLoader = false;  }
   
  deconnexion(){
    this.router.navigate(['/login']); 
  }
  getAllPersonnels() {
    this.service.getAllPersonnels().subscribe(data => {
      this.service.PersonnelsData = data;
      $(document).ready(function () {
        $('#homePersonnels').DataTable();
      });
    });
  }

  transfomerDate(timestamp: number) :string {
    const dateObj = new Date(timestamp);
    const year = dateObj.getUTCFullYear();
    const month = ('0' + (dateObj.getUTCMonth() + 1)).slice(-2); // +1 car les mois vont de 0 à 11
    const day = ('0' + dateObj.getUTCDate()).slice(-2);
  
    return `${year}-${month}-${day}`;
  }
  parseDateString(dateString: string): Date | null {
    // Vérifiez si la chaîne est dans le format attendu
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) {
      console.error('Date string format is incorrect');
      return null;
    }
  
    // Divisez la chaîne en parties
    const [year, day, month] = dateString.split('-').map(part => parseInt(part, 10));
  
    // Les mois en JavaScript sont de 0 (janvier) à 11 (décembre), il faut donc ajuster
    const date = new Date(year, month - 1, day);
  
    // Vérifiez que la date est valide
    if (isNaN(date.getTime())) {
      console.error('Invalid date');
      return null;
    }
  
    return date;
  }
  calculateAge(dateOfBirthString: string): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirthString);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Si le mois actuel est antérieur au mois de naissance ou si c'est le même mois mais le jour actuel est antérieur au jour de naissance
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }
  afficheInformations(mle :string){
    this.service.getPersonnel(mle).subscribe(data => {
      this.informationsPersonnel = data;
      console.log("Personnel Selectionnnééé "+  this.informationsPersonnel ) ;
    });
  }
   // Méthodes pour combiner les valeurs des postes filtrés par active = 1
 /*  getActivePostes(): Poste[] {
    return this.informationsPersonnel?.TPostes.filter(poste => poste.active === '1') || [];
  }

  getDepartement(): string {
    return this.getActivePostes().map(poste => poste.nom_Dep).join(', ');
  }

  getService(): string {
    return this.getActivePostes().map(poste => poste.nom_Service).join(', ');
  }

  getCollege(): string {
    return this.getActivePostes().map(poste => poste.college).join(', ');
  }
  getReference(): string {
    return this.getActivePostes().map(poste => poste.ref).join(', ');
  }

  getQualification(): string {
    return this.getActivePostes().map(poste => poste.qualification).join(', ');
  }*/
}
