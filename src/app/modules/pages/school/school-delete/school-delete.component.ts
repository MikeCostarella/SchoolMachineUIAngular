import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from '../../../../_services/error-handler.service';
import { RepositoryService } from '../../../../_services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';

import { School } from './../../../../_interfaces/school.model';

@Component({
  selector: 'app-school-delete',
  templateUrl: './school-delete.component.html',
  styleUrls: ['./school-delete.component.css']
})
export class SchoolDeleteComponent implements OnInit {

  public errorMessage = '';
  public formObject: School;
  public formTitle = 'Delete school';

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getFormObjectById();
  }

  public deleteFormObject() {
    const deleteUrl = `api/v1/school/${this.formObject.id}`;
    this.repository.delete(deleteUrl)
      .subscribe(res => {
        $('#successModal').modal();
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }

  private getFormObjectById() {
    const formObjectId: string = this.activeRoute.snapshot.params.id;
    const formObjectByIdUrl = `api/v1/school/${formObjectId}`;
    this.repository.getData(formObjectByIdUrl)
      .subscribe(res => {
        this.formObject = res as School;
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }

  public redirectToList() {
    this.router.navigate(['/school/list']);
  }

}
