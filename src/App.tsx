import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./components/Sidebar"; 
import { ConnectWallet } from "./components/ConnectWallet";
import InstructionPage from "./components/InstructionPage";
import WhitePaper from "./components/WhitePaper";
import TokenPriceChart from "./components/TokenPriceChart";
import PhysicalTokenTransfer from "./components/PhysicalTokenTransfer";



const AppContainer = styled.div`
  background-image: url('/logo1.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: grid;
  height: 100vh;
  grid-template-columns: 250px 1fr; // Sidebar (left) and main content (right)
  grid-template-rows: auto 1fr auto; // Header, main content, footer
  grid-template-areas:
    "sidebar header"
    "sidebar main"
    "sidebar footer";

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "main"
      "footer"
  }
`;

const Header = styled.header`
  grid-area: header;
  background-color: blue;
  color: black;
  padding: 1rem;
  text-align: center;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainContent = styled.main`
  grid-area: main;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-image: url("/logo.jpeg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  flex-grow: 1;
`;

const Footer = styled.footer`
  grid-area: footer;
  background-color: black;
  color: white;
  padding: 1rem;
  text-align: center;
  font-size: 0.8rem;
`;

const TopSection = styled.section`
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;
`;

const BottomSection = styled.section`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: #1e1e1e;
  padding: 10px;
`;

const MP3Player = styled.audio`
  margin-top: 10px;
  width: 100%;
`;

const Byte32Hasher = styled.div`
  background-color: #333;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 8px;
  color: white;
`;

 const audioFiles = [
  "/1.mp3",
  "/2.mp3",
  "/3.mp3",
  "/4.mp3",
  "/5.mp3",
  "/6.mp3",
  "/7.mp3",
  "/8.mp3",
];

const MP3Select = styled.select`
  margin-top: 10px;
  padding: 5px;
  font-size: 16px;
`;

const App: React.FC = () => {
  const [selectedMP3, setSelectedMP3] = useState<string>("/1.mp3");

  const handleMP3Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMP3(event.target.value);
  };

  return (
    <Router>
      <AppContainer>
        {/* Sidebar Component */}
        <Sidebar />

        {/* Header */}
        <Header>
          <h1>ICONOCLAST Digital Assets in Physical Reality</h1>
        </Header>

        {/* Main Content */}
        <MainContent>
          <TopSection>
            {/* Byte32Hasher */}
            <Byte32Hasher>
              <h3>Off-Chain Byte32 Hasher</h3>
              <input type="text" placeholder="Enter data to hash" />
              <button>Generate Byte32 Hash</button>
            </Byte32Hasher>

            <h2>Welcome to Iconoclast </h2>
            <Routes>
              <Route path="/instruction-page" element={<InstructionPage />} />
              <Route path="/sidebar" element={<Sidebar />} />
              <Route path="/PhysicalTokenTransfer" element={<PhysicalTokenTransfer />} />
              <Route path="/TokenPriceChart" element={<TokenPriceChart />} />
              <Route path="/whitepaper" element={<WhitePaper />} />
            </Routes>
          </TopSection>

          {/* Bottom section with Token Price Chart and MP3 Player */}
          <BottomSection>
            <TokenPriceChart />

            {/* MP3 Player */}
  const audioFiles = [
  "/1.mp3",
  "/2.mp3",
  "/3.mp3",
  "/4.mp3",
  "/5.mp3",
  "/6.mp3",
  "/7.mp3",
  "/8.mp3",
];

            <MP3Player controls>
              <source src={selectedMP3} type="audio/mp3" />
              Your browser does not support the audio element.
            </MP3Player>
          </BottomSection>
        </MainContent>

        {/* Footer */}
        <Footer>
          <small>&copy; 2025 Iconoclast AI</small>
        </Footer>
      </AppContainer>
    </Router>
  );
};

export default App;