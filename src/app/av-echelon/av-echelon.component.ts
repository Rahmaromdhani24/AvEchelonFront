import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AvancementService } from '../Services/avancement.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Personnel } from '../Models/Personnel';
import { Avancement } from '../Models/Avancement';
import { MatDialog , MatDialogConfig } from '@angular/material/dialog';
import { AvancementComponent } from '../avancement/avancement.component';
@Component({
  selector: 'app-av-echelon',
  templateUrl: './av-echelon.component.html',
  styleUrls: ['./av-echelon.component.css']
})
export class AvEchelonComponent implements OnInit , AfterViewInit{

  showLoader : boolean = true; 
  serverDate: Date | undefined;
  selectedDatee :string=""
  test : boolean=false ; 
  avacements: Personnel[] = []; 
  selectedAvancements: any[] = [];
  nbrNotifications : number =0 ;

  public constructor(private router: Router ,  public service :AvancementService ) { }

  ngOnInit(): void {
    this.processSelectedAvancements() ; 
    console.log(this.service.AvancementsData);  // Vérifiez les données ici
   // this.navbarAnimationService.initNavbarAnimation();
    this.getByDatePicker() ; 
    this.getAllAvancementsCeMois();
    this.nombreAvancementsManquants();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.hideLoader();
    }, 5000); // Délai de 5 secondes (ajustez selon vos besoins)
  }
  
  hideLoader(): void { this.showLoader = false;  }
  getAllAvancements() {
    this.service.getAllAvancements().subscribe(data => {
      this.service.AvancementsData = data;
      $(document).ready(function () {
        $('#example1').DataTable();
      });
    });
  }

  getCurrentDateFormatted(): string {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // Mois de 0 à 11, on ajoute 1 pour avoir de 1 à 12
    let day = date.getDate();
  
    if (day > 15) {
      // Si le jour est supérieur à 15, on doit afficher le premier jour du mois avant
      month += 1;
      if (month === 0) {
        // Si le mois devient 0, cela signifie qu'on est en janvier, donc on passe à décembre de l'année précédente
        month = 12; // Décembre
        year -= 1; // Année précédente
      }
    }
  
    // Formater le mois et le jour en chaînes avec padding
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = '01'; // Toujours le premier jour du mois
  console.log("date d'aujord'huiiii"+`${year}-${formattedMonth}-${formattedDay}`)
    return `${year}-${formattedMonth}-${formattedDay}`;
  }
  
getAllAvancementsCeMois() {
  this.service.getAvDeCeMois(this.getCurrentDateFormatted()).subscribe(data => {
    this.service.AvancementsData = data;
    $(document).ready(function () {
      $('#example1').DataTable();
    });
  });
  }
   
transformerDate(timestamp: number) :string {
  const dateObj = new Date(timestamp);
  const year = dateObj.getFullYear(); // Utiliser getFullYear() pour l'année locale
  const month = ('0' + (dateObj.getMonth() + 1)).slice(-2); // Utiliser getMonth() pour le mois local
  const day = ('0' + dateObj.getDate()).slice(-2); 
return `${year}-${month}-${day}`;}

onDateChange(event: MatDatepickerInputEvent<Date>) {
const selectedDate = event.value;

if (selectedDate) {
  this.test = true ; 
  const year = selectedDate.getFullYear();
  const month = ('0' + (selectedDate.getMonth() + 1)).slice(-2);
  const day = ('0' + selectedDate.getDate()).slice(-2);
  const transformedDate = `${year}-${month}-${day}`;
  this.selectedDatee = transformedDate ;

  console.log("Date choisie transformée : " + transformedDate);
  this.getByDatePicker() ; 

} else {
  console.log("Aucune date sélectionnée.");
  // logique pour gérer le cas où aucune date n'est sélectionnée
}
  }


getByDatePicker(){
  this.service.getAvDeCeMois(this.selectedDatee).subscribe(data => {
    this.service.AvancementsData = data;
    $(document).ready(function () {
      $('#example2').DataTable();
    });
  });
}

  /**********************Selection des avancements **********************/
  selectAll(event: any): void {
    const checked = event.target.checked;
    this.service.AvancementsData.forEach((personnel: any) => {
      personnel.selected = checked;
      if (checked && !this.service.selectedAvancements.includes(personnel)) {
        this.service.addAvancement(personnel);
      } else if (!checked) {
        this.service.removeAvancement(personnel);
      }
    });
  }
  
  toggleSelection(personnel: any): void {
    personnel.selected = !personnel.selected;
    if (personnel.selected) {
      this.service.addAvancement(personnel);
    } else {
      this.service.removeAvancement(personnel);
    }
  }
  
  /*selectAll(event: any): void {
    const checked = event.target.checked;
    this.service.AvancementsData.forEach((personnel: any) => {
      personnel.selected = checked;
      if (checked && !this.service.selectedAvancements.includes(personnel)) {
        this.service.selectedAvancements.push(personnel);
      } else if (!checked) {
        const index = this.service.selectedAvancements.indexOf(personnel);
        if (index !== -1) {
          this.service.selectedAvancements.splice(index, 1);
        }
      }
    });
  }
 
  toggleSelection(personnel: any): void {
    personnel.selected = !personnel.selected;
    if (personnel.selected) {
      this.service.selectedAvancements.push(personnel);
    } else {
      const index = this.service.selectedAvancements.indexOf(personnel);
      if (index !== -1) {
        this.service.selectedAvancements.splice(index, 1);
      }
    }
  }*/
  processSelectedAvancements(): void {
    console.log('Avancements sélectionnés :', this.service.selectedAvancements);
    // Vous pouvez maintenant faire quelque chose avec les éléments sélectionnés
  }
  auMoinsUneSelection(): boolean {
    // Vérifie s'il y a au moins un élément sélectionné individuellement
    const hasSelectedIndividually = this.service.selectedAvancements.length > 0;

    // Vérifie si toutes les lignes sont sélectionnées avec la checkbox "Select All"
    const allSelected = this.service.AvancementsData.every((avancement: Avancement) => avancement.selected);

    // Le bouton "Suivant" sera visible si au moins une ligne est sélectionnée individuellement ou si toutes les lignes sont sélectionnées avec "Select All"
    return hasSelectedIndividually || allSelected;
  }
  suivant(): void {
    // Action à effectuer lorsque le bouton "Suivant" est cliqué
    console.log('Bouton Suivant cliqué');
    console.log('Avancements sélectionnés :', this.selectedAvancements);
  }

  nombreAvancementsManquants(){
    this.service.getNombreAvancementsManquants().subscribe(data =>{
      this.nbrNotifications = data ; 
      console.log("nbr notification : "+ this.nbrNotifications)
    })
  }
  selection(){
    this.router.navigate(['/bar'])
  }
}
