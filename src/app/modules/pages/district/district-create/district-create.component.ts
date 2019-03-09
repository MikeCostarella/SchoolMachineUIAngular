import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SchoolForCreation } from './../../../../_interfaces/school-for-creation.model';
import { ErrorHandlerService } from './../../../../shared/services/error-handler.service';
import { RepositoryService } from './../../../../shared/services/repository.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-district-create',
  templateUrl: './district-create.component.html',
  styleUrls: ['./district-create.component.css']
})
export class DistrictCreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
