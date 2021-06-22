# MwPlatformService

This service is used to define where application is executed: on a server (SSR) or in a browser.
Based on Angular approach but wrapped in a service to use it through DI for better testing experience.

## First you need to import it

```
import { MwPlatformService } from '@mw-angular/core';

constructor(private platformService: MwPlatformService) {
}
```

## Usage

```
if (this.platformService.isBrowser()) {
}

if (this.platformService.isServer()) {
}
```
