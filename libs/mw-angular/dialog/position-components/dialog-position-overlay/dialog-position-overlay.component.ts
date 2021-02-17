import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogState } from '../../entities/dialog-state';
import { DialogPositionBaseComponent } from '../dialog-position-base.component';

const animationTiming = '200ms ease-in';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './dialog-position-overlay.component.html',
	styleUrls: ['./dialog-position-overlay.component.scss'],
	animations: [
		trigger('openClose', [
			state(DialogState.OPENED, style({ transform: 'translateX(0%)' })),
			state(DialogState.CLOSED, style({ transform: 'translateX(100%)' })),
			transition(`void => ${DialogState.OPENED}`, [
				style({ transform: 'translateX(100%)' }),
				animate(animationTiming),
			]),
			transition(`${DialogState.OPENED} => ${DialogState.CLOSED}`, [
				animate(animationTiming),
			]),
		]),
	],
})
export class DialogPositionOverlayComponent extends DialogPositionBaseComponent {
}
