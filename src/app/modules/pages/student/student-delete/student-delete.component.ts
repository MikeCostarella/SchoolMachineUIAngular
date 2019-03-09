import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from './../../../../shared/services/error-handler.service';
import { RepositoryService } from './../../../../shared/services/repository.service';
import { Student } from './../../../../_interfaces/student.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-delete',
  templateUrl: './student-delete.component.html',
  styleUrls: ['./student-delete.component.css']
})
export class StudentDeleteComponent implements OnInit {
  public errorMessage = '';
  public student: Student;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getStudentById();
  }

  private getStudentById() {
    const studentId: string = this.activeRoute.snapshot.params.id;
    const studentByIdUrl = `api/student/GetStudentById?id=${studentId}`;

    this.repository.getData(studentByIdUrl)
      .subscribe(res => {
        this.student = res as Student;
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }

  public redirectToStudentList() {
    this.router.navigate(['/student/list']);
  }

  public deleteStudent() {
    const deleteUrl = `api/student/${this.student.id}`;
    this.repository.delete(deleteUrl)
      .subscribe(res => {
        $('#successModal').modal();
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }

}
