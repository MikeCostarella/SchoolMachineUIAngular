import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from './../../../../shared/services/error-handler.service';
import { RepositoryService } from './../../../../shared/services/repository.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { District } from './../../../../_interfaces/district.model';

@Component({
  selector: 'app-district-list',
  templateUrl: './district-list.component.html',
  styleUrls: ['./district-list.component.css']
})
export class DistrictListComponent implements OnInit {

  public listData: MatTableDataSource<any>;
  public displayedColumns: string[] = ['name', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public searchKey: string;
  public districts: District[];
  public errorMessage = '';

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.getAllDistricts();
  }

  public applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  public getAllDistricts() {
    const apiAddress = 'api/district';
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.districts = res as District[];
      this.listData = new MatTableDataSource(this.districts);
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

  public getDistrictSchools(row: any) {
    const districtSchoolsUrl = `/district/details/${row.id}`;
    this.router.navigate([districtSchoolsUrl]);
  }

  public onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  public redirectToCreatePage() {
    const createUrl = `/district/create/`;
    this.router.navigate([createUrl]);
  }

  public redirectToUpdatePage(row: any) {
    const updateUrl = `/district/update/${row.id}`;
    this.router.navigate([updateUrl]);
  }

  public redirectToDeletePage(row: any) {
    const deleteUrl = `/district/delete/${row.id}`;
    this.router.navigate([deleteUrl]);
  }

}
