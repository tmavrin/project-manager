import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/user/auth.service';

@Component({
  selector: 'app-user-selection-dialog',
  templateUrl: './user-selection-dialog.component.html',
  styleUrls: ['./user-selection-dialog.component.scss']
})
export class UserSelectionDialogComponent implements OnInit {
  users: User[] = [
    {
      uid: 'user_uid1',
      name: 'username1',
      email: 'email1'
    },
    {
      uid: 'user_uid2',
      name: 'username2',
      email: 'email2'
    },
    {
      uid: 'user_uid3',
      name: 'username3',
      email: 'email3'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
