# MwDestroy

This class is used to reduce repeatable code responsible for unsubscribe process in components.

## How to use

Extend your component from `MwDestroy`:

```
import { MwDestroy } from '@mw-angular/core';

export class SomeComponent extends MwDestroy {
}
```

Add `takeUntil(this.destroy$)` to every direct subscription pipe:

```
this.form.valueChanges
  .pipe(
    takeUntil(this.destroy$),
  )
  .subscribe((): void => {...});
```

If your component has constructor you have to add call to parent constructor as first line `super();`:

```
constructor() {
  super();
  ...
}
```

If you want to extend `ngOnDestroy` don't forget to call parent method `super.ngOnDestroy();`: 

```
import { MwDestroy } from '@mw-angular/core';

export class SomeComponent extends MwDestroy {
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
```
