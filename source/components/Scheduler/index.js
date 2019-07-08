// Core
import React, { Component } from 'react';
import { v4 } from 'uuid';
import moment from 'moment';

//Components
import { withProfile } from 'components/HOC/withProfile';
import Spinner from 'components/Spinner';
import Task from '../Task';
import Checkbox from 'theme/assets/Checkbox';

// Instruments
import Styles from './styles.m.css';
import { delay } from 'instruments';
import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')
@withProfile
export default class Scheduler extends Component {

    state = {
         tasks: [],
         message: '',
        };

    _setTaskSpinningState = (state) => {
        this.setState({
        isTaskSpinning: state,
        });
    }

    _createTask = async (message) => {
        this._setTaskSpinningState(true);

        const task = {
            id:          v4(),
            completed:  false,
            favorite:   false,
            message,
        };

        await delay(1200);

        this.setState(({ tasks }) => ({
            posts:          [task, ...tasks],
            isTaskSpinning: false,
        }));
    }

    _updateMessage = (event) => {
        this.setState({
            message: event.target.value,
        });
    }

    _submitMessage = (event) => {
        event.preventDefault();
        const { message } = this.state;

        if (!message) {
            return null;
        }

        this.props._createTask(message);

        this.setState({
            message: '',
        });
    }

    render () {

        const { tasks, isTaskSpinning } = this.state;

        const tasksJSX = tasks.map((task) => {
            return <Task key = { task.id } { ...tasks } />
        })

        return (
            <section className = { Styles.scheduler }>
                <Spinner isSpinning = { isTaskSpinning } />
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input placeholder="Find" type="Search"/>
                    </header>
                    <section>
                        <form onSubmit = { this._submitMessage }>
                            <input onChange = { this._updateMessage }  maxLength = "50" placeholder = "Description new task" type = "text"></input>
                            <button>Add task</button>
                        </form>
                        <div>
                            <ul>
                                 <div>
                                    <Task />
                                    {tasksJSX}
                                </div>
                            </ul>
                        </div>
                    </section>
                        {tasksJSX}
                    <footer>
                        <div><Checkbox /></div>
                        <span className = { Styles.completeAllTasks }>All tasks complited!</span>
                    </footer>
                </main>
            </section>
        );
    }
}
