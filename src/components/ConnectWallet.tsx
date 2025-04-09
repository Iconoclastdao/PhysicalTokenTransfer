import React from "react";
import { Button, Box, Alert, AlertIcon } from "@chakra-ui/react";
import { useDApp } from "./DAppProvider";

export const ConnectWallet: React.FC = () => {
  const { address, connectWallet, wrongNetwork } = useDApp();

  return (
    <Box mb="1rem">
      {wrongNetwork && (
        <Alert status="error" mb="1rem">
          <AlertIcon />
          You are on the wrong network. Please switch to the correct network.
        </Alert>
      )}
      {address ? (
        <Box>
          <strong>Connected:</strong> {address}
        </Box>
      ) : (
        <Button colorScheme="blue" onClick={connectWallet}>
          Connect Wallet
        </Button>
      )}
    </Box>
  );
};


