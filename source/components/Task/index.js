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
        disabled: true,
        newMessage: '',
        valid: false,
       };

    _removeTaskAsync = () => {
        const { _removeTaskAsync, id } = this.props;

        _removeTaskAsync(id);
    }

    _editTask = () => {
        event.preventDefault();
        this.setState(({ disabled }) => ({
            disabled: !disabled,
        }));
    };

    _updateMessageAsync = () => {
        const { _updateMessageAsync, id} = this.props;

        _updateMessageAsync(id);
    }

    _updateNewTaskMessage = (event) => {
        const { value } = event.target;
        this.setState(() => {
            return {
                newMessage: value,
            };
        });
    }

    _updateTask = () => {
        const { _updateTaskAsync, id} = this.state;
        _updateTaskAsync(id);

        this.setState({
            newMessage: '',
        });
    }

    _updateTaskMessageOnClick = () => {
        event.preventDefault();
        this._updateTask();

        if (!newMessage) {
            return null;
        }

        setState({
            isTaskEditing: true,
        });
    }

    _toggleTaskCompletedState = () => {
        event.preventDefault();
        this.setState(({ completed }) => ({
            disabled: !completed,
        }));
    }

    _toggleTaskFavoriteState = () => {
        event.preventDefault();
        this.setState(({ favorite }) => ({
            favorite: !favorite,
        }));
    }

    render () {

         const { disabled, newMessage, completed, favorite } = this.state;
         const { created } = this.props;

        return (
            <li className = { Styles.task } >
                <div className = { Styles.content }>
                    <Checkbox className = { Styles.toggleTaskCompletedState } completed = { completed } />
                    <input disabled = { disabled } 
                           maxLength = "50" 
                           type = "text" 
                           onChange = { this._updateNewTaskMessage }
                           value = {newMessage}
                    />
                    <time dateTime = {moment.unix(created).format('MMMM DD hh:mm:ss')} ></time>
                </div>
                <div className = { Styles.actions }>
                    <div className = { Styles.toggleTaskFavoriteState } 
                         favorite={ favorite } >
                         <Star />
                    </div>
                    <div className = { Styles.updateTaskMessageOnClick }>
                        <Edit onClick = {this._editTask} />
                    </div>
                    <Remove onClick = { this._removeTaskAsync } />
                </div>
            </li>
        );
    }
}
