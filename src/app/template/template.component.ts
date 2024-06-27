import { Component, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';
import { PersonnelServiceService } from '../Services/personnel-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements AfterViewInit {

 public  constructor(public service : PersonnelServiceService , private router : Router) {}
 poste : string = ""
  ngAfterViewInit() {
    $(document).ready(function() {
      $('#example').DataTable({
        "columnDefs": [
          { "orderable": false, "targets": 5 }
        ],
        language: {
          'paginate': {
            'previous': '<span class="fa-solid fa-chevron-left"></span>',
            'next': '<span class="fa-solid fa-chevron-right"></span>'
          },
          "lengthMenu": 'Display <select class="form-control input-sm">' +
            '<option value="10">10</option>' +
            '<option value="20">20</option>' +
            '<option value="30">30</option>' +
            '<option value="40">40</option>' +
            '<option value="50">50</option>' +
            '<option value="-1">All</option>' +
            '</select> results'
        }
      });
    });

    /*********************************************************************************************/
  this.getAllPatients() ; 
  }

  getAllPatients(){
    this.service.getAllPersonnels().subscribe(data=>{
    this.service.PersonnelsData=data;})
    console.log("les personnels :"+    this.service.PersonnelsData)
    }
}
