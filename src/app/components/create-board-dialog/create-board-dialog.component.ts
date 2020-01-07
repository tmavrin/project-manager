import { Component, OnInit, Inject } from '@angular/core';
import { BoardService } from 'src/app/services/board/board.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
    MatDialog
} from '@angular/material/dialog';
import { TicketDialogComponent } from '../ticket-dialog/ticket-dialog.component';

@Component({
    selector: 'app-create-board-dialog',
    templateUrl: './create-board-dialog.component.html',
    styleUrls: ['./create-board-dialog.component.scss']
})
export class CreateBoardDialogComponent implements OnInit {
    boardForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<TicketDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private boardService: BoardService,
        private formBuilder: FormBuilder
    ) {
        this.boardForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['']
        });
    }

    ngOnInit() {}

    close() {
        this.dialogRef.close();
    }

    createBoard() {
        const title = this.boardForm.getRawValue().title;
        const description = this.boardForm.getRawValue().description;
        this.boardService.createBoard(title, description).then(data => {
            this.close();
        });
    }
}
