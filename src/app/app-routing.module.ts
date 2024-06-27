import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TemplateComponent } from './template/template.component';
import { TableauuComponent } from './tableauu/tableauu.component';
import { HistoriquesComponent } from './historiques/historiques.component';
import { AvEchelonComponent } from './av-echelon/av-echelon.component';
import { HistoriquesPersonnelComponent } from './historiques-personnel/historiques-personnel.component';
import { HissComponent } from './hiss/hiss.component';
import { BarrComponent } from './barr/barr.component';
import { PersonnelsHomeComponent } from './personnels-home/personnels-home.component';
import { AvEchComponent } from './av-ech/av-ech.component';
import { AvancementComponent } from './avancement/avancement.component';
import { TableauAvancementComponent } from './tableau-avancement/tableau-avancement.component';

const routes: Routes = [

  {path:"" , component:LoginAdminComponent },
 // {path:"accueil" , component:AccueilComponent },
  {path:"avEch" , component:AvEchComponent },
  {path:"template" , component:TemplateComponent },
  {path:"bar" , component:BarrComponent },
  {path:"bb" , component:TableauuComponent },



  {path:"login" , component:LoginAdminComponent },
  {path:"accueil" , component:PersonnelsHomeComponent },
  {path:"av" , component:AvEchelonComponent },
  {path:"historiques" , component:HistoriquesComponent },
  {path:"historiquesPersonnel/:id" , component:HissComponent },
  {path:"avancementManquants" , component:AvancementComponent },
  {path:"tableauAv" , component:TableauAvancementComponent },
  {path:"" , redirectTo:"/login",pathMatch:'full'},
  {path:"**" , component:PageNotFoundComponent} 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
