import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { user_I } from '../interfaces/user.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { UserService } from '../services/user.service';
import { SnackBarService } from '../shared/services/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['users.component.scss'],
})
export class UsersComponent implements AfterViewInit, OnInit {
  private trigger = new BehaviorSubject<any>(null);
  public readonly displayedColumns: string[] = [
    'username',
    'firstname',
    'lastname',
    'created_at',
    'updated_at',
    'action',
  ];
  public dataSource = new MatTableDataSource<user_I>([]);

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  filter = new FormControl('');

  constructor(
    private usrService: UserService,
    private snackbar: SnackBarService,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.trigger
      .pipe(switchMap((result: user_I[]) => this.usrService.getAll()))
      .subscribe((result) => {
        this.dataSource.data = result;
      });
  }

  update(usr?: user_I) {
    const subscription = this.dialog
      .open(AddComponent, {
        data: { action: usr ? 'edit' : 'add', data: usr },
        width: '750px',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === true) {
          this.trigger.next(null);
        }
        subscription.unsubscribe();
      });
  }

  remove(id: number) {
    this.dialog
      .open(DeleteComponent, {
        data: {
          message: 'Etes-vous sur de supprimer cet utilisateur ?',
        },
        width: '600px',
      })
      .afterClosed()
      .pipe(
        map((result) => {
          if (result === true) {
            this.usrService.remove(id).subscribe((result) => {
              if (result && result.message) {
                this.trigger.next(null);
                this.snackbar.sucess(result.message);
              }
            });
          }
        })
      )
      .subscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
