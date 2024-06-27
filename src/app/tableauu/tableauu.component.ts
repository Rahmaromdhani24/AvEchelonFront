import { Component ,  AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as $ from 'jquery';
import { PersonnelServiceService } from '../Services/personnel-service.service';
import { Personnel } from '../Models/Personnel';
import { MatDialog , MatDialogConfig } from '@angular/material/dialog';
import { AvancementComponent } from '../avancement/avancement.component';

@Component({
  selector: 'app-tableauu',
  templateUrl: './tableauu.component.html',
  styleUrls: ['./tableauu.component.css']
})
export class TableauuComponent implements OnInit  {
  personnels: Personnel[] = []; // Assurez-vous que personnels est typé en tant que tableau de Personnel
  selectedPersonnels: any[] = []; // Tableau pour stocker les éléments sélectionnés

  constructor(private router: Router, public service: PersonnelServiceService , private dialog  : MatDialog) { }

  ngOnInit(): void {
    this.getAllPersonnels();
    this.processSelectedPersonnels() ; 
  }

  getAllPersonnels() {
    this.service.getAllPersonnels().subscribe(data => {
      this.service.PersonnelsData = data;
      this.personnels = data; // Assignez les données à personnels pour l'affichage dans le tableau
      $(document).ready(function () {
        $('#example').DataTable();
      });
    });
  }

  selectAll(event: any): void {
    const checked = event.target.checked;
    this.service.PersonnelsData.forEach((personnel: any) => {
      personnel.selected = checked;
      if (checked && !this.selectedPersonnels.includes(personnel)) {
        this.selectedPersonnels.push(personnel);
      } else if (!checked) {
        const index = this.selectedPersonnels.indexOf(personnel);
        if (index !== -1) {
          this.selectedPersonnels.splice(index, 1);
        }
      }
    });
  }

  toggleSelection(personnel: any): void {
    personnel.selected = !personnel.selected;
    if (personnel.selected) {
      this.selectedPersonnels.push(personnel);
    } else {
      const index = this.selectedPersonnels.indexOf(personnel);
      if (index !== -1) {
        this.selectedPersonnels.splice(index, 1);
      }
    }
  }
  processSelectedPersonnels(): void {
    console.log('Personnels sélectionnés :', this.selectedPersonnels);
    // Vous pouvez maintenant faire quelque chose avec les éléments sélectionnés
  }
  
  auMoinsUneSelection(): boolean {
    // Vérifie s'il y a au moins un élément sélectionné individuellement
    const hasSelectedIndividually = this.selectedPersonnels.length > 0;

    // Vérifie si toutes les lignes sont sélectionnées avec la checkbox "Select All"
    const allSelected = this.service.PersonnelsData.every((personnel: Personnel) => personnel.selected);

    // Le bouton "Suivant" sera visible si au moins une ligne est sélectionnée individuellement ou si toutes les lignes sont sélectionnées avec "Select All"
    return hasSelectedIndividually || allSelected;
  }


  suivant(): void {
    // Action à effectuer lorsque le bouton "Suivant" est cliqué
    console.log('Bouton Suivant cliqué');
    console.log('Personnels sélectionnés :', this.selectedPersonnels);
  }
  openDialog(){
    const dialogConfig = new MatDialogConfig() ; 
    dialogConfig.disableClose=true ; 
    dialogConfig.autoFocus=true ; 
    dialogConfig.width="70%" ; 
    this.dialog.open(AvancementComponent , dialogConfig) ; 
    console.log('Bouton Suivant cliqué');
  }
}

