import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorHandlerService } from './../../../../shared/services/error-handler.service';
import { RepositoryService } from './../../../../shared/services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { School } from './../../../../_interfaces/school.model';

@Component({
  selector: 'app-school-update',
  templateUrl: './school-update.component.html',
  styleUrls: ['./school-update.component.css']
})
export class SchoolUpdateComponent implements OnInit {

  public errorMessage = '';
  public school: School;
  public schoolForm: FormGroup;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.schoolForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)])
    });

    this.getSchoolById();
  }

  private getSchoolById() {
    const schoolId: string = this.activeRoute.snapshot.params.id;

    const schoolByIdUrl = `api/school/${schoolId}`;

    this.repository.getData(schoolByIdUrl)
      .subscribe(res => {
        this.school = res as School;
        this.schoolForm.patchValue(this.school);
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
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

  public redirectToSchoolList() {
    this.router.navigate(['/school/list']);
  }

  public updateOwner(schoolFormValue) {
    if (this.schoolForm.valid) {
      this.executeSchoolUpdate(schoolFormValue);
    }
  }

  private executeSchoolUpdate(schoolFormValue) {
    this.school.name = schoolFormValue.name;

    const apiUrl = `api/school/${this.school.id}`;
    this.repository.update(apiUrl, this.school)
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
