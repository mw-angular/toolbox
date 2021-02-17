import {
	Overlay,
	OverlayConfig,
	OverlayRef,
	PositionStrategy,
	ScrollStrategy
} from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector, ComponentType } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { DIALOG_COMPONENT } from '../entities/dialog-component';
import { DialogPositionCenterComponent } from '../position-components/dialog-position-center/dialog-position-center.component';
import { DialogPositionModalComponent } from '../position-components/dialog-position-modal/dialog-position-modal.component';
import { DialogPositionOverlayComponent } from '../position-components/dialog-position-overlay/dialog-position-overlay.component';
import { DIALOG_DATA, DialogData } from '../entities/dialog-data';
import { DialogRef } from '../entities/dialog-ref';
import { DialogPositionType } from '../entities/dialog-position-type';

@Injectable({
	providedIn: 'root'
})
export class DialogService {
	private readonly dialogPositionsMap: Map<DialogPositionType, ComponentType<any>> = new Map([
		[DialogPositionType.Modal, DialogPositionModalComponent],
		[DialogPositionType.Center, DialogPositionCenterComponent],
		[DialogPositionType.Overlay, DialogPositionOverlayComponent]
	]);

	constructor(private overlay: Overlay, private injector: Injector) {}

	open<C, D>(
		type: DialogPositionType,
		component: ComponentType<C>,
		data: DialogData<D>
	): DialogRef {
		const config: OverlayConfig = this.getOverlayConfig(type);
		return this.createOverlay<C, D>(config, type, component, data);
	}

	private getOverlayConfig(type: DialogPositionType): OverlayConfig {
		const scrollStrategy: ScrollStrategy = this.overlay.scrollStrategies.block();
		let positionStrategy: PositionStrategy;

		switch (type) {
			case DialogPositionType.Modal:
				positionStrategy = this.overlay
					.position()
					.global()
					.centerHorizontally();
				break;
			case DialogPositionType.Center:
				positionStrategy = this.overlay
					.position()
					.global()
					.centerHorizontally()
					.centerVertically();
				break;
			case DialogPositionType.Overlay:
				positionStrategy = this.overlay
					.position()
					.global()
					.right();
				break;
		}

		return new OverlayConfig({
			disposeOnNavigation: true,
			hasBackdrop: true,
			backdropClass: 'cdk-overlay-dark-backdrop',
			scrollStrategy,
			positionStrategy
		});
	}

	private createOverlay<C, D>(
		config: OverlayConfig,
		type: DialogPositionType,
		component: ComponentType<C>,
		data: DialogData<D>
	): DialogRef {
		const overlayRef: OverlayRef = this.overlay.create(config);
		const dialogRef: DialogRef = new DialogRef(overlayRef);
		const injector: PortalInjector = this.createInjector<C, D>(dialogRef, component, data);

		this.attachPortal<C>(overlayRef, this.dialogPositionsMap.get(type), injector);

		return dialogRef;
	}

	private createInjector<C, D>(
		dialogRef: DialogRef,
		component: ComponentType<C>,
		data: DialogData<D>
	): PortalInjector {
		const injectorTokens = new WeakMap();

		injectorTokens.set(DialogRef, dialogRef);
		injectorTokens.set(DIALOG_COMPONENT, component);
		injectorTokens.set(DIALOG_DATA, data);

		return new PortalInjector(this.injector, injectorTokens);
	}

	private attachPortal<C>(
		overlayRef: OverlayRef,
		positionComponent: ComponentType<C>,
		injector: PortalInjector
	): void {
		const portal = new ComponentPortal(positionComponent, null, injector);
		overlayRef.attach(portal);
	}
}
