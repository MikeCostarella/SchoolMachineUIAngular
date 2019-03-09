import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorHandlerService } from './../../../../shared/services/error-handler.service';
import { RepositoryService } from './../../../../shared/services/repository.service';
import { Router } from '@angular/router';

import { StudentForCreation } from './../../../../_interfaces/student-for-creation.model';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {

  public errorMessage = '';
  public formGroup: FormGroup;
  public formTitle = 'Create new student';

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      middleName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      birthDate: new FormControl('', [Validators.required])
    });
  }

  public createFormObject(formGroupValue) {
    if (this.formGroup.valid) {
      this.executeFormObjectCreation(formGroupValue);
    }
  }

  public executeDatePicker(event) {
    this.formGroup.patchValue({ birthDate: event });
  }

  private executeFormObjectCreation(formGroupValue) {
    const student: StudentForCreation = {
      firstName: formGroupValue.firstName,
      middleName: formGroupValue.middleName,
      lastName: formGroupValue.lastName,
      birthDate: formGroupValue.birthDate
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

  public hasError(controlName: string, errorName: string) {
    if (this.formGroup.controls[controlName].hasError(errorName)) {
      return true;
    }
    return false;
  }

  public redirectToList() {
    this.router.navigate(['/student/list']);
  }

  public validateControl(controlName: string) {
    if (this.formGroup.controls[controlName].invalid && this.formGroup.controls[controlName].touched) {
      return true;
    }
    return false;
  }

}
