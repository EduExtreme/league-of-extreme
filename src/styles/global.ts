import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #f0f2f5;
    --red: #E52E4D;
    --blue: #5429CC;
    --green: #33CC95;
    --orange: #E94E1B;
    --blue-light: #277AF6;
    --blue-dark: #000440;
    --text-title: #000440;
    --text-body: #616161;
   
    --white: #ffffff;
    --blue-50: #149AF8;
    --blue-100: #0081FA;
    --blue-200: #248DF0;
    --blue-300: #1475FC;
    --blue-600: #0064D6;
    --blue-700: #1163D6;
    --blue-800: #1B52AB;
    --blue-900: #033671;
    --grayish-blue-800: #3C474F;
    --grayish-blue-900: #2B3340;

    // Max Width
    --max-width-super-desktop: 1420px;
    --max-width-desktop: 1120px;
    --max-width-tablet: 900px;
    --max-width-mobile: 100%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media(max-width: 1080px) {
      font-size: 93.75%;
    }

    @media(max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    background: var(--white);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  .react-modal-overlay {
    background: #9876;

    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  button {
    cursor: pointer;
  }

  a{
    text-decoration: none;
  }

 
  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .bg-blue-default {
    background: var(--blue-light);
  }

  .bg-blue-100 {
    background: var(--blue-100);
  }

  .bg-blue-200 {
    background: var(--blue-200);
  }

  .bg-blue-300 {
    background: var(--blue-300);
  }

  .bg-blue-600 {
    background: var(--blue-600);
  }

  .bg-blue-700 {
    background: var(--blue-700);
  }

  .bg-blue-800 {
    background: var(--blue-800);
  }

  .bg-blue-900 {
    background: var(--blue-900);
  }

  .scrolled-down{
    transform:translateY(-100%); transition: all 0.3s ease-in-out;
  }
  .scrolled-up{
    transform:translateY(0); transition: all 0.3s ease-in-out;
  }

  .scrolled-footer-up{
    transform:translateY(0px); transition: all 0.3s ease-in-out;
  }
  .scrolled-footer-down{
    transform: translateY(100%); transition: all 0.3s ease-in-out;
  }

  .global-container {
    position: absolute;
    width: 100%;
  }

  .slide-container-img {
    background-size: cover;
    background-position: center;
    

    
  }
`;
