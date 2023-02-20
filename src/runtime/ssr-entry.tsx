import { App } from './App';

import { renderToString } from 'react-dom/server';

export function ssrRender() {
  return renderToString(<App />);
}
