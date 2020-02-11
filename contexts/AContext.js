import { createContext, PureComponent } from 'react';

const defaultValue = {};

const Context = createContext(defaultValue);

class Component extends PureComponent {
	state = {
		...defaultValue
	};

	render() {
		return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
	}
}

Context.Component = Component;

export default Context;
