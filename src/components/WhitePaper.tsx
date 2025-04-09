import React from 'react';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  font-family: "Bradley DJR Variable", sans-serif;
  background-image: url('/logo1.jpeg'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  color: white;
  text-shadow: 2px 2px 4px black;
  width: 100%;
  max-width: 900px;
  margin: 24px auto;
  padding: var(--padding);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 2rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  font-size: 2rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const List = styled.ul`
  margin-left: 1.5rem;
  margin-bottom: 1rem;
  list-style: disc;

  li {
    margin-bottom: 0.5rem;
  }
`;

const WhitePaper: React.FC = () => (
  <Container>
    <Title>PhysicalTokenTransfer: A Secure Voucher System for Ethereum and ERC20 Tokens</Title>

    {/* Abstract */}
    <Section>
      <SectionTitle>Abstract</SectionTitle>
      <Paragraph>
        The <strong>PhysicalTokenTransfer</strong> contract provides a secure, password-protected voucher system for transferring and redeeming ETH and ERC20 tokens, enabling decentralized applications (dApps) to facilitate trustless token transfers and redemptions without intermediaries.
      </Paragraph>
      <Paragraph>
        By leveraging a password-based voucher system, the contract ensures privacy and security for users, enabling secure token transfers, decentralized finance (DeFi) applications, and peer-to-peer (P2P) token transactions.
      </Paragraph>
    </Section>

    {/* 1. Introduction */}
    <Section>
      <SectionTitle>1. Introduction: The Need for Secure Token Transfers</SectionTitle>
      <Paragraph>
        Centralized systems for token transfers often come with security and privacy risks. The <strong>PhysicalTokenTransfer</strong> contract addresses these concerns by utilizing a voucher system secured by password hashes, ensuring that only the rightful holder can redeem or transfer the associated tokens.
      </Paragraph>
      <List>
        <li>Secure token transfers via password-protected vouchers.</li>
        <li>Decentralized and trustless environment.</li>
        <li>Supports ETH and ERC20 tokens.</li>
        <li>Designed for use in DeFi platforms and dApps.</li>
      </List>
    </Section>

    {/* 2. Contract Overview */}
    <Section>
      <SectionTitle>2. Contract Overview</SectionTitle>
      <Paragraph>The <strong>PhysicalTokenTransfer</strong> contract allows users to deposit ETH or ERC20 tokens and generate a voucher linked to a secret password. The voucher can then be transferred to others, with the password remaining secure through hashing, and only the correct password holder can redeem or transfer the tokens.</Paragraph>

      <SectionTitle>2.1 Key Features</SectionTitle>
      <List>
        <li>Voucher creation with token deposits and password hashing.</li>
        <li>Voucher transfer by changing the password associated with the voucher.</li>
        <li>Redemption only possible by the correct password holder.</li>
        <li>Fee structure for each transaction to sustain the ecosystem.</li>
      </List>
    </Section>

    {/* 3. Ecosystem Potential */}
    <Section>
      <SectionTitle>3. Ecosystem Potential</SectionTitle>
      <Paragraph>The <strong>PhysicalTokenTransfer</strong> contract can be integrated into various decentralized applications, such as peer-to-peer (P2P) services, escrow platforms, and token gifting systems. The contract's flexible design allows for broad use in the DeFi ecosystem.</Paragraph>
      <List>
        <li>P2P transfers with secure, password-protected vouchers.</li>
        <li>Decentralized escrow services for secure token transactions.</li>
        <li>Token gifting with redemption via password-protected vouchers.</li>
      </List>
    </Section>

    {/* 4. Security Considerations */}
    <Section>
      <SectionTitle>4. Security Considerations</SectionTitle>
      <Paragraph>The contract employs advanced cryptographic techniques to ensure that only authorized parties can transfer or redeem tokens associated with a voucher.</Paragraph>
      <List>
        <li>Keccak256 hashing for password security.</li>
        <li>Transfer control by the current voucher holder.</li>
        <li>Pause/unpause functionality to protect against potential vulnerabilities.</li>
      </List>
    </Section>

    {/* 5. Implementation */}
    <Section>
      <SectionTitle>5. Implementation</SectionTitle>
      <Paragraph>The <strong>PhysicalTokenTransfer</strong> contract provides functions for voucher creation, transfer, and redemption, along with built-in security features to ensure the integrity of the system.</Paragraph>
      
      <SectionTitle>5.1 Creating a Voucher</SectionTitle>
      <List>
        <li>Users deposit ETH or ERC20 tokens into the contract.</li>
        <li>A unique voucher ID and hashed password are generated.</li>
        <li>The voucher can be transferred or redeemed by the correct password holder.</li>
      </List>

      <SectionTitle>5.2 Transferring a Voucher</SectionTitle>
      <List>
        <li>To transfer, the current holder must provide the password hash and set a new password.</li>
        <li>The new password ensures that only the new holder can control the voucher.</li>
      </List>

      <SectionTitle>5.3 Redeeming a Voucher</SectionTitle>
      <List>
        <li>To redeem, the user must provide the correct password to retrieve the associated tokens.</li>
        <li>The transaction is then completed, and the tokens are sent to the redeeming address.</li>
      </List>
    </Section>

    {/* 6. Tokenomics and Fees */}
    <Section>
      <SectionTitle>6. Tokenomics and Fees</SectionTitle>
      <Paragraph>Each voucher transaction is subject to a small fee, ensuring that the system remains sustainable and incentivizes participants. The fee is collected by the fee collector address.</Paragraph>
    </Section>

    {/* 7. Use Cases */}
    <Section>
      <SectionTitle>7. Use Cases</SectionTitle>
      <List>
        <li>P2P Token Transfers with privacy and security.</li>
        <li>Escrow services for DeFi platforms.</li>
        <li>Gift token vouchers for secure gifting of digital assets.</li>
      </List>
    </Section>

    {/* 8. Conclusion */}
    <Section>
      <SectionTitle>8. Conclusion</SectionTitle>
      <Paragraph>The <strong>PhysicalTokenTransfer</strong> contract provides a secure, decentralized method for transferring and redeeming tokens, making it a valuable tool in the decentralized finance ecosystem. Its use in dApps will drive innovation in secure, password-protected token transactions.</Paragraph>
    </Section>

    {/* 9. Future Roadmap */}
    <Section>
      <SectionTitle>9. Future Roadmap</SectionTitle>
      <List>
        <li><strong>Phase 1:</strong> Contract launch and initial testing in dApps.</li>
        <li><strong>Phase 2:</strong> Integration with DeFi platforms and P2P services.</li>
        <li><strong>Phase 3:</strong> Enhanced security features and additional token support.</li>
      </List>
    </Section>
  </Container>
);

export default WhitePaper;