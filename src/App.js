import React from 'react';
import { AppRoutes } from './routes/routes';
import NavBar from './components/AppBar';


const App = () => {
  return (
    <div>
      <NavBar title="Pera Wallet Connection" />
      <AppRoutes />
    </div >
  )
}

export default App;
