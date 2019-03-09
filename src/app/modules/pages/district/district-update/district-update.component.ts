import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorHandlerService } from './../../../../shared/services/error-handler.service';
import { RepositoryService } from './../../../../shared/services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';

import { District } from './../../../../_interfaces/district.model';

@Component({
  selector: 'app-district-update',
  templateUrl: './district-update.component.html',
  styleUrls: ['./district-update.component.css']
})
export class DistrictUpdateComponent implements OnInit {

  public errorMessage = '';
  public formObject: District;
  public formGroup: FormGroup;
  public formTitle = 'Update district';

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)])
    });

    this.getFormObjectById();
  }

  private executeFormObjectUpdate(formObjectValue) {
    this.formObject.name = formObjectValue.name;

    const apiUrl = `api/district/${this.formObject.id}`;
    this.repository.update(apiUrl, this.formObject)
      .subscribe(res => {
        $('#successModal').modal();
      },
      (error => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
    );
  }

  private getFormObjectById() {
    const formObjectId: string = this.activeRoute.snapshot.params.id;
    const formObjectByIdUrl = `api/district/${formObjectId}`;
    this.repository.getData(formObjectByIdUrl)
      .subscribe(res => {
        this.formObject = res as District;
        this.formGroup.patchValue(this.formObject);
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }

  public hasError(controlName: string, errorName: string) {
    return (this.formGroup.controls[controlName].hasError(errorName));
  }

  public redirectToList() {
    this.router.navigate(['/district/list']);
  }

  public updateFormObject(formObjectValue) {
    if (this.formGroup.valid) {
      this.executeFormObjectUpdate(formObjectValue);
    }
  }

  public validateControl(controlName: string) {
    return (this.formGroup.controls[controlName].invalid && this.formGroup.controls[controlName].touched);
  }

}
