import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule, ModalModule } from 'volterra-ui-components';
import { TranslateModule } from 'volterra-ui-components/translate';
import { DialogConfirmDeletionComponent } from './components/dialog-confirm-deletion/dialog-confirm-deletion.component';
import { DialogShowVimeoComponent } from './components/dialog-show-vimeo/dialog-show-vimeo.component';
import { DialogPositionBaseComponent } from './position-components/dialog-position-base.component';
import { DialogPositionCenterComponent } from './position-components/dialog-position-center/dialog-position-center.component';
import { DialogPositionModalComponent } from './position-components/dialog-position-modal/dialog-position-modal.component';
import { DialogPositionOverlayComponent } from './position-components/dialog-position-overlay/dialog-position-overlay.component';

const dialogPositionComponents = [
	DialogPositionBaseComponent,
	DialogPositionModalComponent,
	DialogPositionCenterComponent,
	DialogPositionOverlayComponent,
];

const dialogComponents = [DialogConfirmDeletionComponent, DialogShowVimeoComponent];

@NgModule({
	imports: [CommonModule, OverlayModule, PortalModule, ModalModule, TranslateModule, ButtonModule],
	declarations: [...dialogPositionComponents, ...dialogComponents],
	entryComponents: [...dialogPositionComponents, ...dialogComponents],
})
export class DialogModule {}
