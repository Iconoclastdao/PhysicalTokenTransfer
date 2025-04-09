import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  color: #fff;
  background-color: #121212;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  font-family: "Arial", sans-serif;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
  text-align: center;
  color: #4caf50;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: #ff9800;
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.6;
`;

const InstructionList = styled.ul`
  list-style: disc;
  margin-left: 20px;
  font-size: 16px;
  line-height: 1.6;
`;

const InstructionPage: React.FC = () => {
  return (
    <Container>
      <Title>PhysicalTokenTransfer Contract Instructions</Title>

      {/* Introduction */}
      <Section>
        <SectionTitle>Introduction</SectionTitle>
        <Paragraph>
          The <strong>PhysicalTokenTransfer</strong> contract provides a secure, password-protected voucher system for transferring and redeeming ETH and ERC20 tokens. Follow these steps to securely interact with the contract.
        </Paragraph>
      </Section>

      {/* Connecting Your Wallet */}
      <Section>
        <SectionTitle>1️⃣ Connecting Your Wallet</SectionTitle>
        <Paragraph>
          To interact with the <strong>PhysicalTokenTransfer</strong> contract, click the <strong>“Connect Wallet”</strong> button on the navigation bar. Ensure you have <strong>MetaMask</strong> or another Ethereum-compatible wallet installed and that you’re connected to the correct Ethereum network.
        </Paragraph>
      </Section>

      {/* Interacting with the Contract */}
      <Section>
        <SectionTitle>2️⃣ Interacting with the PhysicalTokenTransfer Contract</SectionTitle>
        <Paragraph>The contract provides several key functionalities:</Paragraph>
        <InstructionList>
          <li>
            <strong>🟢 Create Voucher:</strong> Mint a voucher linked to a deposit of ETH or ERC20 tokens.
          </li>
          <li>
            <strong>💸 Transfer Voucher:</strong> Transfer the voucher to another party by updating the password hash.
          </li>
          <li>
            <strong>🔑 Redeem Voucher:</strong> Redeem the tokens by providing the correct password.
          </li>
          <li>
            <strong>⚖️ Fee Management:</strong> Manage fees associated with voucher creation and redemption.
          </li>
        </InstructionList>
      </Section>

      {/* Creating a Voucher */}
      <Section>
        <SectionTitle>3️⃣ Creating a Voucher</SectionTitle>
        <InstructionList>
          <li>Navigate to the <strong>Voucher Creation Module</strong>.</li>
          <li>Deposit ETH or ERC20 tokens into the contract.</li>
          <li>Generate a password for the voucher and store it securely.</li>
          <li>Your voucher will have a unique identifier, linked to the tokens.</li>
          <li>Ensure that you securely store the voucher’s password.</li>
        </InstructionList>
      </Section>

      {/* Transferring a Voucher */}
      <Section>
        <SectionTitle>4️⃣ Transferring a Voucher</SectionTitle>
        <InstructionList>
          <li>Go to the <strong>Voucher Transfer Module</strong>.</li>
          <li>Enter the voucher ID and the new password hash to transfer the voucher to another party.</li>
          <li>The new recipient will need the correct password to redeem the voucher.</li>
        </InstructionList>
      </Section>

      {/* Redeeming a Voucher */}
      <Section>
        <SectionTitle>5️⃣ Redeeming a Voucher</SectionTitle>
        <InstructionList>
          <li>Navigate to the <strong>Voucher Redemption Module</strong>.</li>
          <li>Provide the correct password hash to redeem the tokens.</li>
          <li>If the password matches, the tokens are transferred to your wallet.</li>
          <li>If the password is incorrect, the redemption will fail.</li>
        </InstructionList>
      </Section>

      {/* Troubleshooting */}
      <Section>
        <SectionTitle>⚠️ Troubleshooting & Support</SectionTitle>
        <Paragraph>If you encounter issues, please check that:</Paragraph>
        <InstructionList>
          <li>Your wallet is <strong>connected</strong> and has sufficient ETH for transaction fees.</li>
          <li>You are on the <strong>correct network</strong> (Ethereum Mainnet or testnet).</li>
          <li>The <strong>voucher password</strong> is correctly stored and used.</li>
        </InstructionList>
        <Paragraph>
          For further assistance, please reach out via:
        </Paragraph>
        <InstructionList>
          <li>📢 <strong>Telegram</strong></li>
          <li>💬 <strong>Discord</strong></li>
          <li>🐦 <strong>Twitter</strong></li>
        </InstructionList>
      </Section>
    </Container>
  );
};

export default InstructionPage;