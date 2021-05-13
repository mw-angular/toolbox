# MwMapperPipeModule

Maps a value to a different value using pure mapping function with any additional arguments.

## How to use

- Import `MwMapperPipeModule`
- Use function from your component

```
@Component({
  selector: 'app-any-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '
    <some-component [property]="value | mwMapper:mapperFn:someParam"></some-component>
  ',
})
export class AppAnyComponent {
  value = 'Value';

  someParam = 'Hola!';
  
  readonly mapperFn = (input, someParam: string) => {
    return { input, someParam };
  }
}
```
