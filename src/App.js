import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import RecipientForm from './components/RecipientForm';
import GiftList from './components/GiftList';
import FavoriteList from './components/FavoriteList';
import AddGiftForm from './components/AddGiftForm';
import RoleSwitcher from './components/RoleSwitcher';
import './App.scss';
import { Typography } from '@mui/material';

const AppContent = () => {
  return (
    <div 
      className="appContainer" 
      style={{ 
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-start', 
        justifyContent: 'flex-start' 
      }}
    >
      <header style={{ width: '100%'}}>
        <Typography variant="h4" marginLeft="450px"component="h1" gutterBottom>
          Personalized Gift Idea Generator
        </Typography>
        <RoleSwitcher />
      </header>

      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          justifyContent: 'flex-start', 
          width: '100%' 
        }}
      >
        <aside style={{ marginRight: '20px' }}>
          <RecipientForm />
        </aside>

        <main style={{ flexGrow: 1 }}>
          <FavoriteList />
          <GiftList />
          <AddGiftForm />
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;