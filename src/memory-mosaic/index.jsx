import React, { PureComponent } from 'react';
import logo from 'logo.svg';
import {levels as config} from 'config/memory-mosaic'

import Cell from './components/Cell'
import Row from './components/Row'


const CELL_COUNT = 'cellCount';
const FIELD_SIZE = 'fieldSize';


class MemoryMosaic extends PureComponent {
  state = {
    visible: false,
    hash: {},
    field: [],
    currentLevel: 0,
    guessedCells: 0
  }

  // onSuccessCellClick = (state) => ({hash: {...state.hash, [key]: true}, guessedCells: state.guessedCells + 1 })

  checkLevelCompletition = () =>
    (console.log(this.state.guessedCells, config[this.state.currentLevel][CELL_COUNT]), (this.state.guessedCells === config[this.state.currentLevel][CELL_COUNT] && this.startNewLevel()))

  // checkLevelCompletition = (state) => console.log(state);

  startNewLevel = () => (
    this.setState(
      (state) => ({currentLevel: state.currentLevel + 1}),
      this.initGame()
    )
  )

  onCellClick = (x, y) => () => {
    const { hash } = this.state
    const { gameOver, onSuccessCellClick, checkLevelCompletition } = this
    const key = [String(x) + y]

    if (key in hash) {
      this.setState(
        (state) => ({hash: {...state.hash, [key]: true}, guessedCells: state.guessedCells + 1 }),
        checkLevelCompletition
      )

    } else
      gameOver()
  }

  gameOver = () => console.log('looser')

  drawField = () => {
    const { visible, hash, field, currentLevel } = this.state
    const { onCellClick } = this

    return field.map((e, x) =>
      (<Row height={field.length} keyValue={x}>
        {e.map((element, y) => (
          <Cell 
            keyValue={x + y + 1}
            size={field.length}
            onClick={!visible && onCellClick(x, y)}
            highlighted={(visible && element) || hash[String(x) + y]}
          />
        ))}
      </Row>)
    )
  }

  initGame = () => () => {
    const { visible, currentLevel } = this.state
    const hash = {}
    const size = config[currentLevel][FIELD_SIZE]
    const field = new Array(size).fill(0)
    const cellCount = config[currentLevel][CELL_COUNT]

    field.forEach((e, i, a) => (field[i] = new Array(size).fill(0)))

    console.log(field[0] === field[1])

    let i = 0
    while (i < cellCount) {
      const x = ~~(Math.random() * size)
      const y = ~~(Math.random() * size)
      console.log(x, y)
      field[x][y] = 1
      if (!(String(x) + y in hash)) {
        hash[String(x) + y] = 0
        i++
      }
      if (i > 50) break
    }

    console.log(field, hash);
    this.setState({field, hash, visible: true, guessedCells: 0})
    setTimeout(() => this.setState({visible: false}), 1500)
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Current level {this.state.currentLevel}</h2>
        </div>
        <div className="container">
          {this.drawField()}
        </div>
        <p onClick={this.initGame()}>
          start
        </p>
      </div>
    );
  }
}

export default MemoryMosaic;
