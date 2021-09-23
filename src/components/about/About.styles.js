import styled from "styled-components";

export const AboutContainer = styled.section`
  max-width: 1200px;
  margin: 3rem auto;
  text-align: center;
  h1 {
    font-size: 3rem;
    /* color: #75BA93; */
    color: #36825b;
  }
  p {
    width: 80%;
    margin: auto;
    font-size: 20px;
    color: #666;
    line-height: 30px;
  }
`;

export const CardsContainer = styled.div`
  max-width: 1000px;
  margin: 3rem auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  @media only screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 90%;
  }
  @media only screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
    max-width: 90%;
  }
`;
export const Card = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0px 1px 30px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
  transition: 0.1s;
  &:hover {
    box-shadow: 0px 3px 30px rgba(0, 0, 0, 0.2);
  }
  ul {
    position: absolute;
    padding: 0;
    bottom: 50px;
    display: flex;
  }
  ul li {
    list-style: none;
    margin: 0 10px;
    transform: translateY(30px);
    transition: 0.5s;
    opacity: 0;
    transition-delay: 0.1s;
  }
  ul li:last-child {
    transition-delay: 0.15s;
  }
  &:hover ul li {
    transform: translateY(0px);
    opacity: 1;
  }
  ul li a {
    text-decoration: none;
  }
  ul li a img {
    width: 30px;
  }
  &:hover .content {
    opacity: 1;
    transform: translateY(-30px);
  }
`;
export const Content = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  opacity: 0.5;
  transition: 0.5s;

  &:hover {
    opacity: 1;
  }
  img {
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    border: 10px solid rgba(0, 0, 0, 0.25);
  }
  h3 {
    color: #000;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 500;
    font-size: 18px;
    text-align: center;
    margin: 20px 0 10px;
    line-height: 20px;
  }
`;
