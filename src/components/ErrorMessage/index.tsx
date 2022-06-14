import styled from "styled-components";

const Message = styled.p`
    margin:1rem;
    color:var(--red);
    font-size:1.6rem;
    font-weight: 400;
    text-align: center;
`;
type props = { children?: string }

const ErrorMessage = ({children}: props) => {
    return <Message>{children}</Message>
}
export default ErrorMessage;