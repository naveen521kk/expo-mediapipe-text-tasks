import { registerWebModule, NativeModule } from 'expo';

import { ExpoMediapipeTextTasksModuleEvents } from './ExpoMediapipeTextTasks.types';

class ExpoMediapipeTextTasksModule extends NativeModule<ExpoMediapipeTextTasksModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoMediapipeTextTasksModule);
