import * as PIXI from 'pixi.js';
import GameApplication from './GameApplication/GameApplication';
import appOptions from './config/app.config';

window.PIXI = PIXI;

function init(appOptions: PIXI.ApplicationOptions) {
  const app = new GameApplication(appOptions);
  document.body.appendChild(app.view);
  window.addEventListener('resize', () => {
    app.resize();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  init(appOptions);
});
