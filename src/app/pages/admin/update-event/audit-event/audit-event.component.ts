// src/app/pages/admin/update-event/audit-event/audit-event.component.ts
import { Component, OnDestroy, Input } from '@angular/core';
//import { EventModel } from './../../../../core/models/event.model';
import { Subscription } from 'rxjs';
import { ApiService } from './../../../../core/api.service';
import { Router } from '@angular/router';

// new ones
import { expandCollapse } from './../../../../core/expand-collapse.animation';
import { AuthService } from './../../../../auth/auth.service';
import { UtilsService } from './../../../../core/utils.service';
import { FilterSortService } from './../../../../core/filter-sort.service';
import { RsvpModel } from './../../../../core/models/rsvp.model';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-audit-event',
   animations: [expandCollapse],
  templateUrl: './audit-event.component.html',
  styleUrls: ['./audit-event.component.scss']
})
export class AuditEventComponent implements OnDestroy {
  //@Input() event: EventModel;
  //confirmDelete: string;
  //deleteSub: Subscription;
  //submitting: boolean;
  //error: boolean;
@Input() eventId: string;
  @Input() eventPast: boolean;
  rsvpsSub: Subscription;
  rsvps: RsvpModel[];
  loading: boolean;
  error: boolean;
  userRsvp: RsvpModel;
  totalAttending: number;
  footerTense: string;
  showEditForm: boolean;
  editBtnText: string;
  showAllRsvps = false;
  showRsvpsText = 'View Audit History';

constructor(
    public auth: AuthService,
    private api: ApiService,
    public utils: UtilsService,
    public fs: FilterSortService
  ) { }

  ngOnInit() {
    
    this._getRSVPs();
    
  }


  toggleShowRsvps() {
    this.showAllRsvps = !this.showAllRsvps;
    this.showRsvpsText = this.showAllRsvps ? 'Hide Audit History' : 'View Audit History';
  }

  private _getRSVPs() {
    this.loading = true;
    // Get RSVPs by event ID
    this.rsvpsSub = this.api
      .getRsvpsByEventId$(this.eventId)
      .subscribe(
        res => {
          this.rsvps = res;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }



  
  ngOnDestroy() {
    this.rsvpsSub.unsubscribe();
  }

}
