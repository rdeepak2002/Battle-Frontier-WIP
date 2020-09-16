import React, { Component } from 'react';
import {POLICY, Size, getScaledRect} from 'adaptive-scale/lib-esm';
import * as PIXI from 'pixi.js'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      app: new PIXI.Application()
    };
  }

  componentDidMount() {
    let app = this.state.app;
    let loader = app.loader;
    let graphics = new PIXI.Graphics();

    document.getElementsByClassName("screen")[0].appendChild(app.view);
    window.addEventListener("resize", this.resize());

    this.resize();

    let image = {
      x: 0,
      y: 0,
      width: 1280,
      height: 720,
    };

    let originalWidth = image.width;
    let originalHeight = image.height;

    let options = {
      container: new Size(app.renderer.width, app.renderer.height),
      target: new Size(originalWidth, originalHeight),
      policy: POLICY.ShowAll, // null | ExactFit | NoBorder | FullHeight | FullWidth | ShowAll
    };

    let rect = getScaledRect(options);

    graphics.beginFill(0xFFFF00);
    graphics.lineStyle(5, 0xFF0000);
    graphics.drawRect(rect.x, rect.y, rect.width, rect.height);
    app.stage.addChild(graphics);
  }

  render() {
    return (
      <div className="screen"/>
    );
  }

  resize() {
    this.state.app.renderer.resize(window.innerWidth, window.innerHeight);
  }
}

export default App;
