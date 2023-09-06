import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import { styled } from "styled-components";
import { useTodoContext } from "../context/TodoProvider";
import { showModal, HideModal } from "../Components/Shared";
import Loader from '../Components/Loader';

const Main = () => {
  const [description, setDescription] = useState();
  const [title, setTitle] = useState();
  const {  fetchTasks,HandleAddTask,task, HandleDeleteTask, HandleEditTask, isLoading } = useTodoContext();
  useEffect(() => {
    fetchTasks()
  }, []);

  return (
    <MainPage>
      <div id="Main-Screen">
        {isLoading && <Loader />}
        <Header />
        <div id="content">
          <div id="main-content">
            {task &&
              task.map((tasks) => (
                <div key={tasks._id} id="task-card">
                  <input
                    type="checkbox"
                    className="check"
                    checked={tasks.completed === true ? "checked" : ""}
                  ></input>
                  <div className="title">
                    <h5 className={tasks.completed === true ? "completed" : ""}>
                      {tasks.title} 
                    </h5>
                    <p className={tasks.completed === true ? "completed" : ""}>
                      "{tasks.description}"
                    </p>
                  </div>
                  <div
                    className="buttons"
                  onClick={() => {
                    HandleEditTask(tasks._id);
                  }}
                  >
                    <Link>
                      <button className="btn-edit">
                        <i class="fa fa-solid fa-check-double"></i>
                      </button>
                    </Link>
                    <Link>
                      <button
                        className="btn-delete"
                      onClick={() => {
                        HandleDeleteTask(tasks._id);
                      }}
                      >
                        <i class="fa fa-solid fa-trash"></i>
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
          <button className="btn-add" onClick={() => showModal()}>
            <Link>
              <i class="fa fa-solid fa-plus add-icon"></i>
            </Link>
          </button>
        </div>
        <div id="Modal">
          <div id="addTodo">
            <h1>Add Task</h1>
            <label>Enter Title For Task:</label>
            <input
              required
              type="text"
              className="add-input"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
            <br></br>
            <label>Enter Description For Task:</label>
            <textarea
              required
              cols="5"
              rows="4"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
            <br></br>
            <div className="add-links">
              <Link className="addbutton" onClick={() => HandleAddTask(title, description)}>
                Add Task
              </Link>
              <Link className="addbutton" onClick={() => HideModal()}>
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainPage>
  );
};

export default Main;

const MainPage = styled.div`
#Modal {
  z-index: 1;
  display: none;
}
#addTodo {
  width: 50%;
  height: min-content;
  background-color: #b7dbf3;
  text-align: center;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  align-items: center;
  padding: 1rem;
  font-weight: bolder;
  position: absolute;
  top: 15%;
  left: 25%;
  border-radius: 4rem;
  box-shadow: 5px 5px 10px #1a3242;
}

.add-input {
  border: none;
  height: 3rem;
  width: 60%;
}

textarea {
  border: none;
  height: 5rem;
  width: 60%;
}

.addbutton {
  background-color: #1a3242;
  color: white;
  padding: 1rem;
  font-size: 15px;
  border: none;
  border-radius: 0.5rem;
  text-decoration: none;
  margin-left: 0.5rem;
  cursor: pointer;
}

.add-links {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
#content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
  background-color: #f7f9fbcd;
  margin-left: 15%;
  align-items: center;
  box-shadow: 5px 5px 5px 5px #818b92ad;
}
.blur {
  filter: blur(20px);
}
#main-content {
  width: 70%;
}

.title {
  display: inline-flex;
  align-items: center;
}
.title p {
  margin-left: 0.5rem;
}
#task-card {
  background-color: #acacac;
  color: #1a3242;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  border-radius: 1rem;
  box-shadow: 2px 2px 2px 2px #818b92ad;
}

.add-icon {
  font-size: inherit;
  color: white;
}
.btn-add {
  background-color: #1a3242;
  color: rgb(255, 255, 255);
  text-decoration: none;
  border: none;
  border-radius: 50%;
  margin-left: 70%;
  padding: 1rem 1.5rem;
  font-size: 1.5rem;
}

.buttons {
  display: flex;
  align-items: center;
  margin-right: 1rem;
}

.btn-edit {
  background-color: green;
  color: white;
  width: min-content;
  height: 2rem;
  border: transparent;
  border-radius: 0.5rem;
  cursor: pointer;
}
.btn-delete {
  background-color: red;
  color: white;
  width: min-content;
  height: 2rem;
  border: transparent;
  margin-left: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #1b032d6e; /* Adjust the opacity as needed */
  backdrop-filter: blur(100px);
  z-index: -1; /* Ensure the blurred background is behind the modal */
}

input[type="checkbox"] {
  /* Hide the default checkbox appearance */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  /* Create a custom checkbox */
  width: 18px;
  height: 18px;
  border: 2px solid rgb(126, 126, 123);
  border-radius: 0.2rem;
  background-color: white;
  outline: none;
  cursor: pointer;
}

/* Style the checkbox when checked */
input[type="checkbox"]:checked {
  background-color: green;
}

.completed {
  text-decoration: line-through;
  color: green;
}
`;