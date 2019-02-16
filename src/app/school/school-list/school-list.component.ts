import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';

import { School } from './../../_interfaces/school.model';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css']
})
export class SchoolListComponent implements OnInit {
  public schools: School[];
  public errorMessage = '';

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.getAllSchools();
  }

  public getAllSchools() {
    const apiAddress = 'api/school';
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.schools = res as School[];
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    });
  }

  public getSchoolDetails(id: string) {
    const detailsUrl = `/school/details/${id}`;
    this.router.navigate([detailsUrl]);
  }

  public redirectToUpdatePage(id: string) {
    const updateUrl = `/school/update/${id}`;
    this.router.navigate([updateUrl]);
  }

}
