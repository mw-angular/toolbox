# UnsubscribeOnDestroy

This class is used to reduce repeatable code responsible for unsubscribe process in components.

## How to use

Extend your component from `UnsubscribeOnDestroy`:

```
import { UnsubscribeOnDestroy } from '@mw-angular/core';

export class LoginFormComponent extends UnsubscribeOnDestroy {
}
```

Add `takeUntil(this.destroy$$)` to every direct subscription pipe:

```
this.form.valueChanges
  .pipe(
    takeUntil(this.destroy$$),
  )
  .subscribe((): void => {...});
```
