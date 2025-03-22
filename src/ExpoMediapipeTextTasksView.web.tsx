import * as React from 'react';

import { ExpoMediapipeTextTasksViewProps } from './ExpoMediapipeTextTasks.types';

export default function ExpoMediapipeTextTasksView(props: ExpoMediapipeTextTasksViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
