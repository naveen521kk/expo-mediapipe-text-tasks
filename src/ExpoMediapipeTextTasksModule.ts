import { NativeModule, requireNativeModule } from 'expo';

import { ExpoMediapipeTextTasksModuleEvents } from './ExpoMediapipeTextTasks.types';

declare class ExpoMediapipeTextTasksModule extends NativeModule<ExpoMediapipeTextTasksModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoMediapipeTextTasksModule>('ExpoMediapipeTextTasks');
