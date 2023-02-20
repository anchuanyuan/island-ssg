import { createRoot } from 'react-dom';
import { App } from './App';

function renderInBrowser() {
  const containerEl = document.getElementById('app');
  if (!containerEl) {
    throw new Error('element not found');
  }
  createRoot(containerEl).render(<App />);
}

renderInBrowser();
