import React, { PureComponent } from 'react'

// import config, {levels} from 'config/memory-mosaic'
import { MemoryMosaicConfig as config } from 'config'
import { getHashKey, generateField } from './helpers'

import {
  WIN_CELL, WRONG_CELL, CELL,
  CELL_COUNT, FIELD_SIZE, EMPTY_CELL, MS
} from './constants'

import Field from './components/Field'
import Lives from './components/Lives'
import Spinner from 'shared/icons/Spinner'

import TapSound from 'assets/sounds/tap.mp3'
import LooseSound from 'assets/sounds/looser.mp3'
import MissSound  from 'assets/sounds/missTap.mp3'


import './style/index.scss'

const { levels } = config

class MemoryMosaic extends PureComponent {
  state = {
    visible: false,
    lives: this.props.lives,
    hash: {},
    field: [],
    currentLevel: this.props.currentLevel,
    guessedCells: 0,
    ready: true,
    gameIsLost: false,
    tapSound: new Audio(TapSound),
    looseSound: new Audio(LooseSound),
    missTapSound: new Audio(MissSound)
  }

  checkLevelCompletition = () => (
    (this.state.guessedCells === levels[this.state.currentLevel][CELL_COUNT]) &&
    setTimeout(this.onLevelSuccess, config.timeBeforeNewLevelStart * MS)
  )

  onLevelSuccess = () => {
    this.setState({ready: false})
    this.props.onLevelSuccess()
  }

  startNewLevel = ({level, field, hash}) => (
    this.initGame({hash, field})(),
    this.setState(
      (state) => ({currentLevel: level})
    )
  )

  onCellClick = (x, y) => () => {
    const { hash, tapSound, missTapSound } = this.state
    const { finishRound, checkLevelCompletition } = this
    const key = getHashKey(x, y)

    if (key in hash) {
      if (hash[key] === 0) {
        tapSound.play()
        this.setState(
          (state) => ({
            hash: {
              ...state.hash,
              [key]: (state.guessedCells + 1) === levels[this.state.currentLevel][CELL_COUNT] ? WIN_CELL : CELL
            },
            guessedCells: state.guessedCells + 1,
          }),
          checkLevelCompletition
       )
      }
    } else {
      missTapSound.play()
      this.setState((prev) => ({hash: {...prev.hash, [key]: WRONG_CELL}}))
      finishRound()
    }
  }

  finishGame = () => (
    this.state.looseSound.play(),
    this.setState({gameIsLost: true, field: []})
  )

  finishRound = () => (
    this.setState(prev => ({visible: true, lives: prev.lives - 1}), () => (
        setTimeout(
          // this.props.lives > 0 ? this.initGame(this.state.currentLevel) :
          // this.props.onLevelFail()
          this.props.onLevelFail, config.timeBeforeNewLevelStart * MS
        )
    ))
  )

  startGame = () => this.setState({currentLevel: 0, lives: config.lives}, this.initGame(0))

  initGame = ({field, hash}) => () => {
    // const fieldSize = levels[currentLevel][FIELD_SIZE]
    // const cellCount = levels[currentLevel][CELL_COUNT]
    // const {field, hash} = generateField({fieldSize, cellCount, CELL, EMPTY_CELL})

    console.log('try to start game', field, hash)

    this.setState({field, hash, visible: true, guessedCells: 0, ready: true})
    setTimeout(() => this.setState({ready: false}), config.preloadTime * MS + 100)
    setTimeout(() => this.setState({visible: false}), config.preloadTime * MS + config.visibleTime * MS)
  }

  componentDidMount = () => {
    this.initGame(this.props)()
  }

  componentWillReceiveProps(nextProps) {
    this.startNewLevel(nextProps)
  }

  render() {
    return (
      <div className='memory-mosaic-wrapper'>
        <div className='memory-mosaic-header'>
          <div className='title'>Memory Mosaic</div>
          <div>Level {this.state.currentLevel}</div>
        </div>
        <div className='memory-mosaic'>
          {
            !!this.state.field.length ?
            <div className='game-container'>
              {
                this.state.ready &&
                <div className='preloader'>
                  <Spinner />
                  <p>Ready ?</p>
                </div>
              }
              <Lives count={config.lives} alive={this.state.lives} />
              <Field
                visible={this.state.visible}
                hash={this.state.hash}
                field={this.state.field}
                onCellClick={this.onCellClick}
                showDecoration={!this.state.ready}
              />
            </div>
            :
            <p className='cursor-pointer' onClick={this.startGame}>New Game</p>
          }
        </div>
      </div>
    )
  }
}

export default MemoryMosaic
