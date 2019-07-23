// Core
import React, { Component }from 'react';  

//Components
import { withProfile } from 'components/HOC/withProfile';
import Spinner from 'components/Spinner';
import Task from '../Task';
import Checkbox from 'theme/assets/Checkbox';
import Catcher from 'components/Catcher';

// Instruments
import Styles from './styles.m.css';
import { delay } from 'instruments';
import { api, TOKEN } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')
@withProfile
export default class Scheduler extends Component {

    state = {
         tasks: [],
         message: '',
         completed: false,
        };

    componentDidMount () {
        this._fetchTaskAsync();
    }

    _setTaskSpinningState = (state) => {
        this.setState({
        isTaskSpinning: state,
        });
    }

    _fetchTaskAsync = async () => {
        this._setTaskSpinningState(true);

        const response = await fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: TOKEN
            },
        });

        const { data: tasks } = await response.json();

        this.setState({
            tasks,
            isTaskSpinning: false,
        });
    };

    _createTaskAsync = async (message) => {
        this._setTaskSpinningState(true);

        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: TOKEN
            },
            body: JSON.stringify({ message }),
        });

        const { data: task } = await response.json();

        this.setState(({ tasks }) => ({
            tasks:          [task, ...tasks],
            isTaskSpinning: false,
        }));
    }

    _removeTaskAsync = async (id) => {
        this._setTaskSpinningState(true); 

        await fetch(`${api}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': TOKEN,
            },
        });

        this.setState({
            tasks: this.state.tasks.filter((task) => task.id !== id), 
            isTaskSpinning: false, 
        });
    }

    _updateTaskAsync = (event) => {
        this.setState({
            message: event.target.value,
        });
    }

    _handleTaskSubmit = (event) => {
        event.preventDefault();
        this._submitMessageAsync();
    }

    _submitMessageAsync = async () => {
        const { message } = this.state;

        if (!message) {
            return null;
        }

        await delay(1200);

        this._createTaskAsync(message);

        this.setState({
            message: '',
        });
    }

    _submitOnEnter = (event) => {
        const enterKey = event.key === 'Enter';

        if (enterKey) {
            event.preventDefault();
            this._submitMessage();
        }
    }

    _completedTasks = () => {
        this.setState({ 
            completed: true,
        });
    };

    _getAllCompleted = async (completed) => {

        this._setTaskSpinningState(true); 

        await delay(1000);

        this.setState({
            tasks: this.state.tasks.map((task) => task.completed === completed), 
            isTaskSpinning: false, 
        });
    }

    render () {

        const { tasks, isTaskSpinning, message, completed } = this.state;

        const tasksJSX = tasks.map((task) => {
            return (
                <Catcher key = { task.id }>
                    <Task 
                        { ...task } 
                        _updateTaskAsync = {this._updateTaskAsync} 
                        _removeTaskAsync = { this._removeTaskAsync } 
                        value = {event}
                        />
                </Catcher>
            );
        });

        return (
            <section className = { Styles.scheduler }>
                <Spinner isSpinning = { isTaskSpinning } />
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input placeholder="Find" type="Search"/>
                    </header>
                    <section>
                        <form onSubmit = { this._handleTaskSubmit }>
                            <input onChange = { this._updateTaskAsync } 
                                   onKeyPress = { this._submitOnEnter } 
                                   value = { message } 
                                   maxLength = "50" 
                                   placeholder = "Description new task" 
                                   type = "text">
                            </input>
                            <button>Add task</button>
                        </form>
                        <div>
                            <ul>
                                <div>
                                    {tasksJSX}
                                </div>
                            </ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox className = { Styles.toggleTaskCompletedState } 
                                  completed = { completed } />
                        <span className = { Styles.completeAllTasks }>All tasks complited!</span>
                    </footer>
                </main>
            </section>
        );
    }
}
