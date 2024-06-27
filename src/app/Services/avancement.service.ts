import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Avancement } from '../Models/Avancement';

@Injectable({
  providedIn: 'root'
})
export class AvancementService {

  AvancementsData :any=[];
  AvancementsPersonnel : any=[] ; 
  Historiques  : any=[] ; 
  avancementsManquants : any=[]
  length_historiques : number =0 ; 
  length_historiques_personnel : number = 0 ; 
selectedAvancements: any[] = [];  
  constructor(private http: HttpClient) {
    this.loadSelectedAvancements();
   }

  private urlGetAllAvancements = "http://localhost:8281/api/avancement/all" ;
  getAllAvancements(): Observable<any> {
    return this.http.get<any>(`${this.urlGetAllAvancements}`)
  }

  private urlGetAvancementByMle = 'http://localhost:8281/api/avancement/personnel';
  getAvancementPersonnel(mle : string): Observable<any> {
  return this.http.get<any>(`${this.urlGetAvancementByMle}/${mle}`);}

  private urlGetAvancementCeMois = 'http://localhost:8281/api/avancement/avancementsCeMois';
  getAvDeCeMois(date : string): Observable<any> {
    const params = new HttpParams().set('dateString' , date) ; 
    return this.http.get<any>(`${this.urlGetAvancementCeMois}` , {params});}

  private urlGetAllHistoriques = "http://localhost:8281/api/avancement/avancementsRecentsPourChaquePersonnel" ;
  getAllHistoriquesRecent(): Observable<any> {
    return this.http.get<any>(`${this.urlGetAllHistoriques}`)
  }
  
  private urlGetAvancements = "http://localhost:8281/api/avancement" ;
  getAvancement(id : number): Observable<Avancement> {
    return this.http.get<Avancement>(`${this.urlGetAvancements}/${id}`);}
  

    
    /********************     Sanctions Personnels  & Anomalie Avancement  *********************************/

    
  private urlGetAnomliesAvancements = 'http://localhost:8281/api/avancement/anomalie';
  getAllAvancementsManquants(): Observable<any> {
  return this.http.get<any>(`${this.urlGetAnomliesAvancements}`);}

  
  private urlGetNombreAnomliesAvancements = 'http://localhost:8281/api/avancement/nbrAnomalie';
  getNombreAvancementsManquants(): Observable<number> {
  return this.http.get<number>(`${this.urlGetNombreAnomliesAvancements}`);}


  private urlGetSanctionsPersonnelAvant18mois = 'http://localhost:8281/api/personnel/sanctions';
  getSanctionsPersonnels18Mois(mle: string): Observable<any> {
  return this.http.get<any>(`${this.urlGetSanctionsPersonnelAvant18mois}/${mle}`);}

  /************************************* Seclected Avancements  ********************************************/
 /*   saveSelectedAvancements(): void {
    localStorage.setItem('selectedAvancements', JSON.stringify(this.selectedAvancements));
  }
 loadSelectedAvancements(): void {
    const data = localStorage.getItem('selectedAvancements');
    if (data) {
      this.selectedAvancements = JSON.parse(data);
    }
  }*/
    /*loadSelectedAvancements(): void {
      const data = localStorage.getItem('selectedAvancements');
      if (data) {
        this.selectedAvancements = JSON.parse(data).map((avancement: Avancement) => ({
          ...avancement,
          dEffet: avancement.dEffet ? new Date(avancement.dEffet) : null,
          dpav: avancement.dpav ? new Date(avancement.dpav) : null
        }));
      }
    }
  getSelectedAvancements(): any[] {
    return this.selectedAvancements;
  }
  addAvancement(avancement: any): void {
    this.selectedAvancements.push(avancement);
    this.saveSelectedAvancements();
  }

  removeAvancement(avancement: any): void {
    const index = this.selectedAvancements.indexOf(avancement);
    if (index !== -1) {
      this.selectedAvancements.splice(index, 1);
      this.saveSelectedAvancements();
    }
  }*/
    addAvancement(avancement: Avancement): void {
      const existingIndex = this.selectedAvancements.findIndex(a => a.id === avancement.id);
      if (existingIndex === -1) {
        this.selectedAvancements.push(avancement);
        this.saveSelectedAvancements();
      }
    }
  
    loadSelectedAvancements(): void {
      const data = localStorage.getItem('selectedAvancements');
      if (data) {
        this.selectedAvancements = JSON.parse(data);
      }
    }
  
    saveSelectedAvancements(): void {
      localStorage.setItem('selectedAvancements', JSON.stringify(this.selectedAvancements));
    }
    getSelectedAvancements(): Avancement[] {
      return this.selectedAvancements;
    }
  
   
    removeAvancement(avancement: Avancement): void {
      const index = this.selectedAvancements.findIndex(a => a.id === avancement.id);
      if (index !== -1) {
        this.selectedAvancements.splice(index, 1);
        this.saveSelectedAvancements();
      }
    }
  }
