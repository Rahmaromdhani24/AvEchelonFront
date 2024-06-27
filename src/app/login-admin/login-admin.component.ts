import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {

  public constructor(private router : Router ) { }

  ngOnInit() {}
   
  passwordFieldType: string = 'password';

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  login(f:NgForm){ 
  var matricule =  f.value.matricule
  var pwd =  f.value.pwd

  if(matricule=== "1234" && pwd ==="admin"){ this.router.navigate(['/accueil']); }
  
  else{
    console.log("error")
    Swal.fire({
      icon:"error",
      title: 'Vérifier votre matricule ou votre  mot de passe  !!',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'}}) }
  
  }

}

