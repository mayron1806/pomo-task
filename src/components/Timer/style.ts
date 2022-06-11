import styled, { keyframes, css } from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-areas: "timer title" "timer buttons";
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    width: 100%;
    @media (max-width: 950px){
        grid-template-areas: "title" "timer" "buttons"; 
        grid-template-columns: 1fr;
        justify-items: center;
        grid-gap: 3rem;
    }
`;
export const Timer = styled.div`
    grid-area: timer;
    width: 350px;
    height: 350px;
    background-color: var(--purple);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    border: 2px solid var(--purple);
    @media (max-width: 1200px){
        width: 300px;
        height: 300px;
    }
    @media (max-width: 950px){
        width: 250px;
        height: 250px;
    }
    @media (max-width: 800px){
        width: 200px;
        height: 200px;
    }
`;
// texto do timer
export const Time = styled.h2`
    text-align: center;
    font-size: 5rem;
    font-weight: 500;
    color: var(--white);
    z-index: 2;
    @media (max-width: 950px){
        font-size: 3.5rem;
    }
`;
// waves 
const animateWaves = () => {
    return css`.wave{
        animation-play-state: running;
    }`;
}
const wavePositionY = (percent: number) => {
    // 0% com relação a posição do wave container
    const zeroPercent = 13;
     // 100% com relação a posição do wave container
    const hundredPercent = 69;
    // diferenca entre eles
    const difference = hundredPercent - zeroPercent;
    const res = difference * percent / 100;

    return `-${res + zeroPercent}%`;
}
export const WaveContainer = styled.div<{animate: boolean, percentComplete: number}>`
    position: absolute;
    width: 200%;
    height: 200%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, ${props=> wavePositionY(props.percentComplete)});
    ${props => props.animate ? animateWaves() : ""}
`;
const waveAnime = keyframes`
    from{
        transform: translateX(0);
    }
    to{
        transform: translateX(-50%);
    }
`;
const calculateDirection = (dir: string | undefined) => {
    if(dir === "normal" || dir === "reverse") return dir;
    return "normal";
}
export const Wave = styled.img<{duration: number , direction?: string}>`
    position: absolute;
    width: 200%;
    height: 200%;
    top: 0;
    left: 0;
    animation: ${waveAnime} ${props => props.duration}s linear infinite;
    animation-direction: ${props => calculateDirection(props.direction)};
    animation-play-state: paused;
`;

// texto lateral
export const Title = styled.h3`
    grid-area: title;
    font-size: 3rem;
    font-weight: 500;
    color: var(--purple);
    @media (max-width: 950px){
        font-size: 2.5rem;
        text-align: center;
    }
`;
export const ButtonsContainer = styled.div`
    grid-area: buttons;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    width: 50%;
    @media (max-width: 950px){
        width: 100%;
    }
`;
