import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from './../../_interfaces/student.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css'],
  providers: [DatePipe]
})
export class StudentUpdateComponent implements OnInit {
  public errorMessage = '';
  public student: Student;
  public studentForm: FormGroup;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
              private activeRoute: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit() {
    this.studentForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      middleName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      birthDate: new FormControl('', [Validators.required])
    });

    this.getStudentById();
  }

  private getStudentById() {
    const studentId: string = this.activeRoute.snapshot.params.id;
    const studentByIdUrl = `api/student/${studentId}`;

    this.repository.getData(studentByIdUrl)
      .subscribe(res => {
        this.student = res as Student;
        this.studentForm.patchValue(this.student);
        $('#birthDate').val(this.datePipe.transform(this.student.birthDate, 'MM/dd/yyyy'));
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }

  public validateControl(controlName: string) {
    if (this.studentForm.controls[controlName].invalid && this.studentForm.controls[controlName].touched) {
      return true;
    }
    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.studentForm.controls[controlName].hasError(errorName)) {
      return true;
    }
    return false;
  }

  public executeDatePicker(event: any) {
    this.studentForm.patchValue({ birthDate: event });
  }

  public redirectToStudentList() {
    this.router.navigate(['/student/list']);
  }

  public updateOwner(studentFormValue) {
    if (this.studentForm.valid) {
      this.executeStudentUpdate(studentFormValue);
    }
  }

  private executeStudentUpdate(studentFormValue) {
    this.student.firstName = studentFormValue.firstName;
    this.student.middleName = studentFormValue.middleName;
    this.student.lastName = studentFormValue.lastName;
    this.student.birthDate = studentFormValue.birthDate;

    const apiUrl = `api/student/${this.student.id}`;
    this.repository.update(apiUrl, this.student)
      .subscribe(res => {
        $('#successModal').modal();
      },
      (error => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
    );
  }

}
