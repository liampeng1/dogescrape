import React from 'react';
import logo from './logo.svg';
import './App.css';
import UIButton from './Button'
import { getPosts } from './Reddit'

function App() {
  getPosts('wallstreetbets')
  return (
    <div className="App">
      <h1>our header</h1>
      <UIButton />
    </div>
  );
}

export default App;
