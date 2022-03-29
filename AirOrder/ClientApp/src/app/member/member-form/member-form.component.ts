import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../shared/member.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Member } from '../../shared/member.model';
@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styles: [
  ]
})
export class MemberFormComponent implements OnInit {
  memberform: FormGroup;
  constructor(public service: MembersService, private fb: FormBuilder,) {

    this.memberform = this.fb.group({
      FirstName: ["", Validators.required],
      MiddleName: ["", Validators.required],
      LastName: ["", Validators.required]
    });

  }
  ngOnInit(): void {
  }
  onSubmit() {
    console.log(this.memberform.controls["FirstName"].value);
    var member = new Member();
    member.firstName = this.memberform.controls["FirstName"].value;
    member.lastName = this.memberform.controls["LastName"].value;
    member.middleName = this.memberform.controls["MiddleName"].value
    this.insertRecord(member);
    //if (this.service.formData.id == 0) //we will use the id as identifier for updating or insertion
      //this.insertRecord(form);
    //else
      //this.updateRecord(form);
  }
  insertRecord(customerinfo: Member) {
    this.service.postMember(customerinfo).subscribe(
      res => {
        this.resetForm();
        this.service.refreshList();
      }
      
    );
  }
  updateRecord() {
    this.service.putMember().subscribe(
      res => {
        this.resetForm();
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }
  resetForm() {
    //form.form.reset();
    this.memberform.reset();
    this.service.formData = new Member();
  }
}
