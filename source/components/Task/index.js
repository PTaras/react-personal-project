// Core
import React, { PureComponent } from 'react';

// Components
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';
import Checkbox from 'theme/assets/Checkbox';
import Edit from 'theme/assets/Edit';
import Remove from 'theme/assets/Remove';
import Star from 'theme/assets/Star';
@withProfile
export default class Task extends PureComponent {
    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });
    
    state = {
        message: '',
    };
    render () {

        const { message } = this.state;
    
        return (
            <li className = { Styles.task }>
            <div className = { Styles.content }>
                <div className = { Styles.toggleTaskCompletedState }><Checkbox />
                    </div>
                    <input disabled maxLength = "50" type = "text" value = { message } />
                </div>
            <div className = { Styles.actions }>
                <div className = { Styles.toggleTaskFavoriteState } ><Star /></div>
                <div className = { Styles.updateTaskMessageOnClick }><Edit /></div>
                <Remove />
            </div>
        </li>
        );
    }
}
