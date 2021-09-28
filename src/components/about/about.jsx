import React from "react";
import { AboutContainer, Card, CardsContainer, Content } from "./About.styles";
import Agus from "../../images/Agus.jpg";
import Hernan from "../../images/Hernan.jpeg";
import Joel from "../../images/Joel.jpeg";
import Daniel from "../../images/Daniel.jpeg";
import Fernando from "../../images/Fernando.jpeg";
import Sofia from "../../images/Sofia.jpg";
import Ruben from "../../images/Ruben.jpeg";
import Ana from "../../images/Ana.jpeg";

export default function About() {
  return (
    <AboutContainer>
      <h1>NFT MARKET TEAM</h1>
      <p>
        We are a MarketPlace for the purchase and sale of NFT's, digital art
        products backed by the security of cryptography. In addition, we offer
        various payment methods in USD, ARS, ETH and other functionalities.
      </p>
      <CardsContainer>
        <Card>
          <Content className="content">
            <img src={Agus} alt="profilePicture" />
            <h3>Agustina Corbalán</h3>
          </Content>
          <ul>
            <li>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.linkedin.com/in/agustina-corbalan-b0b8561b6/"
              >
                <img
                  src="https://icongr.am/entypo/linkedin.svg?size=128&color=000000"
                  alt="icon"
                />
              </a>
            </li>
            <li>
              <a rel="noopener noreferrer" target="_blank" href="https://github.com/tinicorb">
                <img
                  src="https://imjosehidalgo.netlify.app/static/media/github.e0df113a.svg"
                  alt="icon"
                />
              </a>
            </li>
          </ul>
        </Card>
        <Card>
          <Content className="content">
            <img src={Hernan} alt="profilePicture" />
            <h3>Hernan Bonavota</h3>
          </Content>
          <ul>
            <li>
              <a rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/bonavota/">
                <img
                  src="https://icongr.am/entypo/linkedin.svg?size=128&color=000000"
                  alt="icon"
                />
              </a>
            </li>
            <li>
              <a rel="noopener noreferrer" target="_blank" href="https://github.com/hbonavota">
                <img
                  src="https://imjosehidalgo.netlify.app/static/media/github.e0df113a.svg"
                  alt="icon"
                />
              </a>
            </li>
          </ul>
        </Card>
        <Card>
          <Content className="content">
            <img src={Joel} alt="profilePicture" />
            <h3>Joel Durand</h3>
          </Content>
          <ul>
            <li>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.linkedin.com/in/joeldurand0/"
              >
                <img
                  src="https://icongr.am/entypo/linkedin.svg?size=128&color=000000"
                  alt="icon"
                />
              </a>
            </li>
            <li>
              <a rel="noopener noreferrer" target="_blank" href="https://github.com/mar156">
                <img
                  src="https://imjosehidalgo.netlify.app/static/media/github.e0df113a.svg"
                  alt="icon"
                />
              </a>
            </li>
          </ul>
        </Card>
        <Card>
          <Content className="content">
            <img src={Daniel} alt="profilePicture" />
            <h3>Daniel Mojica </h3>
          </Content>
          <ul>
            <li>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.linkedin.com/in/danielrmojica/"
              >
                <img
                  src="https://icongr.am/entypo/linkedin.svg?size=128&color=000000"
                  alt="icon"
                />
              </a>
            </li>
            <li>
              <a rel="noopener noreferrer" target="_blank" href="https://github.com/drmc47">
                <img
                  src="https://imjosehidalgo.netlify.app/static/media/github.e0df113a.svg"
                  alt="icon"
                />
              </a>
            </li>
          </ul>
        </Card>
        <Card>
          <Content className="content">
            <img src={Fernando} alt="profilePicture" />
            <h3> Fernando Schulz </h3>
          </Content>
          <ul>
            <li>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.linkedin.com/in/fernando-schulz-zismann-39892216a"
              >
                <img
                  src="https://icongr.am/entypo/linkedin.svg?size=128&color=000000"
                  alt="icon"
                />
              </a>
            </li>
            <li>
              <a rel="noopener noreferrer" target="_blank" href="https://github.com/fernandoschulzz">
                <img
                  src="https://imjosehidalgo.netlify.app/static/media/github.e0df113a.svg"
                  alt="icon"
                />
              </a>
            </li>
          </ul>
        </Card>
        <Card>
          <Content className="content">
            <img src={Sofia} alt="profilePicture" />
            <h3>Sofia Inchausti</h3>
          </Content>
          <ul>
            <li>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.linkedin.com/in/sofia-inchausti/"
              >
                <img
                  src="https://icongr.am/entypo/linkedin.svg?size=128&color=000000"
                  alt="icon"
                />
              </a>
            </li>
            <li>
              <a rel="noopener noreferrer" target="_blank" href="https://github.com/SofiaInchausti">
                <img
                  src="https://imjosehidalgo.netlify.app/static/media/github.e0df113a.svg"
                  alt="icon"
                />
              </a>
            </li>
          </ul>
        </Card>
        <Card>
          <Content className="content">
            <img src={Ruben} alt="profilePicture" />
            <h3>Rubén Aranda</h3>
          </Content>
          <ul>
            <li>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.linkedin.com/in/ruben-emanuel-aranda-0b60a3133/"
              >
                <img
                  src="https://icongr.am/entypo/linkedin.svg?size=128&color=000000"
                  alt="icon"
                />
              </a>
            </li>
            <li>
              <a rel="noopener noreferrer" target="_blank" href="https://github.com/rubengithubarg">
                <img
                  src="https://imjosehidalgo.netlify.app/static/media/github.e0df113a.svg"
                  alt="icon"
                />
              </a>
            </li>
          </ul>
        </Card>
        <Card>
          <Content className="content">
            <img src={Ana} alt="profilePicture" />
            <h3>Ana Harrington</h3>
          </Content>
          <ul>
            <li>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.linkedin.com/in/ana-harrington/"
              >
                <img
                  src="https://icongr.am/entypo/linkedin.svg?size=128&color=000000"
                  alt="icon"
                />
              </a>
            </li>
            <li>
              <a rel="noopener noreferrer" target="_blank" href="github.com/anaharri">
                <img
                  src="https://imjosehidalgo.netlify.app/static/media/github.e0df113a.svg"
                  alt="icon"
                />
              </a>
            </li>
          </ul>
        </Card>
      </CardsContainer>
    </AboutContainer>
  );
}
