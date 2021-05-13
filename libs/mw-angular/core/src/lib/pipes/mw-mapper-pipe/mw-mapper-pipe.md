# MwMapperPipeModule

Maps a value to a different value using pure mapping function with any number additional arguments.

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
  value: string = 'Value';

  someParam: string = 'Hola';
  
  readonly mapperFn: MwMapperFn<string, string> = (input: string, someParam: string): string => {
    return input + someParam;
  }
}
```
