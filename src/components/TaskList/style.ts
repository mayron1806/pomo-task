import styled from "styled-components";
/* HEADER--------------------------------------------------------------------------------------*/
export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    .add-task{
        cursor: pointer;
        color: ${props => props.theme.text_color};
    }
    margin-bottom: 2rem;
`;
/* BLOCK------------------------------------------------------------------------------------------*/
export const BlocksContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 3rem;
    margin: 1rem 0;
`;
export const FilterButton = styled.button`
    width: 100%;
    padding: 0.5rem;
    background-color: transparent;
    border: 3px solid var(--purple);
    border-radius: 2rem;
    font-size: 2rem;
    color: var(--purple);
    font-weight: 600;
    cursor: pointer;
    transition: 0.5s;
    &:hover{
        background-color: var(--purple);
        color: var(--white);
        border: 3px solid var(--purple);
        box-shadow: inset 4px 4px 10px rgba(0, 0, 0, 0.2);
    }
`;
/* TABLE------------------------------------------------------------------------------------------*/
export const TableContainer = styled.div`
    margin-top: 1rem;
    max-height: calc(100vh - 300px);
    overflow: auto;
    table{
        width: 100%;
    }
    ::-webkit-scrollbar {
        width: 5px;
    }
    ::-webkit-scrollbar-track {
        background: var(--gray);
        border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb {
        background: var(--purple); 
        border-radius: 5px;
    }
`;
export const TableHead = styled.thead`
    font-size: 2rem;
    color: ${props => props.theme.text_color};
    th{
        font-weight: 400;
    }
    th.left{
        text-align: left;
    }
`;