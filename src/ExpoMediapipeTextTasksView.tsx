import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoMediapipeTextTasksViewProps } from './ExpoMediapipeTextTasks.types';

const NativeView: React.ComponentType<ExpoMediapipeTextTasksViewProps> =
  requireNativeView('ExpoMediapipeTextTasks');

export default function ExpoMediapipeTextTasksView(props: ExpoMediapipeTextTasksViewProps) {
  return <NativeView {...props} />;
}
