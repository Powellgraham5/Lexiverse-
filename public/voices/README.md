# On-device voices

Hausa (`mms-tts-hau`) and Nigerian Pidgin (`mms-tts-pcm`) are Meta's Massively Multilingual Speech
text-to-speech models (https://huggingface.co/facebook/mms-tts-hau, https://huggingface.co/facebook/mms-tts-pcm),
licensed CC BY-NC 4.0. They were converted to ONNX, quantised to 8 bits and split into parts under 20 MB
so the free Cloudflare plan can serve them. Lexiverse is free and non-commercial.

The Yoruba voice loads from https://huggingface.co/Xenova/mms-tts-yor (the same model family).
