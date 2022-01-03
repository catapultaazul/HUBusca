import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
        
        font-family: "Poppins", sans-serif;
        margin: 0;
        padding: 0;
        text-decoration: none;
        body{
            background-color:#1a202c;
        }
    }
`;
