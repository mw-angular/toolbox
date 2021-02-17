import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { DIALOG_DATA, DialogData } from '../../entities/dialog-data';
import { DialogRef } from '../../entities/dialog-ref';
import { DialogConfirmDeletionData } from './dialog-confirm-deletion-data';

@Component({
	selector: 'vs-stellar-dialog-confirm-deletion',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './dialog-confirm-deletion.component.html',
	styleUrls: ['./dialog-confirm-deletion.component.scss']
})
export class DialogConfirmDeletionComponent {
	constructor(
		public dialogRef: DialogRef,
		@Inject(DIALOG_DATA) public data: DialogData<DialogConfirmDeletionData>
	) {}
}
