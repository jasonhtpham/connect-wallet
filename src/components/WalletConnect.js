import React, { useEffect, useState } from 'react';
import { Container, Box, Card, CardMedia, Typography, Grid, Button } from '@mui/material';
import LogoProfile from '../assets/logo_profile.png';
import { PeraWalletConnect } from '@perawallet/connect';
import algosdk, { } from 'algosdk';


const WalletConnect = (props) => {
  const [accountAddress, setAccountAddress] = useState(null);
  const [accountInfo, setAccountInfo] = useState(null);
  const isConnectedToPeraWallet = !!accountAddress;

  // Auto reconnect to wallet if wallet is connected

  // Get account info when the account address is set

  // Handle the connect to PeraWallet button click
  const handleConnectWalletClick = () => {

  }
  // Handle the disconnect from PeraWallet button click
  const handleDisconnectWalletClick = () => {

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
