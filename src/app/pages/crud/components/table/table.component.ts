import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogClose, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddUserComponent } from '../add-user/add-user.component';
import { SelectionModel } from '@angular/cdk/collections';
import { UserService } from '../../services/user.service';
import { UserData } from '../../models/user.model';
import { BulkActionComponent } from '../bulk-action/bulk-action.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})


export class TableComponent implements OnInit,AfterViewInit  {

  displayedColumns: string[] = ['select','id', 'email', 'status', 'access','date','action'];
  dataSource!: MatTableDataSource<UserData>;
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog : MatDialog,
    private userService: UserService
  ) {
  }

  getUserList(){
    this.userService.getUser().subscribe(res=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getUserList();

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  bulkAssgin(){
    const config : MatDialogConfig ={
      panelClass: 'app-full-bleed-dialog',
      width:'30%'
    }
    const ref = this.dialog.open(AddUserComponent,config)

    ref.afterClosed().subscribe(res=>{
      console.log(res);
      this.userService.createBulk(res)
      this.getUserList();
    })
  }
  editItem(row:UserData){
    const config : MatDialogConfig ={
      panelClass: 'app-full-bleed-dialog',
      width:'30%',
      data: row
    }
    const ref = this.dialog.open(AddUserComponent,config)

    ref.afterClosed().subscribe(res=>{
      if(res){
        this.userService.editUser(res)
        this.getUserList();
      }
    })
  }

  bulkAction(){
    if(this.selection.selected.length < 1){
      return
    }

    const config : MatDialogConfig ={
      panelClass: 'app-full-bleed-dialog',
      width:'30%',
      data: this.selection.selected
    }
    const ref = this.dialog.open(BulkActionComponent,config)

    ref.afterClosed().subscribe(res=>{
      this.getUserList();
      this.selection.clear();

    })
  }



}


