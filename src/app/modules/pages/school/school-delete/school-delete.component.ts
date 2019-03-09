import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from './../../../../shared/services/error-handler.service';
import { RepositoryService } from './../../../../shared/services/repository.service';
import { School } from './../../../../_interfaces/school.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-school-delete',
  templateUrl: './school-delete.component.html',
  styleUrls: ['./school-delete.component.css']
})
export class SchoolDeleteComponent implements OnInit {
  public errorMessage = '';
  public school: School;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getSchoolById();
  }

  private getSchoolById() {
    const schoolId: string = this.activeRoute.snapshot.params.id;
    const schoolByIdUrl = `api/school/${schoolId}`;

    this.repository.getData(schoolByIdUrl)
      .subscribe(res => {
        this.school = res as School;
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }

  public redirectToSchoolList() {
    this.router.navigate(['/school/list']);
  }

  public deleteSchool() {
    const deleteUrl = `api/school/${this.school.id}`;
    this.repository.delete(deleteUrl)
      .subscribe(res => {
        $('#successModal').modal();
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }

}
