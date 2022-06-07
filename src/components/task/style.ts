import styled from "styled-components";

export const Container = styled.div`
    width: 400px;
    height: 100%;
    background-color: var(--white);
    border-radius: 3rem;
    box-shadow: 0 0 15px var(--shadow);
    padding: 2rem;
`;
export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    .add-task{
        cursor: pointer;
    }
`;
export const Title = styled.h2`
    font-size: 2.5rem;
    color: var(--black);
`;
export const BlocksContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 3rem;
    margin: 1rem 0;
`;
export const Button = styled.button`
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
export const TableContainer = styled.div`
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
    th{
        font-weight: 400;
    }
    th.name{
        text-align: left;
    }
`;