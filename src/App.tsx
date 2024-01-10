import Router from './routes';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Layout from './Layout';


function App() {
  return (
    <MantineProvider>
      <Layout>
        <Router />
      </Layout>
    </MantineProvider>
  )
}

export default App
