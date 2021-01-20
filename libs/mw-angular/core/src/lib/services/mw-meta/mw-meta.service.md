# MwMetaService

This service is used to work with meta tags and title.

## First you need to import it

```
import { MwMetaService } from '@mw-angular/core';

constructor(private metaService: MwMetaService) {
}
```

## Set title:

1. `<title></title>` tag should be present in document head.

2. Set title using method:

```
this.metaService.setTitle('New Title');
```

## Set description:

1. `<meta name="description" content="" />` tag should be present in document head.

2. Set description using method:

```
this.metaService.setDescription('New Description');
```
