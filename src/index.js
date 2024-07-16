import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/index.scss';
import LoadingContainer from './LoadingContainer';

// Create a root
const container = document.getElementById('root');
const root = createRoot(container);

// Initial render
root.render(<LoadingContainer />);
