import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Student } from './../../_interfaces/student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  public listData: MatTableDataSource<any>;
  public displayedColumns: string[] = ['lastName', 'firstName', 'middleName', 'birthDate', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public searchKey: string;
  public students: Student[];
  public errorMessage = '';

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.getAllStudents();
  }

  public applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  public getAllStudents() {
    const apiAddress = 'api/student';
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.students = res as Student[];
      this.listData = new MatTableDataSource(this.students);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {
          return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
        });
      };
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    });
  }

  public getStudentSchools(row: any) {
    const detailsUrl = `/student/details/${row.id}`;
    this.router.navigate([detailsUrl]);
  }

  public onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  public redirectToCreatePage() {
    const createUrl = `/student/create/`;
    this.router.navigate([createUrl]);
  }

  public redirectToUpdatePage(row: any) {
    const updateUrl = `/student/update/${row.id}`;
    this.router.navigate([updateUrl]);
  }

  public redirectToDeletePage(row: any) {
    const deleteUrl = `/student/delete/${row.id}`;
    this.router.navigate([deleteUrl]);
  }

}
