import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { DialogState } from '../../entities/dialog-state';
import { DialogPositionBaseComponent } from '../dialog-position-base.component';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './dialog-position-modal.component.html',
	styleUrls: ['./dialog-position-modal.component.scss'],
})
export class DialogPositionModalComponent extends DialogPositionBaseComponent implements OnInit {
	ngOnInit() {
		this.state$
			.pipe(takeUntil(this.destroy$$))
			.subscribe((state: DialogState) => this.dialogRef.setFinishAnimation(state));
	}
}
