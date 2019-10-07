import * as PIXI from 'pixi.js';
import GameApplication from './GameApplication/GameApplication';
import gameOptions from './config/app.config';

window.PIXI = PIXI;

function init(gameOptions: PIXI.ApplicationOptions) {
  const app = new GameApplication(gameOptions);
  document.body.appendChild(app.view);
  // window.addEventListener('resize', () => {
  //   app.resize();
  // });
}

document.addEventListener('DOMContentLoaded', () => {
  init(gameOptions);
});
