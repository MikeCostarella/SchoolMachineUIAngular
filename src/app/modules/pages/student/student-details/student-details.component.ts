import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ErrorHandlerService } from './../../../../shared/services/error-handler.service';
import { RepositoryService } from './../../../../shared/services/repository.service';

import { School } from './../../../../_interfaces/school.model';
import { Student } from './../../../../_interfaces/student.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  public schools: School[];
  public formObject: Student;
  public errorMessage = '';
  public formTitle = 'Student details:';

  constructor(private repository: RepositoryService, private router: Router,
              private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getFocusObjectDetails();
  }

  getFocusObjectDetails() {
    const id: string = this.activeRoute.snapshot.params.id;
    const focusObjectApiUrl = `api/student/${id}`;
    const schoolsApiUrl = `api/student/GetSchoolsByStudentId?studentId=${id}`;

    // Get the student
    this.repository.getData(focusObjectApiUrl)
    .subscribe(res => {
      this.formObject = res as Student;
      this.repository.getData(schoolsApiUrl)
      .subscribe(schoolsResponse => {
        this.schools = schoolsResponse as School[];
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
