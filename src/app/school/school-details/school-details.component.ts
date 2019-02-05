import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';

import { School } from './../../_interfaces/school.model';

@Component({
  selector: 'app-school-details',
  templateUrl: './school-details.component.html',
  styleUrls: ['./school-details.component.css']
})
export class SchoolDetailsComponent implements OnInit {
  public school: School;
  public errorMessage = '';

  constructor(private repository: RepositoryService, private router: Router,
              private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getSchoolDetails();
  }

  getSchoolDetails() {
    const id: string = this.activeRoute.snapshot.params.id;
    const apiUrl = `api/school/${id}/schoolstudent`;

    this.repository.getData(apiUrl)
    .subscribe(res => {
      this.school = res as School;
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    });
  }
}
