import { forwardRef } from 'react'

function addProvider(WrappedComponent, Context) {
    return forwardRef(({
        __context_accum__: parentContext = {},
        ...ownProps
    }, ref) => (
            <Context.Component>
                <WrappedComponent
                    {...ownProps}
                    ref={ref}
                    __context_accum__={{
                        ...parentContext,
                    }}
                />
            </Context.Component>
        )
    )
}

function addConsumer(WrappedComponent, Context, propName) {
    return forwardRef(({
        __context_accum__: parentContext = {},
        ...ownProps
    }, ref) => (
            <Context.Consumer>
                {
                    context => (
                        <WrappedComponent
                            {...ownProps}
                            ref={ref}
                            __context_accum__={{
                                ...parentContext,
                                ...context,
                            }}
                            {...{
                                [propName]: context,
                            }}
                        />
                    )
                }
            </Context.Consumer>
        )
    )
}

export default function (context) {
    return BaseComponent => {
        let WrappedComponent = forwardRef(({
            __context_accum__: raw,
            ...ownProps,
        }, ref) => (
                <BaseComponent
                    {...ownProps}
                    ref={ref}
                />
            )
        )
        if (context && context.consumers) {
            for (const key in context.consumers) {
                WrappedComponent = addConsumer(WrappedComponent, context.consumers[key], key)
            }
        }
        if (context && context.providers) {
            for (const provider of context.providers) {
                WrappedComponent = addProvider(WrappedComponent, provider)
            }
        }
        WrappedComponent.getInitialProps = BaseComponent.getInitialProps
        return WrappedComponent
    }
}
