import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import * as c from 'shared/constants/routes'
import * as p from 'pages'

export default () => (
  <Router>
    <Switch>
      <Route exact path={c.HOME} component={p.HOME} />
      <Route path={c.MEMORY} component={p.MemoryMosaic} />
      <Route path={c.MEMORY_ONLINE} component={p.MemoryMosaicOnline} />
    </Switch>
  </Router>
)
