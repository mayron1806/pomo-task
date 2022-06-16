import { useState } from "react"

export const useAudio = (src?: string) => {
    const [audio] = useState<HTMLAudioElement>(new Audio(src));
    
    const setSound = (src: string) => audio.src = src;

    const play = () => audio.play();
    const stop = () => audio.pause();

    const enableLoop = () => audio.loop = true;
    const disableLoop = () => audio.loop = false;

    return {
        setSound,
        play, 
        stop,
        enableLoop,
        disableLoop,
        audio
    }
}