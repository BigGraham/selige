import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../../core/core.module';
import { RouterModule } from '@angular/router';
import { ADMIN_ROUTES } from './admin.routes';
import { AdminComponent } from './admin.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { EventFormComponent } from './event-form/event-form.component';
import { DeleteEventComponent } from './update-event/delete-event/delete-event.component';
import { ViewEventComponent } from './view-event/view-event.component';
import { ReadEventComponent } from './update-event/read-event/read-event.component';
import { AuditEventComponent } from './update-event/audit-event/audit-event.component';
import { VerifyEventComponent } from './update-event/verify-event/verify-event.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(ADMIN_ROUTES)
  ],
  declarations: [
    AdminComponent,
    CreateEventComponent,
    UpdateEventComponent,
    EventFormComponent,
    DeleteEventComponent,
    ViewEventComponent,
    ReadEventComponent,
    AuditEventComponent,
    VerifyEventComponent
  ]
})
export class AdminModule { }
