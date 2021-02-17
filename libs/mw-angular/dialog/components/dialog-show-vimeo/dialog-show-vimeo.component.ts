import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GtagService } from 'src/app/services/gtag.service';
import { DIALOG_DATA, DialogData } from '../../entities/dialog-data';
import { DialogRef } from '../../entities/dialog-ref';
import { DialogShowVimeoData } from './dialog-show-vimeo-data';

@Component({
	selector: 'vs-stellar-dialog-show-vimeo',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './dialog-show-vimeo.component.html',
	styleUrls: ['./dialog-show-vimeo.component.scss'],
})
export class DialogShowVimeoComponent implements OnInit {
	trustedVideoUrl: SafeResourceUrl | null = null;

	constructor(
		@Inject(DIALOG_DATA) private data: DialogData<DialogShowVimeoData>,
		public dialogRef: DialogRef,
		private sanitizer: DomSanitizer,
		private gtagService: GtagService
	) {
		this.trustedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
			`${this.data.videoUrl}?autoplay=1&loop=1&autopause=0`
		);
	}

	ngOnInit() {
		const videoId = this.data.videoUrl.split('/').pop();
		this.gtagService.sendGtagVideoView(videoId);
	}

	onClose(): void {
		this.dialogRef.close();
	}
}
