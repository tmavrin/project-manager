import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateBoardDialogComponent } from '../create-board-dialog/create-board-dialog.component';
import { BoardService, Column } from 'src/app/services/board/board.service';

@Component({
    selector: 'app-add-user-dialog',
    templateUrl: './add-user-dialog.component.html',
    styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {
    userForm: FormGroup;

    requestResponse = true;

    constructor(
        public dialogRef: MatDialogRef<CreateBoardDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private boardService: BoardService,
        private formBuilder: FormBuilder
    ) {
        this.userForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])]
        });
        this.userForm.valueChanges.subscribe(() => {
            this.requestResponse = true;
        });
    }

    ngOnInit() {}

    addUser() {
        this.boardService.addUserToBoard(this.userForm.getRawValue().email, this.data.boardId).then((result: any) => {
            if (result.status === 'success') {
                this.close();
            } else {
                this.requestResponse = false;
            }
        });
    }

    close() {
        this.dialogRef.close();
    }
}
