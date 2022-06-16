const playAudio = (src: string) => {
    const audio = new Audio(src);
    audio.play();
}
const playAudioInLoop = (src: string) => {
    const audio = new Audio(src);
    audio.play();
    audio.loop = true;
    return audio;
}

export {
    playAudio,
    playAudioInLoop
}