import { pipeline } from '@xenova/transformers'
import {transcriptionExample} from "./utils/transcription.js"

export async function transcribe(audioConvertido){
    //return transcriptionExample;

    try {
        console.log("Realizando a transcrição...")

        const transcribe = await pipeline("automatic-speech-recognition", 
            "Xenova/whisper-small")

        const transcription = await transcribe(audioConvertido, {
            chunck_length_s: 30, //dividir o conteúdo em pedacinhos
            stride_length_s: 5, 
            language: "portuguese", 
            task: "transcribe"
        })

        console.log("Transcrição finalizada com sucesso.");

        return transcription?.text.replace("[Música]", "");
        
    } catch (error) {
        throw new Error(error);
    }
}