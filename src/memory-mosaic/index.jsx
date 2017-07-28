import React, { PureComponent } from 'react';
import logo from 'logo.svg';
import config, {levels} from 'config/memory-mosaic'

import Cell from './components/Cell'
import Row from './components/Row'
import Lives from './components/Lives'
import Spinner from 'shared/icons/Spinner'

import './style/index.scss'

const CELL_COUNT = 'cellCount';
const FIELD_SIZE = 'fieldSize';

const getHashKey = (x, y) => String(x) + y


class MemoryMosaic extends PureComponent {
  state = {
    visible: false,
    lives: config.lives,
    hash: {},
    field: [],
    currentLevel: 0,
    guessedCells: 0,
    lastGuessedCell: 0,
    ready: true,
    gameIsLost: false
  }

  // onSuccessCellClick = (state) => ({hash: {...state.hash, [key]: true}, guessedCells: state.guessedCells + 1 })

  checkLevelCompletition = () =>
    ((this.state.guessedCells === levels[this.state.currentLevel][CELL_COUNT]) && setTimeout(this.startNewLevel, 1000))

  // checkLevelCompletition = (state) => console.log(state);

  startNewLevel = () => (
    this.initGame(this.state.currentLevel + 1)(),
    this.setState(
      (state) => (console.log('state', state), ({currentLevel: state.currentLevel + 1}))
    )
  )

  onCellClick = (x, y) => () => {
    const { hash } = this.state
    const { finishRound, onSuccessCellClick, checkLevelCompletition } = this
    const key = [String(x) + y]

    if (key in hash) {
      hash[key] === 0 && this.setState(
        (state) => ({
          hash: {...state.hash, [key]: (state.guessedCells + 1) === levels[this.state.currentLevel][CELL_COUNT] ? 2 : true},
          guessedCells: state.guessedCells + 1,
          lastGuessedCell: String(key)
        }),
        checkLevelCompletition
      )

    } else {
      this.setState((prev) => ({hash: {...prev.hash, [key]: 3}}))
      finishRound()
    }
  }

  finishGame = () => this.setState({gameIsLost: true, field: []})

  finishRound = () => (
    this.setState(prev => ({visible: true, lives: prev.lives - 1}), () => (
        setTimeout(this.state.lives > 0 ? this.initGame(this.state.currentLevel) : this.finishGame, 1000)
    ))
  )


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

  startGame = () => this.setState({currentLevel: 0, lives: config.lives}, this.initGame(0))
  initGame = (currentLevel) => () => {
    const { visible } = this.state
    const hash = {}
    const size = levels[currentLevel][FIELD_SIZE]
    const field = new Array(size).fill(0)
    const cellCount = levels[currentLevel][CELL_COUNT]

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
    this.setState({field, hash, visible: true, guessedCells: 0, ready: true})
    setTimeout(() => this.setState({ready: false}), config.preloadTime * 1000 + 100)
    setTimeout(() => this.setState({visible: false}), config.preloadTime * 1000 + config.visibleTime * 1000)
  }

  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Current level {this.state.currentLevel}</h2>
        </div>
        <div className='memory-mosaic'>

          {!!this.state.field.length ?
            <div className='game-container'>
              {
                this.state.ready &&
                <div className='preloader'>
                  <Spinner />
                  <p>Ready ?</p>
                </div>
              }
                <div>
                  <Lives count={config.lives} alive={this.state.lives} />
                  <div className='field'>
                    {this.drawField()}
                  </div>
                </div>
            </div>
            :
            <p className='cursor-pointer' onClick={this.startGame}>New Game</p>
          }


        </div>
      </div>
    );
  }
}

export default MemoryMosaic;
