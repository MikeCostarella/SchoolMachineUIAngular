import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../../../../_services/error-handler.service';
import { RepositoryService } from '../../../../_services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from './../../../../_interfaces/student.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css'],
  providers: [DatePipe]
})
export class StudentUpdateComponent implements OnInit {

  public errorMessage = '';
  public formObject: Student;
  public formGroup: FormGroup;
  public formTitle = 'Update student';

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
              private activeRoute: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      middleName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      birthDate: new FormControl('', [Validators.required])
    });
    this.getFocusObjectById();
  }

  public executeDatePicker(event: any) {
    this.formGroup.patchValue({ birthDate: event });
  }

  private executeFocusObjectUpdate(formObjectValue) {
    this.formObject.firstName = formObjectValue.firstName;
    this.formObject.middleName = formObjectValue.middleName;
    this.formObject.lastName = formObjectValue.lastName;
    this.formObject.birthDate = formObjectValue.birthDate;

    const apiUrl = `api/student/UpdateStudent?id=${this.formObject.id}`;
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

  private getFocusObjectById() {
    const formObjectId: string = this.activeRoute.snapshot.params.id;
    const formObjectByIdUrl = `api/student/${formObjectId}`;
    this.repository.getData(formObjectByIdUrl)
      .subscribe(res => {
        this.formObject = res as Student;
        this.formGroup.patchValue(this.formObject);
        $('#birthDate').val(this.datePipe.transform(this.formObject.birthDate, 'MM/dd/yyyy'));
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
    this.router.navigate(['/student/list']);
  }

  public updateFormObject(formGroupValue) {
    if (this.formGroup.valid) {
      this.executeFocusObjectUpdate(formGroupValue);
    }
  }

  public validateControl(controlName: string) {
    return (this.formGroup.controls[controlName].invalid && this.formGroup.controls[controlName].touched);
  }

}
