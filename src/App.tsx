import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Router from './routes';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';


function App() {
  return (
    <MantineProvider>
      <Router />
    </MantineProvider>
  )
}

export default App
