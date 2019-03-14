import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../../../../_services/error-handler.service';
import { RepositoryService } from '../../../../_services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { School } from './../../../../_interfaces/school.model';

@Component({
  selector: 'app-school-update',
  templateUrl: './school-update.component.html',
  styleUrls: ['./school-update.component.css']
})
export class SchoolUpdateComponent implements OnInit {

  public errorMessage = '';
  public formObject: School;
  public formGroup: FormGroup;
  public formTitle = 'Update school';

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

    const apiUrl = `api/school/UpdateSchool?id=${this.formObject.id}`;
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
    const formObjectByIdUrl = `api/school/${formObjectId}`;
    this.repository.getData(formObjectByIdUrl)
      .subscribe(res => {
        this.formObject = res as School;
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
    this.router.navigate(['/school/list']);
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
