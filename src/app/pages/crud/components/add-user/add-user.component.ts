import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserData } from '../../models/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  form!:FormGroup
  constructor(
    private fb:FormBuilder,
    private dialogRef:MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserData,
  ) { }

  ngOnInit(): void {
    this.creteForm(this.data);
    console.log(this.data);

  }
  creteForm(item?:UserData){
    this.form=this.fb.group({
      id:    [item&& item?.id?item.id:null],
      email: [item&& item?.email?item.email:null,[Validators.required,Validators.email]],
      status:[item&& item?.status?item.status:'Enable',[]],
      access:[item&& item?.access?item.access:'User',[]],
      count: [1,[Validators.min(1),Validators.max(20)]],
    })
  }
  handleAction(){
    if(this.form.invalid){
      return
    }
    console.log(this.form.value);
    this.dialogRef.close(this.form.value)
  }

}
