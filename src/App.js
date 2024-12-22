import { Component } from "react";
import Task from "./Task/Task";
import "./App.css";

const sortByDone = (arrayOfObj) =>
  arrayOfObj.sort((obj1, obj2) => +obj1.isDone > +obj2.isDone);

class App extends Component {
  state = {
    title: "",
    desc: "",
    isFiltered: false,
    tasks: [],
  };

  adjustTitle = ({ target }) => this.setState({ title: target.value });
  adjustDesc = ({ target }) => this.setState({ desc: target.value });
  adjustFilter = () => this.setState({ isFiltered: !this.state.isFiltered });

  addTask = (e) => {
    e.preventDefault();
    this.setState({
      title: "",
      desc: "",
      isFiltered: this.state.isFiltered,
      tasks: sortByDone([
        ...this.state.tasks,
        {
          title: this.state.title,
          desc: this.state.desc,
          created: Date.now(),
          isDone: false,
        },
      ]),
    });
  };

  checkTask = (index) => {
    this.setState({
      tasks: sortByDone(
        this.state.tasks.map((task, i) => {
          if (index === i) {
            return {
              ...task,
              isDone: !task.isDone,
            };
          }
          return task;
        })
      ),
    });
  };

  dropTask = (index) => {
    this.setState({
      tasks: this.state.tasks.filter((task, i) => i !== index),
    });
  };

  render() {
    const hasTitleWrong = (title) =>
      title === "" || title.length !== title.trim().length;
    const hasAddBtnDisabled = hasTitleWrong(this.state.title);
    const tasks = this.state.isFiltered
      ? this.state.tasks.filter((t) => !t.isDone)
      : this.state.tasks;

    return (
      <div className="app">
        <h1>Список задач</h1>
        <form className="app__form">
          <div className="input-wrapper">
            <input
              className="app__input"
              type="text"
              placeholder="Введите название задачи"
              value={this.state.title}
              onChange={this.adjustTitle}
            />
            <textarea
              name="story"
              rows="3"
              placeholder="Введите описание задачи"
              value={this.state.desc}
              onChange={this.adjustDesc}
            />
          </div>
          <button
            className="app__button"
            disabled={hasAddBtnDisabled}
            onClick={this.addTask}
          >
            Добавить
          </button>
        </form>
        <p className="app__filter">
          <span className="app__filter__title">ФИЛЬТР:</span>
          <input
            className="app__checkbox"
            type="checkbox"
            onChange={this.adjustFilter}
          />
          Только невыполненные
        </p>
        <ul className="app__list">
          {tasks.length ? (
            tasks.map((task, i) => (
              <Task
                key={i}
                task={task}
                checkTask={() => this.checkTask(i)}
                dropTask={() => this.dropTask(i)}
              />
            ))
          ) : (
            <p>Список задач пуст!</p>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
