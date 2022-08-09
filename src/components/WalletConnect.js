import React, { useEffect, useState } from 'react';
import { Container, Box, Card, CardMedia, Typography, Grid, Button } from '@mui/material';
import LogoProfile from '../assets/logo_profile.png';
import { PeraWalletConnect } from '@perawallet/connect';
import algosdk, { } from 'algosdk';

// Create the PeraWalletConnect instance outside the component
const peraWallet = new PeraWalletConnect();

// connect to the algorand node
const client = new algosdk.Algodv2('', 'https://testnet-api.algonode.cloud', 443);

const WalletConnect = (props) => {
  const [accountAddress, setAccountAddress] = useState(null);
  const [accountInfo, setAccountInfo] = useState(null);
  const isConnectedToPeraWallet = !!accountAddress;

  useEffect(() => {
    // reconnect to session when the component is mounted
    peraWallet.reconnectSession().then((accounts) => {
      // Setup disconnect event listener
      peraWallet.connector?.on('disconnect', handleDisconnectWalletClick);

      if (accounts.length) {
        setAccountAddress(accounts[0]);
      }
    })
  }, []);

  useEffect(() => {
    if (accountAddress) {
      client.accountInformation(accountAddress).do().then((accountInfo) => {
        setAccountInfo(accountInfo);
      }).catch((err) => {
        console.log(err);
      });
    }
  }, [accountAddress]);

  const handleConnectWalletClick = () => {
    peraWallet.connect().then((newAccounts) => {
      // setup the disconnect event listener
      peraWallet.connector?.on('disconnect', handleDisconnectWalletClick);

      setAccountAddress(newAccounts[0]);
    });
  }

  const handleDisconnectWalletClick = () => {
    peraWallet.disconnect();
    setAccountAddress(null);
    setAccountInfo(null);
  }

  return (
    <Box sx={{
      backgroundColor: 'background.default',
      display: 'flex', flexDirection: 'column',
      minHeight: 'calc(100% - 64px)'
    }}>
      <Container style={{
        margin: 'auto auto'
      }}
        maxWidth="md"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          px: {
            md: '130px !important'
          }
        }}>
        <Grid container direction="row" alignItems='center' justifyContent='center'>
          <Grid item xs={4}></Grid>

          <Grid item xs={4}>
            <Card sx={{ borderRadius: 5, width: 100, elevation: 10, margin: 'auto' }}>
              <CardMedia
                component="img"
                image={LogoProfile}
              />
            </Card>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>

        <Grid container direction="row" alignItems='center' justifyContent='center'>
          <Grid item>
            <Typography component="h6" variant='h6' sx={{ fontWeight: "bold", textAlign: 'center' }}>
              {accountInfo?.address ?? "No account connected"}
            </Typography>
          </Grid>
        </Grid>

        <Typography component="p" variant='body1' sx={{ fontWeight: "bold", mt: 2, mb: 2 }}>
          {accountInfo?.amount ? accountInfo?.amount / 1000000 : "0"} ALGOs
        </Typography>

        <Button sx={{
          backgroundColor: "#00554E",
          color: "white",
          width: 200,
          height: 50,
          borderRadius: 5,
          margin: 5,
          ':hover': {
            bgcolor: 'black',
          },
        }}
          onClick={isConnectedToPeraWallet ? handleDisconnectWalletClick : handleConnectWalletClick}
        >
          {isConnectedToPeraWallet ? "Disconnect" : "Connect to Pera Wallet"}
        </Button>

      </Container>
    </Box>

  )
}

export default WalletConnect;
