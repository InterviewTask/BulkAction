import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudRoutingModule } from './crud-routing.module';
import { CrudComponent } from './crud.component';
import { TableComponent } from './components/table/table.component';
import { SharedModule } from 'src/app/shared';
import { AddUserComponent } from './components/add-user/add-user.component';


@NgModule({
  declarations: [
    CrudComponent,
    TableComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    CrudRoutingModule,
    SharedModule
  ]
})
export class CrudModule { }
