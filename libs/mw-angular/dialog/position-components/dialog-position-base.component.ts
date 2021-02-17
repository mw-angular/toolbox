import { ComponentPortal, ComponentType, PortalInjector } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, Inject, Injector, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DIALOG_COMPONENT } from '../entities/dialog-component';
import { DIALOG_DATA, DialogData } from '../entities/dialog-data';
import { DialogRef } from '../entities/dialog-ref';
import { DialogState } from '../entities/dialog-state';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '',
})
export class DialogPositionBaseComponent implements OnDestroy {
	state$: Observable<DialogState>;
	portal: ComponentPortal<any>;

	protected destroy$$ = new Subject<void>();

	constructor(
		private injector: Injector,
		public dialogRef: DialogRef,
		@Inject(DIALOG_COMPONENT) component: ComponentType<any>,
		@Inject(DIALOG_DATA) data: DialogData<any>
	) {
		this.state$ = this.dialogRef.getState();
		this.portal = new ComponentPortal(component, null, this.createInjector(dialogRef, data));
	}

	private createInjector(dialogRef: DialogRef, data: DialogData<any>): PortalInjector {
		const injectorTokens = new WeakMap();

		injectorTokens.set(DialogRef, dialogRef);
		injectorTokens.set(DIALOG_DATA, data);

		return new PortalInjector(this.injector, injectorTokens);
	}

	ngOnDestroy() {
		this.destroy$$.next();
		this.destroy$$.complete();
	}
}
