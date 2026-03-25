import './style.css';
import { App } from './core/App.js';

const root = document.querySelector('#app');
const app = new App(root);
app.mount();
