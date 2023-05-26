import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserData } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-bulk-action',
  templateUrl: './bulk-action.component.html',
  styleUrls: ['./bulk-action.component.scss']
})
export class BulkActionComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserData[],
    private userService:UserService,
    private dialogRef:MatDialogRef<BulkActionComponent>
  ) { }

  ngOnInit(): void {
  }

  disableSelected(){
    this.userService.BulkDisable(this.data)
    this.dialogRef.close(false);
  }
  enableSelected(){
    this.userService.BulkEnable(this.data)
    this.dialogRef.close(false)
  }

  deleteSelected(){
    this.userService.bulkDelete(this.data)
    this.dialogRef.close(true)
  }

}
