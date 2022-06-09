import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 3rem;
    background-color: ${props => props.theme.colors.main};
    box-shadow: 0 0 15px var(--shadow);
    padding: 2rem;
    transition: 0.5s;
`;
export const Title = styled.h2`
    font-weight: 500;
`;