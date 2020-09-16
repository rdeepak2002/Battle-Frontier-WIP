import React, { Component } from 'react';
import * as PIXI from 'pixi.js'
import './App.css';
import bunnySprite from './bunny.png';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      app: new PIXI.Application()
    };
  }

  componentDidMount() {
    const app = this.state.app;
    const loader = app.loader;

    document.getElementsByClassName("screen")[0].appendChild(app.view);

    window.addEventListener("resize", this.resize());
    this.resize();

    // create classes / plan to cleanly render game objects
    // IMPORTANT: create a fixed width and height, and when drawing objects conver their positinos to these aspect ratios
    loader.add('bunny', bunnySprite).load((loader, resources) => {
      const bunny = new PIXI.Sprite(resources.bunny.texture);

      bunny.width = 100;
      bunny.height = 150;

      bunny.x = app.renderer.width / 2;
      bunny.y = app.renderer.height / 2;

      bunny.anchor.x = 0.5;
      bunny.anchor.y = 0.5;

      app.stage.addChild(bunny);

      app.ticker.add(() => {
        bunny.rotation += 0.01;
      });
    });
  }

  render() {
    return (
      <div className="screen"/>
    );
  }

  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    this.state.app.renderer.resize(w, h);
  }
}

export default App;
