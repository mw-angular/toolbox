# MwLetDirective

Directive mwLet allows reusing computed value in several places in template to avoid many async pipes

## How to use

- Import `MwLetDirectiveModule`

```
<ng-container *mwLet="smth$ | async as smth">
  {{ smth }}
</ng-container>
```
