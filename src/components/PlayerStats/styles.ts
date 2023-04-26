import styled from "styled-components";

export const Container = styled.div`
  max-width: var(--max-width-super-desktop);
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  height: 30vh;
  background-color: var(--background);
`;

export const HeroSection = styled.section`
  margin-bottom: 2rem;

  img {
    object-fit: cover;
    border-radius: 2rem;
    overflow: hidden;
  }
`;

export const SearchSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin-right: 1rem;
    font-size: 20px;
    color: #002b5b;
    &:hover {
      cursor: pointer;
      color: var(--red);
    }
  }

  input {
    width: 50%;
    height: 40px;
    border-radius: 2rem;
    text-align: center;
    border: solid 1px #002b5b;
    &:hover {
      cursor: pointer;
      border-color: var(--red);
    }
  }
  .button-styled {
    margin-left: 0.5rem;
    width: 80px;
    height: 40px;
    border-radius: 1rem;
    background-color: #002b5b;
    border: none;
    color: white;
    &:hover {
      cursor: pointer;
      background-color: var(--red);
    }
  }
`;

export const Spinner = styled.div`
  margin-right: 1rem;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.5s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export const StatsZone = styled.div`
  color: white;
  h2 {
    margin-top: 3rem;
    color: #002b5b;
  }
  ul {
    display: flex;
    justify-content: space-between;
  }

  li {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 150px;
    background-color: #002b5b;
    border-radius: 2rem;

    padding: 2rem 2rem;

    strong {
      font-size: 1.25rem;
    }

    p {
      margin-top: 0.5rem;
    }
  }
`;

export const RankedStats = styled.div`
  display: flex;
  margin-top: 3rem;
  gap: 2rem;
  .ranked-details {
    background-color: #002b5b;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    gap: 0.5rem;
    width: 200px;
    height: 200px;
    padding: 2rem 2rem;
    color: white;
  }
`;

export const WinRateZones = styled.div`
  color: black;
  h2 {
    margin-top: 3rem;
    color: #002b5b;
  }
 
`;

