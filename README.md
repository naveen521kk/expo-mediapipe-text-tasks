## expo-mediapipe-text-tasks

For now, this module exposes a single function called `embed` which would create a text embedding for the given text. The function is a wrapper around the `mediapipe` library.

The function signature is as follows:

```typescript
export declare function embed(
  delegate: number,
  modelPath: string,
  text: string
): Promise<{
  string: string;
  embeddings: number[];
  inferenceTime: number;
}>;
```

The `delegate` parameter is an integer that specifies whether to use the CPU or GPU for inference. The value `0` specifies the CPU, and the value `1` specifies the GPU. You can also use the constants `DELEGATE_CPU` and `DELEGATE_GPU` from the `expo-mediapipe-text-tasks` module.

The `modelPath` parameter is a string that specifies the path to the model file. The model file should be a `.tflite` file. You can use the `expo-asset` module to load the model file.

Below are some models from the official MediaPipe repository that you can use:

- MobileBert: https://storage.googleapis.com/mediapipe-models/text_embedder/bert_embedder/float32/1/bert_embedder.tflite
- AverageWord: https://storage.googleapis.com/mediapipe-models/text_embedder/average_word_embedder/float32/1/average_word_embedder.tflite

The `text` parameter is a string that specifies the text for which you want to create an embedding.

The function returns a promise that resolves to an object with the following properties:

- `string`: The `.toString()` representation of the output.
- `inferenceTime`: The time taken for inference in milliseconds.
- `embeddings`: The embedding of the input text.

See [`example/`](https://github.com/naveen521kk/expo-mediapipe-text-tasks/tree/main/example) for a complete example.

## Installation in managed Expo projects

For [managed](https://docs.expo.dev/archive/managed-vs-bare/) Expo projects, install the npm package and start using.

Note that you would need a [development client](https://docs.expo.dev/develop/development-builds/introduction/) while developing and will not work with Expo Go.

## Installation in bare React Native projects

For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

## Installing the npm package

```sh
npm install @naveen521kk/expo-mediapipe-text-tasks
```
