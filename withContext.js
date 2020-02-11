import { forwardRef } from 'react'

function provide(WrappedComponent, Context) {
    return forwardRef((props, ref) => (
            <Context.Component>
                <WrappedComponent
                    ref={ref}
                    {...props}
                />
            </Context.Component>
        )
    )
}

function consume(WrappedComponent, Context, propName) {
    return forwardRef((props, ref) => (
            <Context.Consumer>
                {
                    context => (
                        <WrappedComponent
                            ref={ref}
                            {...props}
                            __contexts={{
                                ...(props.__contexts || {}),
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
        let WrappedComponent = forwardRef((props, ref) => (
                <BaseComponent
                    ref={ref}
                    {...props}
                />
            )
        )
        if (context && context.consume) {
            for (const key in context.consume) {
                WrappedComponent = consume(WrappedComponent, context.consume[key], key)
            }
        }
        if (context && context.provide) {
            for (const item of context.provide) {
                WrappedComponent = provide(WrappedComponent, item)
            }
        }
        WrappedComponent.getInitialProps = BaseComponent.getInitialProps
        return WrappedComponent
    }
}
