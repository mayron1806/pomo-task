import styled from "styled-components";

const Submit = styled.input.attrs({type: "submit"})`
    padding: 0.5rem;
    border: 1px solid var(--purple);
    border-radius: 10px;
    color:var(--white);
    background-color:var(--purple);
    font-size: 1.8rem;
    font-weight:500;
    width:100%;
    font-family: 'Roboto Mono', monospace;
    cursor:pointer;
    transition:0.3s;
    &:hover{
        filter: brightness(1.2);
    }
`;
type props = {value: string}
const SendButton = ({value}: props) => {
    return <Submit value={value} />
}
export default SendButton;