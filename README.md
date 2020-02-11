# react-context-hoc

```js
import withContext from './withContext'
import AContext from './contexts/A'
import BContext from './contexts/B'

// Provides AContext.
@withContext({
    providers: [AContext],
})

// Comsumes AContext.
@withContext({
    consumers: {
        aContext: AContext,
    },
})

// Provides AContext, and comsumes AContext and BContext.
@withContext({
    providers: [AContext],
    consumers: {
        aContext: AContext,
        bContext: BContext,
    },
})

```
