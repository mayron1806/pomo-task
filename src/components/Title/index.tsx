import styled from "styled-components";
 
const H2 = styled.h2`
    font-size: 2.5rem;
    color: ${props => props.theme.text_color};
    font-weight: 500;
    &.left{
        text-align: left;
    }
    &.center{
        text-align: center;
    }
    &.right{
        text-align: right;
    }
    @media (max-width: 900px){
        font-size: 2rem;
    }
`;
type props = {title: string, align?: string}

const Title = ({ title, align = "left" }: props) => {
    return <H2 className={align}>{title}</H2> 
}
export default Title;