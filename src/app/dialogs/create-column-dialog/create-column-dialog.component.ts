import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateBoardDialogComponent } from '../create-board-dialog/create-board-dialog.component';
import { BoardService, Column } from 'src/app/services/board/board.service';

@Component({
    selector: 'app-create-column-dialog',
    templateUrl: './create-column-dialog.component.html',
    styleUrls: ['./create-column-dialog.component.scss']
})
export class CreateColumnDialogComponent implements OnInit {
    columnForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<CreateBoardDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private boardService: BoardService,
        private formBuilder: FormBuilder
    ) {
        this.columnForm = this.formBuilder.group({
            title: ['', Validators.required]
        });
    }

    ngOnInit() {}

    createColumn() {
        const column: Column = {
            name: this.columnForm.value.title,
            board_id: this.data.boardId
        };
        this.boardService.createColumn(column).then(result => {
            this.dialogRef.close(result);
        });
    }
}
