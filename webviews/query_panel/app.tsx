import * as React from 'react';
import ReactDOM from 'react-dom';

import { CssBaseline, ThemeProvider } from '@mui/material';

import QueryPreview from './components/queryPanel';
import { darkTheme, lightTheme } from './theme';
import './index.css';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline enableColorScheme />
      <QueryPreview />
    </ThemeProvider>
  );
}

export function main() {
  const rootElement = document.getElementById('root');
  if (!rootElement) { throw new Error('Failed to find the root element'); }
  ReactDOM.render(<App />, rootElement);
}
