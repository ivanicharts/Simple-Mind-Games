import React, { PureComponent } from 'react';
import logo from 'logo.svg';
import {levels as config} from 'config/memory-mosaic'

import Cell from './components/Cell'
import Row from './components/Row'

import './style/index.scss'

const CELL_COUNT = 'cellCount';
const FIELD_SIZE = 'fieldSize';

const getHashKey = (x, y) => String(x) + y


class MemoryMosaic extends PureComponent {
  state = {
    visible: false,
    hash: {},
    field: [],
    currentLevel: 0,
    guessedCells: 0,
    lastGuessedCell: 0
  }

  // onSuccessCellClick = (state) => ({hash: {...state.hash, [key]: true}, guessedCells: state.guessedCells + 1 })

  checkLevelCompletition = () =>
    ((this.state.guessedCells === config[this.state.currentLevel][CELL_COUNT]) && setTimeout(this.startNewLevel, 1000))

  // checkLevelCompletition = (state) => console.log(state);

  startNewLevel = () => (
    this.initGame(this.state.currentLevel + 1)(),
    this.setState(
      (state) => (console.log('state', state), ({currentLevel: state.currentLevel + 1}))
    )
  )

  onCellClick = (x, y) => () => {
    const { hash } = this.state
    const { finishGame, onSuccessCellClick, checkLevelCompletition } = this
    const key = [String(x) + y]

    if (key in hash) {
      hash[key] === 0 && this.setState(
        (state) => ({
          hash: {...state.hash, [key]: (state.guessedCells + 1) === config[this.state.currentLevel][CELL_COUNT] ? 2 : true},
          guessedCells: state.guessedCells + 1,
          lastGuessedCell: String(key)
        }),
        checkLevelCompletition
      )

    } else {
      this.setState((prev) => ({hash: {...prev.hash, [key]: 3}}))
      finishGame()
    }
  }

  finishGame = () => {
    console.log('looser');
    this.setState({visible: true})
    setTimeout(this.initGame(this.state.currentLevel), 1000)
  }

  foo = () => {
    var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    var [a1, a2] = a.reduce((xs, s) => s % 2 ? (xs[0].push(s), xs) : (xs[1].push(s), xs) ,[[], []])
  }

  drawField = () => {
    const { visible, hash, field, currentLevel, guessedCells, lastGuessedCell } = this.state
    const { onCellClick } = this

    // REPLACE 2, 3, truef with CONSTANTS
    return field.map((e, x) =>
      (<Row height={field.length} keyValue={x}>
        {e.map((element, y) => {
          const hashKey = getHashKey(x, y)
          const elem = hash[hashKey]
          return (
            <Cell
              keyValue={x + y + 1}
              size={field.length}
              last={elem === 2}
              wrong={elem === 3}
              onClick={!visible && onCellClick(x, y)}
              highlighted={(visible && element) || elem && elem !== 3}
            />
          )
        }
      )}
      </Row>)
    )
  }

  startGame = () => this.setState({currentLevel: 0}, this.initGame(0))
  initGame = (currentLevel) => () => {
    const { visible } = this.state
    const hash = {}
    const size = config[currentLevel][FIELD_SIZE]
    const field = new Array(size).fill(0)
    const cellCount = config[currentLevel][CELL_COUNT]

    field.forEach((e, i, a) => (field[i] = new Array(size).fill(0)))

    console.log('init new game')

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
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Current level {this.state.currentLevel}</h2>
        </div>
        <div className='memory-mosaic'>
           <div className='container'>
            {this.drawField()}
          </div>
          <p onClick={this.startGame}>
            start
          </p>
        </div>
      </div>
    );
  }
}

export default MemoryMosaic;
