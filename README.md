# react-context-hoc

```js
import withContext from './withContext'
import AContext from './contexts/A'
import BContext from './contexts/B'

// Provides AContext.
@withContext({
    provide: [AContext],
})

// Comsumes AContext.
@withContext({
    consume: {
        aContext: AContext,
    },
})

// Provides AContext, and comsumes AContext and BContext.
@withContext({
    provide: [AContext],
    consume: {
        aContext: AContext,
        bContext: BContext,
    },
})

// You can access the consumed contexts from your class's props.
export default class extends PureComponent {
    ...
    render() {
        const { aContext, bContext } = this.props
        ...
    }
    ...
}
```
