import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 3rem;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    gap: 1px;
    background-color: var(--gray);
    .top{
        border-top-left-radius: 3rem;
        border-top-right-radius: 3rem;
    }
    .top.active{
        box-shadow: inset 0 4px 5px var(--shadow);
    }
    .bottom{
        border-bottom-left-radius: 3rem;
        border-bottom-right-radius: 3rem;   
    }
    .bottom.active{
        box-shadow: inset 0 -4px 5px var(--shadow);
    }
    @media (max-width: 600px){
        flex-direction: row;
        .top{
            border-radius: 0;
            border-top-left-radius: 3rem;
            border-bottom-left-radius: 3rem;
        }
        .top.active{
            box-shadow: inset 4px 0 5px var(--shadow);
        }
        .bottom{
            border-radius: 0;
            border-top-right-radius: 3rem;
            border-bottom-right-radius: 3rem;  
        }
        .bottom.active{
            box-shadow: inset -4px 0 5px var(--shadow);
        }
    }
`;
export const Button = styled.button`
    background-color: ${props => props.theme.main};
    height: 100%;
    width: 100%;
    font-size: 2.5rem;
    position: relative;
    transition: 0.5s;
    cursor: pointer;
`;
export const TextButton = styled.p`
    color: ${props => props.theme.text_color};
    
`;