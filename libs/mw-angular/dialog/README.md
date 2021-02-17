# Dialog Module

## How to use

1. Import `DialogModule` from `src/app/modules/dialog/dialog.module.ts`

```
import { DialogModule } from '../../../modules/dialog/dialog.module';
```

2. Inject `DialogService` in constructor from `src/app/modules/dialog/services/dialog.service.ts`

```
import { DialogService } from '../../../../modules/dialog/services/dialog.service';

@Component(...)
export class YourComponent {
    constructor(
        private dialogService: DialogService,
        ...
    ) {}
}
```

3. Show dialog and subscribe on it's events

```
private askDeleteRow(deleteRows: ApiResponseListItem[]) {
    const deleteItemNames: string[] = deleteRows.map(row => row.name);

    const dialogRef: DialogRef = this.dialogService.open<DialogConfirmDeletionComponent, DialogConfirmDeletionData>(
        // position and style of dialog
        // Modal - centered horizontally, margin from top and no animation
        // Overlay - left and top and no animation
        DialogPositionType.Modal,
        
        // component to be shown in dialog
        DialogConfirmDeletionComponent,
        
        // data to be passed to shown component
        {
            objectName: `network policy`, 
            itemNames: deleteItemNames
        }
    );

    // if you need to close dialog on backdrop click
    dialogRef.onBackdropClick()
        .pipe(take(1), takeUntil(this.destroySubject))
        .subscribe(() => {
            dialogRef.close();
        });

    // get result data on close
    dialogRef.onClose<boolean | undefined>()
        .pipe(take(1), takeUntil(this.destroySubject))
        .subscribe((result?: boolean) => {
            if (result) {
                this.deleteEvent.emit(deleteRows);
            }
        });
}
```

## How to add dialog component

Create component in folder `src/app/modules/dialog/components`.
You can use `src/app/modules/dialog/components/dialog-confirm-deletion` as example.
Dialog components should not position component.

## How to add position component

Position components responsible only for position on page and enter/exit animations.
  
- Create component in folder `src/app/modules/dialog/position-components`.
- Extend from `DialogPositionBaseComponent`.
- You can use `src/app/modules/dialog/position-components/dialog-position-modal` as example.
- Add type in `DialogPositionType`.
- Add to `dialogPositionsMap` in `DialogService`.
- Add position configuration in `DialogService.getOverlayConfig`
