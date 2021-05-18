# mwMutationObserver

RxJS version of `MutationObserver`.

```
let target: Node = document.getElementById('some-id');

const options: MutationObserverInit = { 
  childList: true, 
  subtree: true,
};

mwMutationObserver(target, options).subscribe((mutations: MutationRecord[]) => console.log(mutations));
```
