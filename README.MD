# ngrx-storage

RxJS multipurpose collection storage for Angular applications

## Installation

To install this library, run:

```bash
$ npm install ngrx-storage --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install ngrx-storage
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import the module
import { StorageModule } from 'ngrx-storage';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify the library as an import
    StorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

// TODO

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Tsvetomir Nikolov](mailto:cvetomir.nikolov@gmail.com)
