// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

// Components
import Catcher from 'components/Catcher';
import Scheduler from 'components/Scheduler';
import { Provider } from 'components/HOC/withProfile';

@hot(module)
export default class App extends Component {
    render () {
        return (
            // <Catcher>
                <Provider>
                    <Scheduler />
                </Provider>
            // {/* </Catcher> */}
        );
    }
}
