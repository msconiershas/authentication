import React, { Component } from "react"
import { render } from "react-dom"
import Map from "./components/Map"

import "./styles.css"

class App extends Component {
  constructor() {
    super()
    this.state = { center: [0, 0] }
  }
  changeCenter = center => () => {
    this.setState({ center })
  }
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ padding: "1rem 0" }}>
          
        </div>
        <div id="map-background"><Map  /></div>
      </div>
    )
  }
}

export default App;
