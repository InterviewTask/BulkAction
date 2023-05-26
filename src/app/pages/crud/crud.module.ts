import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudRoutingModule } from './crud-routing.module';
import { CrudComponent } from './crud.component';
import { TableComponent } from './components/table/table.component';
import { SharedModule } from 'src/app/shared';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { BulkActionComponent } from './components/bulk-action/bulk-action.component';


@NgModule({
  declarations: [
    CrudComponent,
    TableComponent,
    AddUserComponent,
    BulkActionComponent
  ],
  imports: [
    CommonModule,
    CrudRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers:[
    UserService
  ]
})
export class CrudModule { }
