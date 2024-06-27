import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { PersonnelServiceService } from '../Services/personnel-service.service';
import { AvancementService } from '../Services/avancement.service';
import { Avancement } from '../Models/Avancement';
@Component({
  selector: 'app-hiss',
  templateUrl: './hiss.component.html',
  styleUrls: ['./hiss.component.css']
})
export class HissComponent implements OnInit {
id : string ="" ; 
index :number =0 ; 
qualificationPersonnel :any ; 
informationsAvancement : any; 
test : number =0 ; 
showLoader: boolean = true; // Contrôle l'affichage du chargement
nomPersonnel : string ="" ; 
  constructor(private ar : ActivatedRoute , public service : AvancementService , private servicePersonnel : PersonnelServiceService){}

  ngOnInit(): void {
    this.id = this.ar.snapshot.params['id'];
    console.log("iddddddddddddddddd"+this.id)
    this.getAvancementsPersonnel() ; 
    setTimeout(() => {
      this.hideLoader();
    }, 3000); // Délai de 3 secondes (ajustez selon vos besoins)
    this.servicePersonnel.getPersonnel(this.id).subscribe(data => {
      this.nomPersonnel = data.nom + " "+ data.prenom;
    });  
  }
  hideLoader(): void {
    this.showLoader = false;
  }

getAvancementsPersonnel(){
  this.service.getAvancementPersonnel(this.id).subscribe(data => {
    this.service.AvancementsPersonnel = data;
    this.service.length_historiques_personnel = this.service.AvancementsPersonnel.length; 
    console.log('length data' +  this.service.length_historiques_personnel) ; 
     // Iterate through AvancementsPersonnel with a counter
     let counter = 1;
     for (let avancement of this.service.AvancementsPersonnel) {
       if(avancement.scat)
       this.test = 1 ;  //if test =1 donc sous categorie exite donc personnel est horaire n'est pas mensuel
     }
    $(document).ready(function () {
      $('#example').DataTable();
    });
  });
}
transformerDate(timestamp: number) :string {
  const dateObj = new Date(timestamp);
  const year = dateObj.getUTCFullYear();
  const month = ('0' + (dateObj.getUTCMonth() + 1)).slice(-2); // +1 car les mois vont de 0 à 11
  const day = ('0' + dateObj.getUTCDate()).slice(-2);

  return `${year}-${month}-${day}`;
}
getAvancement(id : number){
    this.service.getAvancement(id).subscribe(data => {
      this.informationsAvancement = data;
      this.nomPersonnel =  this.informationsAvancement.nom
      console.log("avancement selectionnee est : " +      this.informationsAvancement) ; 
    });
}
getQualificationPersonnel(mle : string){
  this.servicePersonnel.getQualificationDePersonnel(mle).subscribe(date =>{
    this.qualificationPersonnel = date ; 
    console.log("qualification personnel  est : " + this.qualificationPersonnel) ; })
 
}

afficheQualificationPersonnel(mle :string):string{
  this.servicePersonnel.getPersonnel(mle).subscribe(data => {
    this.qualificationPersonnel = data.qualification;
    console.log("qualification Personnel Selectionnnééé "+  this.qualificationPersonnel ) ;
  });
  return  this.qualificationPersonnel  ;

}
}