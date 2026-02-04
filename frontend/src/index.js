import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

// Loading Puter AI globally: <script src="https://js.puter.com/v2/"></script>
// Tutorial: https://developer.puter.com/tutorials/free-unlimited-openai-api/
function loadPuter()
{
  return new Promise((resolve, reject) => {
    if (window.puter)
      return resolve();

    const script = document.createElement('script');
    script.src = 'https://js.puter.com/v2/';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Puter'));
    document.body.appendChild(script);
  });
}

if (process.env.NODE_ENV === 'production') {
  console.log = () => {}
  console.error = () => {}
  console.debug = () => {}
}

// Moved below
//   root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );

// Rendering after Puter AI is available
loadPuter()
  .catch(() => {
    console.warn('Puter failed to load. AI feature disabled');
  })

  .finally(() => {
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
