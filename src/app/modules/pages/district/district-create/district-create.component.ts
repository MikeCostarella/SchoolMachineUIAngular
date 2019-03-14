import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../../../../_services/error-handler.service';
import { RepositoryService } from '../../../../_services/repository.service';
import { Router } from '@angular/router';

import { DistrictForCreation } from './../../../../_interfaces/district-for-creation.model';

@Component({
  selector: 'app-district-create',
  templateUrl: './district-create.component.html',
  styleUrls: ['./district-create.component.css']
})
export class DistrictCreateComponent implements OnInit {

  public errorMessage = '';
  public formGroup: FormGroup;
  public formTitle = 'Create new district';

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
    const school: DistrictForCreation = {
      name: formGroupValue.name
    };

    const apiUrl = 'api/district/CreateDistrict';
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
    this.router.navigate(['/district/list']);
  }

  public validateControl(controlName: string) {
    if (this.formGroup.controls[controlName].invalid && this.formGroup.controls[controlName].touched) {
      return true;
    }
    return false;
  }

}
