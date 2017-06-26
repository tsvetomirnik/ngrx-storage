import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from './storage.service';

export * from './storage.service';
export * from './core';

@NgModule({
  imports: [
    CommonModule
  ]
})
export class StorageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StorageModule,
      providers: [StorageService]
    };
  }
}
