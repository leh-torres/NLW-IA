import fs from 'fs';
import wav from 'node-wav'; //converter para extração
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from "ffmpeg-static";

const filePath = "./tmp/audio.mp4";
const outputPath = filePath.replace(".mp4", ".wav");

export const convert = () => 
    new Promise((resolve, reject) => {
        ffmpeg.setFfmpegPath(ffmpegStatic);
        ffmpeg()
            .input(filePath)
            .audioFrequency(16000)
            .audioChannels(1)
            .format("wav")
            .on("end", () => {
                const file = fs.readFileSync(outputPath);
                const fileDecoded = wav.decode(file); //decodificando o arquivo

                const audioData = fileDecoded.channelData[0];
                const floatArray = new Float32Array(audioData) //formato do modelo

                console.log("Video convertido com sucesso!");
                resolve(floatArray)
                fs.unlinkSync(outputPath) //deletar
            })
            .on("error", (error) => {
                console.log("Erro ao converter", error);
                reject(error)
            })
            .save(outputPath)
    })
