import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App';
import { StoreContext } from './context';
import RootStore from './store';

const container = document.getElementById('app');
const root = createRoot(container);

const store = new RootStore();
store.users.load();

root.render(<StoreContext.Provider value={store}><App /></StoreContext.Provider>)
