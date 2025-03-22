import { NativeModule, requireNativeModule } from "expo";

declare class ExpoMediapipeTextTasksModule {
  DELEGATE_CPU: number;
  DELEGATE_GPU: number;
  embed(
    delegate: number,
    modelPath: string,
    text: string,
  ): Promise<{
    string: string;
    embeddings: number[];
    inferenceTime: number;
  }>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoMediapipeTextTasksModule>(
  "ExpoMediapipeTextTasks",
);
