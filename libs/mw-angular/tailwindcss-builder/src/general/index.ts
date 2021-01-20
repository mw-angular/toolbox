import { createBuilder } from '@angular-devkit/architect';

import { generalBuilder } from './general-builder';

export default createBuilder(generalBuilder);
