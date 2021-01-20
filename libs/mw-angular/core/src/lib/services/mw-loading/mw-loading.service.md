# MwLoadingService

This service is used to store loading state by tags.
Very useful when you need to show loader for particular component or for application loading process (general).

It helps in situation when one particular loader depends on many sources.

For example:
- isLoading was false
- first source started - isLoading become true
- second source started - isLoading still true
- first source stopped - isLoading still true
- second source stopped - isLoading become false

## First you need to import it

```
import { MwLoadingService } from '@mw-angular/core';

constructor(private loadingService: MwLoadingService) {
}
```

## When you need to get state for particular tag:

```
isLoading$: Observable<boolean>;

this.isLoading$ = this.loadingService.getIsLoading('any-tag-here');
```

## Set loading process

### Simple start and stop

```
this.loadingService.start('any-tag-here');
this.loadingService.stop('any-tag-here');
```

### Start using observable, don't forget to stop this loader

```
const result$ = this.loadingService.startObservable('any-tag-here')
  .pipe(
      switchMap(() => {...}),
      finalize(() => this.loadingService.stop('any-tag-here')),
  );
```

### Start and automatically stop wrapper for single value observable

```
const result$: Observable<ResultType> = this.loadingService.loadingWrapper<ResultType>(
  this.apiService.loadItems(queryParams),
  'any-tag-here',
);
```

### When tag is not set

Default tag value in any method is `general`. 
Useful for tracking application loading processes.
