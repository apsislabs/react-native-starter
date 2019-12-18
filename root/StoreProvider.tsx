
import React from 'react';
import { Provider } from 'react-redux';

import { initializeStore } from './store'; 

export class StoreProvider extends React.Component<any, any> {
    constructor(props: any) {
      super(props);
  
      this.state = { store: initializeStore() };
    }

    render() {
        return <>
          <Provider store={this.state.store} >
            {this.props.children}
          </Provider>
        </>
      }
}