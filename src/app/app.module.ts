import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { TemplateComponent } from './template/template.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { TableauuComponent } from './tableauu/tableauu.component';
import { AvEchelonComponent } from './av-echelon/av-echelon.component';
import { HistoriquesComponent } from './historiques/historiques.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HistoriquesPersonnelComponent } from './historiques-personnel/historiques-personnel.component';
import { HissComponent } from './hiss/hiss.component';
import { BarrComponent } from './barr/barr.component';
import { PersonnelsHomeComponent } from './personnels-home/personnels-home.component';
import { AvEchComponent } from './av-ech/av-ech.component';
import { AvancementComponent } from './avancement/avancement.component';
import { TableauAvancementComponent } from './tableau-avancement/tableau-avancement.component';




@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginAdminComponent,
    TemplateComponent,
    PageNotFoundComponent,
    TableauuComponent,
    AvEchelonComponent,
    HistoriquesComponent,
    HistoriquesPersonnelComponent,
    HissComponent,
    BarrComponent,
    PersonnelsHomeComponent,
    AvEchComponent,
    AvancementComponent,
    TableauAvancementComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule  ,
    CarouselModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
