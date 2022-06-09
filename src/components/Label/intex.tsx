import styled from "styled-components";

const Container = styled.label`
    display: block;
    font-size: 2rem;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
    color: var(--black);
    &.inline{
        display: inline;
        padding-right: 1rem;
    }
`;
type props = {
    children?: string,
    htmlFor?: string,
    className?: string
}
const Label = ({ children, htmlFor, className}: props) => {
    return(
        <Container className={className} htmlFor={htmlFor}>{children}</Container>
    )
}
export default Label;