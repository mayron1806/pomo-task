import styled, { css } from "styled-components";

const activeModal = (active: boolean) => {
    if(active) {
        
        // desabilita scroll do body
        document.body.style.overflow = "hidden";
        // pega o valor do scroll atual para adicionar como margem para o modal
        const scrollTop = document.documentElement.scrollTop;   
        return css`
            transform: scale(1); 
            margin-top: ${scrollTop}px;
        `;
    }
     // abilita scroll do body
    document.body.style.overflow = "auto";

    return css`transform: scale(0);`;
}
export const Container = styled.div<{active: boolean}>`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.1);
    ${props => activeModal(props.active)}
`;
export const Modal = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${props => props.theme.colors.main};
    padding: 2rem;
    border-radius: 3rem;
    box-shadow: 0 0 15px var(--shadow);
    min-width: 450px;
    transition: 0.5s;
    @media (max-width: 500px){
        width: 80vw;
        min-width: auto;
    }
`;
// modal header
export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    .close-modal{
        color: ${props => props.theme.colors.text_color};
        cursor: pointer;
    }
`;
// title modal header
export const Title = styled.h2`
    font-size: 2.5rem;
    color: var(--purple);
    font-weight: 500;
`;
export const Content = styled.div<{hasContent: boolean}>`
    ${props => props.hasContent ? "padding: 1rem 0;" : "padding: 0;"}
    font-size: 2rem;
    color: ${props => props.theme.colors.text_color};
`;