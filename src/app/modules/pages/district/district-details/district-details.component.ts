import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ErrorHandlerService } from './../../../../shared/services/error-handler.service';
import { RepositoryService } from './../../../../shared/services/repository.service';

import { District } from './../../../../_interfaces/district.model';
import { School } from './../../../../_interfaces/school.model';

@Component({
  selector: 'app-district-details',
  templateUrl: './district-details.component.html',
  styleUrls: ['./district-details.component.css']
})
export class DistrictDetailsComponent implements OnInit {

  public formObject: District;
  public schools: School[];
  public errorMessage = '';
  public formTitle = 'District details:';

  constructor(private repository: RepositoryService, private router: Router,
              private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getFocusObjectDetails();
  }

  getFocusObjectDetails() {
    const id: string = this.activeRoute.snapshot.params.id;
    const focusObjectApiUrl = `api/district/${id}`;
    const schoolsApiUrl = `api/district/GetSchoolsByDistrictId?districtId=${id}`;

    // Get the school
    this.repository.getData(focusObjectApiUrl)
    .subscribe(res => {
      this.formObject = res as District;
      this.repository.getData(schoolsApiUrl)
      .subscribe(studentsResponse => {
        this.schools = studentsResponse as School[];
      },
      (error1) => {
        this.errorHandler.handleError(error1);
        this.errorMessage = this.errorHandler.errorMessage;
      });
    },
    (error2) => {
      this.errorHandler.handleError(error2);
      this.errorMessage = this.errorHandler.errorMessage;
    });
  }
}
