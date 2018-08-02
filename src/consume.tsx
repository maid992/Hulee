import * as React from 'react';
import { AppState } from './AppState';

/**
 * Decorator to form a HOC that acts like a react context consumer.
 * Useful when you want context to be made available in an entire component and not just in render.
 *
 * Example:
 * type MyContextProps = {foo: string};
 * const MyContext = createContext<MyContextProps>({foo: 'bar'});
 *
 * @consume(MyContext.Consumer)
 * class MyComponent extends React.Component<MyContextProps> {
 *   componentDidMount () {
 *     // Context is now available in the entire component
 *     console.log(this.props.foo);
 *   }
 *
 *   render () {
 *     return <span>{this.props.foo}</span>;
 *   }
 * }
 */
export function consume<ContextProps> (Consumer: React.Consumer<ContextProps>) {
  return function decorateConsume<T extends React.ComponentClass> (DecoratedComponent: T): T {
    class DecoratedConsumer extends React.Component {
      render () {
        const {children, ...localProps} = this.props;
        return (
          <Consumer>
            {(contextProps) => (
              <DecoratedComponent {...contextProps} {...localProps}>
                {children}
              </DecoratedComponent>
            )}
          </Consumer>
        );
      }
    }

    (DecoratedConsumer as any).displayName = DecoratedComponent.displayName || DecoratedComponent.name;

    return DecoratedConsumer as T;
  };
}

export const AppContext = React.createContext({})

export type AppContextProps = {
  state?: AppState
}

export class Provider extends React.Component<{state?: {}}> {
  render () {
    const state = this.props.state
    return (
      <AppContext.Provider value={{ state }}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}
