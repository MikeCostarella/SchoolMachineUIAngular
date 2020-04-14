import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from '../../../../_services/error-handler.service';
import { RepositoryService } from '../../../../_services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';

import { District } from './../../../../_interfaces/district.model';

@Component({
  selector: 'app-district-delete',
  templateUrl: './district-delete.component.html',
  styleUrls: ['./district-delete.component.css']
})
export class DistrictDeleteComponent implements OnInit {

  public errorMessage = '';
  public formObject: District;
  public formTitle = 'Delete district';

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getFormObjectById();
  }

  public deleteFormObject() {
    const deleteUrl = `api/v1/district/${this.formObject.id}`;
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
    const formObjectByIdUrl = `api/v1/district/${formObjectId}`;
    this.repository.getData(formObjectByIdUrl)
      .subscribe(res => {
        this.formObject = res as District;
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }

  public redirectToList() {
    this.router.navigate(['/district/list']);
  }

}
