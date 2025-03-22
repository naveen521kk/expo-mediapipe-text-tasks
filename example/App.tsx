import * as FileSystem from "expo-file-system";
import * as TextTasks from "expo-mediapipe-text-tasks";
import * as React from "react";
import { Text, View, TextInput, ScrollView } from "react-native";

const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/text_embedder/bert_embedder/float32/1/bert_embedder.tflite";

export default function App() {
  const [embeddings, setEmbeddings] = React.useState<string>("");
  const [text, setText] = React.useState<string>("Hello, world!");
  React.useEffect(() => {
    const a = async () => {
      console.log("Downloading resources");
      const modelFolderFilePath = FileSystem.cacheDirectory + "/models";

      const exists = await FileSystem.getInfoAsync(modelFolderFilePath);
      if (!exists.exists) {
        await FileSystem.makeDirectoryAsync(modelFolderFilePath, {
          intermediates: true,
        });
      }

      const toFile = modelFolderFilePath + "/bert_embedder.tflite";

      const fileExists = await FileSystem.getInfoAsync(toFile);
      if (!fileExists.exists) {
        console.log(`Downloading ${MODEL_URL} to ${toFile}`);
        const downloadedFile = await FileSystem.downloadAsync(
          MODEL_URL,
          toFile,
        );
        console.log("Downloaded", downloadedFile);
      }

      const res = await TextTasks.embed(
        TextTasks.DELEGATE_GPU,
        // remove file:// prefix
        toFile.replace("file://", ""),
        text,
      );
      console.log({ timestamp: res.inferenceTime, embeddings: res.embeddings });
      setEmbeddings(res.string);
    };
    a();
  }, [text]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ScrollView>
        <Text>Embeddings: {embeddings}</Text>
      </ScrollView>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Enter text to embed"
        style={{ width: 200, height: 40, borderColor: "gray", borderWidth: 1 }}
      />
    </View>
  );
}
