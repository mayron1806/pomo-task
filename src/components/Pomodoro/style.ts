import styled from "styled-components";

export const TimerContainer = styled.div`
    height: 90%;
    display: flex;
    align-items: center;
`;
export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    .settings{
        color: ${props => props.theme.colors.text_color};
        cursor: pointer;
    }
`;
