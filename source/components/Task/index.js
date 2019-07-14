// Core
import React, { PureComponent } from 'react';
import moment from 'moment';

// Components
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';
import Checkbox from 'theme/assets/Checkbox';
import Edit from 'theme/assets/Edit';
import Remove from 'theme/assets/Remove';
import Star from 'theme/assets/Star';
import withSvg from 'instruments/withSvg';
import { sortTasksByDate } from 'instruments';
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
        tasks: [],
        // message: '',
        disabled: true,
       };

    _removeTask = () => {
        const { _removeTask, id } = this.props;

        _removeTask(id);
    }

    _updateTask = () => {
        this.setState({
            disabled: false,
         });
      }

    render () {

         const { message, disabled} = this.state;
         const { created } = this.props;

        return (
            <li className = { Styles.task }>
            <div className = { Styles.content }>
                <div className = { Styles.toggleTaskCompletedState } ><Checkbox/></div>
                <input disabled={disabled} maxLength = "50" 
                           type = "text" 
                           onChange = { this._updateTaskMessage } 
                           value = {message}
                />
                <time dateTime = {moment.unix(created).format('MMMM DD hh:mm:ss')} >
                </time>
            </div>
            <div className = { Styles.actions }>
                <div className = { Styles.toggleTaskFavoriteState } ><Star /></div>
                <div className = { Styles.updateTaskMessageOnClick }><Edit onClick = {this._updateTask}/></div>
                <Remove onClick = { this._removeTask } />
            </div>
        </li>
        );
    }
}
