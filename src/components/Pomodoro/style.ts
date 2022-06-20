import styled from "styled-components";

export const TimerContainer = styled.div`
    height: 90%;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
`;
export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    .settings{
        color: ${props => props.theme.text_color};
        cursor: pointer;
    }
    margin-bottom: 2rem;
`;
