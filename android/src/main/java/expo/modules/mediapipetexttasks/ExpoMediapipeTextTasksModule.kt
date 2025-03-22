package expo.modules.mediapipetexttasks

import android.os.SystemClock
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

import android.util.Log
import com.google.mediapipe.tasks.core.BaseOptions
import com.google.mediapipe.tasks.core.Delegate
import com.google.mediapipe.tasks.text.textembedder.TextEmbedder
import com.google.mediapipe.tasks.text.textembedder.TextEmbedder.TextEmbedderOptions
import com.google.mediapipe.tasks.text.textembedder.TextEmbedderResult
import expo.modules.kotlin.Promise
import expo.modules.kotlin.exception.CodedException


class ExpoMediapipeTextTasksModule : Module() {
  private val TAG = "ExpoMediapipeTextTasksModule"
  private val DELEGATE_CPU = 0
  private val DELEGATE_GPU = 1
  private val context get() = requireNotNull(appContext.reactContext)
  override fun definition() = ModuleDefinition {
    Name("ExpoMediapipeTextTasks")

    Constants(
      "DELEGATE_CPU" to DELEGATE_CPU,
      "DELEGATE_GPU" to DELEGATE_GPU,
    )

    fun setupTextEmbedder(currentDelegate: Int, modelPath: String): TextEmbedder? {
      val baseOptionsBuilder = BaseOptions.builder()
      when (currentDelegate) {
        DELEGATE_CPU -> {
          baseOptionsBuilder.setDelegate(Delegate.CPU)
        }
        DELEGATE_GPU -> {
          baseOptionsBuilder.setDelegate(Delegate.GPU)
        }
      }

      // set the path to the model
      baseOptionsBuilder.setModelAssetPath(modelPath)

      try {
        val baseOptions = baseOptionsBuilder.build()
        val optionsBuilder =
          TextEmbedderOptions.builder().setBaseOptions(baseOptions)
        val options = optionsBuilder.build()

        Log.d(TAG, "Text embedder options: $options")

        val textEmbedder = TextEmbedder.createFromOptions(context, options)
        return textEmbedder
      } catch (e: IllegalStateException) {
        Log.e(
          TAG,
          "Text embedder failed to load model with error: " + e.message
        )
      } catch (e: RuntimeException) {
        Log.e(
          TAG,
          "Text embedder failed to load model with error: " + e.message
        )
      }
      return null
    }

    fun formatOutput(result: TextEmbedderResult, inferenceTime: Long): Map<String, Any> {
      return mapOf(
        "string" to result.toString(),
        "embeddings" to result.embeddingResult().embeddings().first().floatEmbedding(),
        "inferenceTime" to inferenceTime.toDouble()
      )
    }

    AsyncFunction("embed") { delegate: Int, modelPath: String, text: String, promise: Promise ->
      if (delegate != 0 && delegate != 1) {
        promise.reject(CodedException("Delegate must be 0 (CPU) or 1 (GPU)"))
        return@AsyncFunction
      }
      Log.d(TAG, "embed: $modelPath, $text, $delegate")

      val startTime = SystemClock.uptimeMillis()

      val textEmbedder = setupTextEmbedder(delegate, modelPath)
      Log.i(TAG, "Text embedder loaded successfully")

      if (textEmbedder != null) {
          val result = textEmbedder.embed(text)
            val endTime = SystemClock.uptimeMillis()

          promise.resolve(formatOutput(result, SystemClock.uptimeMillis() - startTime))
      } else {
          promise.reject(CodedException("Text embedder failed to load model"))
      }
    }
  }
}
