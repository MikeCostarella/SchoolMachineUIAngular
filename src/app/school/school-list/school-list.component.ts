import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';

import { MatFormField, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { School } from './../../_interfaces/school.model';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css']
})
export class SchoolListComponent implements OnInit {
  public listData: MatTableDataSource<any>;
  public displayedColumns: string[] = ['name', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public searchKey: string;
  public schools: School[];
  public errorMessage = '';

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.getAllSchools();
  }

  public applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  public getAllSchools() {
    const apiAddress = 'api/school';
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.schools = res as School[];
      this.listData = new MatTableDataSource(this.schools);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    });
  }

  public getSchoolStudents(id: string) {
    const schoolStudentsUrl = `/school/details/${id}`;
    this.router.navigate([schoolStudentsUrl]);
  }

   public onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  public redirectToUpdatePage(id: string) {
    const updateUrl = `/school/update/${id}`;
    this.router.navigate([updateUrl]);
  }

  public redirectToDeletePage(id: string) {
    const deleteUrl = `/school/delete/${id}`;
    this.router.navigate([deleteUrl]);
  }

}
