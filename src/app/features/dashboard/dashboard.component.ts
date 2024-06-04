import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { TitleCardService } from '../../core/services/title-card.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DatePipe, SlicePipe, MaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {

  public dataSource: MatTableDataSource<IUser> = new MatTableDataSource();
  public displayedColumns: string[] = ['image', 'name', 'role', 'email', 'password', 'date_created', 'actions'];
  private suscription !: Subscription;

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(
    private usersControlService: UsersControlService,
    private storageService: StorageService,
    private titleCardService: TitleCardService,
    private unsubscriptionService: UnsubscriptionService,
    private sweetAlertService: SweetalertService,
    private router: Router
  ) {
    this.titleCardService.titleCard = "Users list";
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goToUserForm(id?: number) {
    if (id) {
      this.storageService.setSessionItem("iduser", id);
      this.router.navigate(["/edit-user"]);
    } else {
      this.router.navigate(["/new-user"]);
    }
  }

}
