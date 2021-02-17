import { InjectionToken } from '@angular/core';

export type DialogData<D> = D;

export const DIALOG_DATA = new InjectionToken<DialogData<any>>('DIALOG_DATA');
