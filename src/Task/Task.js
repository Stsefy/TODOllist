import { Component } from 'react';
import './Task.css';

class Task extends Component {
  adjustEnter = ({ currentTarget }) => currentTarget.classList.add('show');
  adjustLeave = ({ currentTarget }) => currentTarget.classList.remove('show');

  render() {
    const { task, checkTask, dropTask } = this.props;
    const formatDate = (date) => {
      const formatDateComponent = (part) => (part < 10 ? '0' : '') + part;
  
      const now = new Date(date);
      const day = formatDateComponent(now.getDate());
      const month = formatDateComponent(now.getMonth() + 1);
      const year = now.getFullYear();
      const hours = formatDateComponent(now.getHours());
      const minutes = formatDateComponent(now.getMinutes());
      const seconds = formatDateComponent(now.getSeconds());
  
      return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    };

    return (
      <li
        className={task.isDone ? "task task-done" : "task"}
        onMouseEnter={this.adjustEnter}
        onMouseLeave={this.adjustLeave}
      >
        <input
          className="app__checkbox task__checkbox"
          type="checkbox"
          checked={task.isDone}
          onChange={checkTask}
        />
        <div className="text-wrapper">
          <p className="task__title">{task.title}</p>
          <p className="task__desc">{task.desc}</p>
        </div>
        <div className="wrapper">
          <p className="task__created">{formatDate(task.created)}</p>
          <button className="app__button task__button" onClick={dropTask}>
            Удалить
          </button>
        </div>
      </li>
    );
  }
}

export default Task;