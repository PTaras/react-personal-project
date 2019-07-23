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
       };

    _removeTask = () => {
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
        const { _updateTaskAsync, completed } = this.props;
        
        const complitedTask = this._getTaskShape({ completed: !completed });

        _updateTaskAsync(complitedTask);
    };

    _toggleTaskFavoriteState = () => {
        const { _updateTaskAsync, favorite } = this.props;
        
        const favoriteTask = this._getTaskShape({ favorite: !favorite });

        _updateTaskAsync(favoriteTask);
    };

    render () {

        const { disabled, newMessage } = this.state;

        return (
            <li className = { Styles.task } >
                <div className = { Styles.content }>
                    <Checkbox className = { Styles.toggleTaskCompletedState } 
                              onClick = { this._toggleTaskCompletedState } />
                    <input disabled = { disabled } 
                           maxLength = "50" 
                           type = "text" 
                           onChange = { this._updateNewTaskMessage }
                           value = { newMessage }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star 
                        className = { Styles.toggleTaskFavoriteState }
                        onClick = { this._toggleTaskFavoriteState }
                        />
                    <Edit 
                        className = { Styles.updateTaskMessageOnClick } 
                        onClick = { this._editTask } 
                         />
                    <Remove onClick = { this._removeTask } />
                </div>
            </li>
        );
    }
}
