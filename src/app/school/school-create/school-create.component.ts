import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SchoolForCreation } from './../../_interfaces/school-for-creation.model';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-school-create',
  templateUrl: './school-create.component.html',
  styleUrls: ['./school-create.component.css']
})
export class SchoolCreateComponent implements OnInit {

  public errorMessage = '';
  public schoolForm: FormGroup;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.schoolForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  public validateControl(controlName: string) {
    if (this.schoolForm.controls[controlName].invalid && this.schoolForm.controls[controlName].touched) {
      return true;
    }
    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.schoolForm.controls[controlName].hasError(errorName)) {
      return true;
    }
    return false;
  }

  public createSchool(schoolFormValue) {
    if (this.schoolForm.valid) {
      this.executeSchoolCreation(schoolFormValue);
    }
  }

  private executeSchoolCreation(schoolFormValue) {
    const school: SchoolForCreation = {
      name: schoolFormValue.name
    };

    const apiUrl = 'api/school';
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

  public redirectToSchoolList() {
    this.router.navigate(['/school/list']);
  }

}
