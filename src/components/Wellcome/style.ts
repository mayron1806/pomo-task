import styled from "styled-components";

export const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 80%;
`;
export const Message = styled.p`
    font-size: 1.8rem;
    color: var(--purple);
    text-align: center;
`;
export const Author = styled.p`
    text-align: right;
    font-size: 1.6rem;
    font-weight: 300;
    color: var(--purple);
`;