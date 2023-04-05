import styled from 'styled-components'

export const Container = styled.div`
max-width: var(--max-width-desktop);
display:flex;
flex-direction:column;
justify-content:center;
margin: 5rem auto;
height:100%;
`;

export const HeroSection = styled.section`
max-width: var(--max-width-desktop);
margin-bottom: 2rem;


img {
  object-fit:cover;
  border-radius: 2rem;
  overflow:hidden;
}
`;

export const SearchSection = styled.section`

display:flex;
align-items: center;
justify-content:center;

span{
  margin-right: 1rem;
  font-size:20px;
  color:#002B5B;
  &:hover {
      cursor: pointer;
       color: var(--red);
      }
}

input {
  width:50%;
  height:40px;
  border-radius: 2rem;
  text-align:center;
  border: solid 1px #002B5B;
  &:hover {
      cursor: pointer;
       border-color: var(--red);
      }

}
.button-styled {
  margin-left:0.5rem;
  width:80px;
  height:40px;
  border-radius: 1rem;
  background-color: #002B5B;
  border:none;
  color: white;
  &:hover {
      cursor: pointer;
      background-color: var(--red);
      }
}
`;

export const StatsZone = styled.div`
color: white;

h2 {
  margin-top:3rem;
  color:#002B5B;
}
ul {
  
  display:flex;
  justify-content:space-between;

}

li { 
  margin-top:2rem;
  display:flex;
  flex-direction:column;
  width:300px;
  height:150px;
  background-color: #002B5B;
  border-radius: 2rem;

  padding: 2rem 2rem;

  strong {
    font-size:1.25rem;
    
    
  }

  p {
    
    margin-top: 0.5rem;
  }
}




`;

