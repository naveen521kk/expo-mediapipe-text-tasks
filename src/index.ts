// Reexport the native module. On web, it will be resolved to ExpoMediapipeTextTasksModule.web.ts
// and on native platforms to ExpoMediapipeTextTasksModule.ts
export { default } from './ExpoMediapipeTextTasksModule';
export { default as ExpoMediapipeTextTasksView } from './ExpoMediapipeTextTasksView';
export * from  './ExpoMediapipeTextTasks.types';
