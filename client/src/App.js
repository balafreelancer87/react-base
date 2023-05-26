import React from 'react';
// Import application sass styles
import '@/styles/main.scss';
import './App.css';
// Test import of an asset
import userIMG from 'assets/images/user.jpg';
// Test import of an asset
import webpackLogo from 'assets/images/webpack-logo.svg';

export default function App() {
  return (
    <div>
      <h1>React from Scratch</h1>
      <div>
        <h1 className="heading">GeeksForGeeks</h1>
        <h4 className="sub-heading">A computer science klko portal for geeks ppol</h4>
      </div>
      <div className="container">
        <div className="header">
          <h1>Welcome to React xxxx application</h1>
          <div className="postcss">postcss</div>
          <img src={userIMG} alt="react logo" style={{ width: '400px' }} />
          <img src={webpackLogo} alt="webpack logo" style={{ width: '400px' }} />
        </div>
      </div>
    </div>
  );
}
