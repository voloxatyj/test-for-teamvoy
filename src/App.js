import React from 'react';
import Navbar from './components/Navbar';
import Index from './components/Index';
import { Provider } from './context';
import "./App.css";

function App() {
  return (
    <Provider>
        <React.Fragment>
          <Navbar />
            <div className="container">
              <Index />
            </div>
        </React.Fragment>
    </Provider>
  );
}

export default App;
