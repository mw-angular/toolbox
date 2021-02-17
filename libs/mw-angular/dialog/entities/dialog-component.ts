import { ComponentType } from '@angular/cdk/portal';
import { InjectionToken } from '@angular/core';

export const DIALOG_COMPONENT = new InjectionToken<ComponentType<any>>('DIALOG_COMPONENT');
