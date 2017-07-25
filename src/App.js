import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

class App extends Component {

  fieldSize = 4
  state = {
    visible: false,
    hash: {},
    field: []
  }

  onColClick = (x, y) => () => {
    const {hash} = this.state
    const key = [String(x) + y]
    if (key in hash)
      this.setState((state) => ({hash: {...state.hash, [key]: true}} ))
    else
      console.log('looser')
  }

  drawField = (size) => {
    const { visible, hash, field } = this.state
    const {onColClick} = this



    // this.setState({hash})

    console.log(field, this.state)
    return field.map((e, x) => <div className='row' key={x}>
          {
            e.map((element, y) => (
              <div
                onClick={onColClick(x, y)}
                className={`col ${(visible && element) || hash[String(x) + y] ? 'active' : ''}`} key={`col-${y}`}>
                {element}
              </div>
            ))
          }
        </div>)
  }

  startGame = (size) => () => {
    const { visible } = this.state
    const hash = {}
    const field = new Array(size).fill(0)
    field.forEach((e, i, a) => (field[i] = new Array(size).fill(0)))

    console.log(field[0] === field[1])

    let i = 0
    while (i < 3) {
      const x = ~~(Math.random() * 3)
      const y = ~~(Math.random() * 3)
      console.log(x, y)
      field[x][y] = 1
      if (!(String(x) + y in hash)) {
        hash[String(x) + y] = 0
        i++
      }
      if (i > 10) break
    }

    this.setState({field, hash, visible: true})
    setTimeout(() => this.setState({visible: false}), 1500)
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="container">
          {this.drawField(4)}
        </div>
        <p onClick={this.startGame(4)}>
          start
        </p>
      </div>
    );
  }
}

export default App;
