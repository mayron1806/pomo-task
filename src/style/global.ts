import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
    *{
        padding: 0;
        margin: 0;
        border: 0;
        text-decoration: none;
        box-sizing: border-box;
    }
    html{
        //cores
        --gray: #B4B4B4;
        --white: #F5F5F5;
        --green: #1EF526;
        --yellow: #E9E01B;
        --red: #FA0A0A;
        --black: #5A5A5A;
        --purple: #9C44DC;
        --light-purple: #BC8AE1;

        font-family: 'Roboto Mono', monospace;
        font-size: 62.5%;
    }
    body{
        font-size: 1rem;
    }
`;
export default Global;