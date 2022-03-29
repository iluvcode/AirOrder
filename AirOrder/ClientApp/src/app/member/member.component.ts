import { Component, OnInit } from '@angular/core';
import { Member } from '../shared/member.model';
import { MembersService } from '../shared/member.service';

@Component({
  selector: 'app-members',
  templateUrl: './member.component.html',
  styles: [
  ]
})
export class MemberComponent implements OnInit {

  constructor(public service: MembersService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: Member) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    //this.service.deleteMember(id)
    //  .subscribe(
    //    res => {
    //      this.service.refreshList();
    //    },
    //    err => { console.log(err) }
    //  )
  }
}
