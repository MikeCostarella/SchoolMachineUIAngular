import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../../../../_services/error-handler.service';
import { RepositoryService } from '../../../../_services/repository.service';
import { Router } from '@angular/router';

import { SchoolForCreation } from './../../../../_interfaces/school-for-creation.model';

@Component({
  selector: 'app-school-create',
  templateUrl: './school-create.component.html',
  styleUrls: ['./school-create.component.css']
})
export class SchoolCreateComponent implements OnInit {

  public errorMessage = '';
  public formGroup: FormGroup;
  public formTitle = 'Create new school';

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  public createFormObject(formGroupValue) {
    if (this.formGroup.valid) {
      this.executeFormObjectCreation(formGroupValue);
    }
  }

  private executeFormObjectCreation(formGroupValue) {
    const school: SchoolForCreation = {
      name: formGroupValue.name
    };

    const apiUrl = 'api/school/CreateSchool';
    this.repository.create(apiUrl, school)
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
    this.router.navigate(['/school/list']);
  }

  public validateControl(controlName: string) {
    if (this.formGroup.controls[controlName].invalid && this.formGroup.controls[controlName].touched) {
      return true;
    }
    return false;
  }

}
