import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentForCreation } from './../../_interfaces/student-for-creation.model';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {

  public errorMessage = '';
  public studentForm: FormGroup;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.studentForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      middleName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      birthDate: new FormControl('', [Validators.required])
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

  public executeDatePicker(event) {
    this.studentForm.patchValue({ birthDate: event });
  }

  public createStudent(studentFormValue) {
    if (this.studentForm.valid) {
      this.executeStudentCreation(studentFormValue);
    }
  }

  private executeStudentCreation(studentFormValue) {
    const student: StudentForCreation = {
      firstName: studentFormValue.firstName,
      middleName: studentFormValue.middleName,
      lastName: studentFormValue.lastName,
      birthDate: studentFormValue.birthDate
    };

    const apiUrl = 'api/student';
    this.repository.create(apiUrl, student)
      .subscribe(res => {
        $('#successModal').modal();
      },
      (error => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
    );
  }

  public redirectToStudentList() {
    this.router.navigate(['/student/list']);
  }

}
