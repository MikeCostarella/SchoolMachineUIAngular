import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ErrorHandlerService } from './../../../../shared/services/error-handler.service';
import { RepositoryService } from './../../../../shared/services/repository.service';

import { School } from './../../../../_interfaces/school.model';
import { Student } from './../../../../_interfaces/student.model';

@Component({
  selector: 'app-school-details',
  templateUrl: './school-details.component.html',
  styleUrls: ['./school-details.component.css']
})
export class SchoolDetailsComponent implements OnInit {
  public school: School;
  public students: Student[];
  public errorMessage = '';

  constructor(private repository: RepositoryService, private router: Router,
              private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getSchoolDetails();
  }

  getSchoolDetails() {
    const id: string = this.activeRoute.snapshot.params.id;
    const schoolApiUrl = `api/school/${id}`;
    const studentsApiUrl = `api/school/GetStudentsBySchoolId?schoolId=${id}`;

    // Get the school
    this.repository.getData(schoolApiUrl)
    .subscribe(res => {
      this.school = res as School;
      this.repository.getData(studentsApiUrl)
      .subscribe(studentsResponse => {
        this.students = studentsResponse as Student[];
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