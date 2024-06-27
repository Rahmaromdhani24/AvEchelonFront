import { Personnel } from "./Personnel";

export interface Avancement {
    id : number ;
    tpersonnel: Personnel;
    nom : string ; 
    dEffet: number;
    dpav : number;
    ech :string ; 
    indDiff : string ;  
    observation : string ;
    selected: boolean;
    cat : string ; 
    scat : string ; 
    sbase : string
    qualification : string

}
