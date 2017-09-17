import { basic, expressLogger, ModuleData, rest } from '@foal/core';

import { Module1Module } from './module-1/module-1.module';
import { MyController } from './services/my-controller.controller';
import { User } from './services/user.controller';

export const AppModule: ModuleData = {
  controllerBindings: [
    rest.bindController('/users', User),
    basic.bindController('/basic', MyController)
  ],
  // Use name: sharedControllerDecorators? Or commonControllerDecorators
  controllerDecorators: [
    expressLogger('AppModule'),
    expressLogger('AppModule 2'),
  ],
  imports: [
    { module: Module1Module, path: '/team2' }
  ],
  services: [ User, MyController ]
};
