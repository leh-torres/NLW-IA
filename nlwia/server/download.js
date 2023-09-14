import ytdl from 'ytdl-core';
import fs from 'fs';

export const download = (id_video) => 
    new Promise ( (resolve, reject) => {
        const url = "https://www.youtube.com/shorts/"+id_video;

        console.log("Realizando o Download do vídeo...", id_video);

        ytdl(url, { quality: "lowestaudio", filter: "audioonly"})
        .on(
            "info", 
            (info) => {
                const seconds = info.formats[0].approxDurationMs / 1000;

                if(seconds > 60){
                    throw new Error("A duração desse video é maior do que 60 segundos.")
                }
            }
        )
        .on("end", () => {
            console.log("Download do vídeo finalizado.");
            resolve();
        })
        .on("error", (error) => {
            console.log("Não foi possível fazer o download. Detalhes: ", error);
            reject(error);
        }).pipe(fs.createWriteStream("./tmp/audio.mp4"))
    })