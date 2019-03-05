import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';

import { School } from './../../_interfaces/school.model';
import { Student } from './../../_interfaces/student.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  public schools: School[];
  public student: Student;
  public errorMessage = '';

  constructor(private repository: RepositoryService, private router: Router,
              private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getStudentDetails();
  }

  getStudentDetails() {
    const id: string = this.activeRoute.snapshot.params.id;
    const studentApiUrl = `api/student/GetStudentById?id=${id}`;
    const schoolsApiUrl = `api/student/GetSchoolsByStudentId?studentId=${id}`;

    // Get the student
    this.repository.getData(studentApiUrl)
    .subscribe(res => {
      this.student = res as Student;
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
