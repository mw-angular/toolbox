import { OverlayRef } from '@angular/cdk/overlay';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { DialogState } from './dialog-state';

export class DialogRef {
	private resultSubject = new ReplaySubject<any>();
	private stateSubject = new BehaviorSubject<DialogState>(DialogState.OPENED);
	private finishAnimationSubject = new Subject<DialogState>();

	constructor(private overlayRef: OverlayRef) {
	}

	close(result?: any): void {
		this.finishAnimationSubject
			.pipe(
				filter((state: DialogState) => state === DialogState.CLOSED),
				take(1),
			)
			.subscribe(() => {
				this.overlayRef.detach();
				this.overlayRef.dispose();
				this.resultSubject.next(result);
			});

		this.stateSubject.next(DialogState.CLOSED);
	}

	onBackdropClick(): Observable<MouseEvent> {
		return this.overlayRef.backdropClick();
	}

	onClose<T>(): Observable<T> {
		return this.resultSubject.asObservable();
	}

	getState(): Observable<DialogState> {
		return this.stateSubject.asObservable();
	}

	setFinishAnimation(state: DialogState): void {
		this.finishAnimationSubject.next(state);
	}
}
