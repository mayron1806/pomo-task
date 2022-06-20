import styled, { css } from "styled-components";

export enum ErrorType {
    ERROR,
    WARNING
}
const messageColor = (error: ErrorType) => {
    switch(error){
        case ErrorType.ERROR:
            return css`color:var(--error);`;
        case ErrorType.WARNING:
            return css`color:var(--warning);`;
        default: 
            return css`color:var(--error);`;
    }
}
const Message = styled.p<{error: ErrorType}>`
    margin:1rem;
    font-size:1.6rem;
    font-weight: 400;
    text-align: center;
    ${props => messageColor(props.error)}
`;
type props = { children?: string, type?: ErrorType }

const ErrorMessage = ({children, type = ErrorType.ERROR}: props) => {
    return <Message error={type}>{children}</Message>
}
export default ErrorMessage;