import ExpoMediapipeTextTasksModule from "./ExpoMediapipeTextTasksModule";

export function embed(delegate: number, modelFile: string, text: string) {
  return ExpoMediapipeTextTasksModule.embed(delegate, modelFile, text);
}

export const DELEGATE_CPU = ExpoMediapipeTextTasksModule.DELEGATE_CPU;
export const DELEGATE_GPU = ExpoMediapipeTextTasksModule.DELEGATE_GPU;
