import {Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HttpService } from 'src/app/shared/httpService/http.service';
import {CoreService} from 'src/app/shared/core/core.service';
import { MatDialog } from '@angular/material/dialog';
import { UserAddEditComponent } from '../user-add-edit/user-add-edit.component';
import { core } from '@angular/compiler';


/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent  implements OnInit{
  displayedColumns: string[] = [
    'id',
    'nome',
    'email',
    'datanascimento',
    'genero',
    'morada',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private _dialog: MatDialog,
    private userService:  HttpService,
    private coreService: CoreService,
  ) {}

  ngOnInit(): void {
    this.getUsersList();
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: string) {
    this.userService.deleteUserById(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Employee deleted!', 'done');
        this.getUsersList();
      },
      error: console.log,
    });
  }
  
  getUsersList() {
    this.userService. getAllUsers().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  openAddEditForm() {
    const dialogRef = this._dialog.open(UserAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUsersList();
        }
      },
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(UserAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUsersList();
        }
      },
    });
  }

 
} 



