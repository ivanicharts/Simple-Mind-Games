import React from 'react'
import cn from 'classnames'

import { getHashKey } from '../helpers'
import { WIN_CELL, WRONG_CELL } from '../constants'

import Cell from './Cell'
import Row from './Row'

export default ({field=[], visible=false, onCellClick, hash={}, showDecoration=false}) => (
  <div className={cn({field: true, decorated: showDecoration})}>
    {
      field.map((e, x) =>

        (<Row height={field.length} keyValue={x}>

          {e.map(
            (element, y) => {
            const elem = hash[getHashKey(x, y)]
            return (
              <Cell
                keyValue={x + y + 1}
                size={field.length}
                last={elem === WIN_CELL}
                wrong={elem === WRONG_CELL}
                onClick={!visible && onCellClick(x, y)}
                highlighted={(visible && element) || elem && elem !== WRONG_CELL}
              />
            )
          }
        )
      }
    </Row>))
    }
  </div>

)
