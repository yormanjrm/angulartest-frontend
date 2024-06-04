import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { UsersControlService } from '../../api/services/users-control.service';
import { UnsubscriptionService } from '../../core/services/unsubscription.service';
import { Subscription } from 'rxjs';
import { IApiResponse } from '../../core/models/api-response.model';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from '../../api/models/user.model';
import { SweetalertService } from '../../shared/services/sweetalert.service';
import { DatePipe, SlicePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { StorageService } from '../../core/services/storage.service';
import { Router } from '@angular/router';
import { IToken } from '../../api/models/token.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DatePipe, SlicePipe, MaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {

  public dataSource: MatTableDataSource<IUser> = new MatTableDataSource();
  public currentUser: IToken;
  public displayedColumns: string[] = ['image', 'name', 'role', 'email', 'password', 'date_created', 'actions'];
  private suscription: Subscription = new Subscription();

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(
    private usersControlService: UsersControlService,
    private storageService: StorageService,
    private unsubscriptionService: UnsubscriptionService,
    private sweetAlertService: SweetalertService,
    private router: Router
  ) { 
    this.currentUser = this.storageService.getSessionItem("token");
    if(this.currentUser.role === "RECEP"){
      this.displayedColumns.pop();
    }
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.unsubscriptionService.unsubscription(this.suscription);
  }

  loadUsers(): void {
    this.suscription = this.usersControlService.getAllUsers().subscribe({
      next: (response: IApiResponse) => {
        this.dataSource = new MatTableDataSource(response.data);
        this.dataSource.paginator = this.paginator;
        if (response.code === 204) {
          this.sweetAlertService.basicAlert("Empty list", response.message, "info");
        }
      }, error: (err: IApiResponse) => {
        if (err.code != 401) {
          this.sweetAlertService.basicAlert("Error", err.message, "error");
        }
      }
    });
  }

  goToUserForm(id?: number) {
    if (id) {
      this.storageService.setSessionItem("iduser", id);
      this.router.navigate(["/edit-user"]);
    } else {
      this.router.navigate(["/new-user"]);
    }
  }

  deleteUser(id: number){
    this.suscription = this.usersControlService.deleteUser(id).subscribe({
      next: (response: IApiResponse) => {
        this.sweetAlertService.basicAlert("Success", response.message, "success");
        this.loadUsers();
      }, error: (err: IApiResponse) => {
        this.sweetAlertService.basicAlert("Error", err.message, "error");
      }
    });
  }

}
