import React, { Component } from "react"
import { geoOrthographic } from "d3-geo"
import { timer } from "d3"
import { withRouter } from 'react-router-dom';


import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"

class Globe extends Component {
  constructor() {
    super()
    this.state = {
      isPressed: false,
      mouseX: 0,
      mouseY: 0,
      rotation: [0,0,0],
      zoom: 1,
      toggle: true
    }
    this.projection = this.projection.bind(this)
    this.startAnimation = this.startAnimation.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleZoomIn = this.handleZoomIn.bind(this)
    this.handleZoomOut = this.handleZoomOut.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.toggle = this.toggle.bind(this)
 }
 output(geography, evt) {
  console.log(geography.properties.name)
 }
  projection() {
    return geoOrthographic()
      .translate([ 800 / 2, 800 / 2 ])
      .rotate(this.state.rotation)
      .scale(200)
      .clipAngle(90)
      .precision(.1)
  }
   handleZoomIn() {

    this.setState({
      zoom: this.state.zoom * 2,
    })
  }
  handleZoomOut() {
    this.setState({
      zoom: this.state.zoom / 2,
    })
  }
  handleMouseMove({ pageX, pageY }) {
    if (!this.state.isPressed) return
    const differenceX = this.state.mouseX - pageX
    const differenceY = this.state.mouseY - pageY
    this.setState({
      rotation: [
        this.state.rotation[0] - differenceX / 2,
        this.state.rotation[1] + differenceY / 2,
        0,
      ],
      mouseX: pageX,
      mouseY: pageY,
    })
  }
  toggle() {
    this.setState({
      toggle: !this.state.toggle
    })
  }
  handleOnClick() {
    this.toggle()
    if(!this.state.isPressed) return
      this.autorotation.stop()
  }

  handleMouseDown({ pageX, pageY }) {
    this.toggle()
   this.autorotation.stop() 
   this.setState({
      isPressed: true,
      mouseX: pageX,
      mouseY: pageY,
    })
  }
   handleMouseUp({ pageX, pageY }) {
    if(this.state.toggle) {
      this.autorotation.restart(this.startAnimation, 50)
    }
    this.setState({
      isPressed: false,
    })
  }
  startAnimation() {
    const rotation = [this.state.rotation[0] + 1.2, this.state.rotation[1] - 0.00, 0]
    this.setState({ rotation })
  }
  componentDidMount() {
    this.autorotation = timer(this.startAnimation)
  }
  render() {
    return (
      <div  onMouseDown={this.handleMouseDown}
                  onMouseUp={this.handleMouseUp}
                  onMouseLeave={this.handleMouseUp}
                  onMouseMove={this.handleMouseMove}   
                  >

        <button onClick={ this.handleZoomIn }>{ "Zoom in" }</button>
        <button onClick={ this.handleZoomOut }>{ "Zoom out" }</button>
      <ComposableMap width={800} height={800} projection={this.projection} >
        <ZoomableGroup  zoom={ this.state.zoom }>
          <Geographies
            geography={"https://gist.githubusercontent.com/GordyD/49654901b07cb764c34f/raw/27eff6687f677c984a11f25977adaa4b9332a2a9/countries-and-states.json"}
            disableOptimization
            >
            {(geos, proj) =>
              geos.map((geo, i) =>
                <Geography
                  key={`${geo.properties.ISO_A3}-${i}`}
                  geography={geo}
                  projection={proj}
                  round
                  onMouseDown={this.handleMouseDown}
                  onMouseUp={this.handleMouseUp}
                  onMouseLeave={this.handleMouseUp}
                  onMouseMove={this.handleMouseMove}
                  onClick={this.output}
                />
              )
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      </div>
    )
  }
}

export default withRouter(Globe)