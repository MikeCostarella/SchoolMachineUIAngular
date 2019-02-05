import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';

import { Student } from './../../_interfaces/student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  public students: Student[];
  public errorMessage = '';

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.getAllStudents();
  }

  public getAllStudents() {
    const apiAddress = 'api/student';
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.students = res as Student[];
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    });
  }

  public getStudentDetails(id: string) {
    const detailsUrl = `/student/details/${id}`;
    this.router.navigate([detailsUrl]);
  }

}
