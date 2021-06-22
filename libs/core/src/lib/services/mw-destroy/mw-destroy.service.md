# MwDestroyService

This class is used to reduce repeatable code responsible for unsubscribe process in components.

## How to use

1. Add service to providers in your component:

```
@Component({
   providers: [MwDestroyService],
})
```   

2. Inject service into constructor:
   
```
constructor(@Inject(MwDestroyService) destroy$: Observable<void>) {
}
```

3. Add `takeUntil(this.destroy$)` to every direct subscription pipe:

```
this.form.valueChanges
  .pipe(
    takeUntil(this.destroy$),
  )
  .subscribe((): void => {...});
```


