/* LEGACY WAREHOUSE NOTE: This file belongs to the older standalone warehouse/game prototype and is not part of the live marketing site. Use src/main.jsx and the React pages/components for active website work. */

import './style.css';
import { App } from './core/App.js';

const root = document.querySelector('#app');
const app = new App(root);
app.mount();
