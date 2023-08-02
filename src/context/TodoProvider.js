import { createContext, useContext, useState } from 'react';
import { BASE_URL } from '../BaseURL/BaseURL';
import { showErrorToastMessage, showSuccessToastMessage } from '../Components/Message';
import { HideModal } from "../Components/Shared";

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const [task, setTask] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchTasks = () => {
    setIsLoading(true);
    let tasks = [];
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `JWT ${token}`);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${BASE_URL}/me`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          tasks = result.tasks
          setTask(tasks);
          setIsLoading(false);
        } 
      })
      .catch((error) => {
        showErrorToastMessage("Error : " + error.message)
      });
  };
  const HandleAddTask = (title, description) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `JWT ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      title: title,
      description: description,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${BASE_URL}/addtask`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          showSuccessToastMessage("Task added successfully");
          HideModal();
          fetchTasks(); 
        } else {
          showErrorToastMessage("Failed to add task");
        }
      })
      .catch((error) => {
        showErrorToastMessage("Error : " + error.message)
      });
  };
  const HandleDeleteTask = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `JWT ${token}`);
    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${BASE_URL}/removeTask/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          fetchTasks();
          showSuccessToastMessage("Task Removed Successfully");
        } else {
          showErrorToastMessage("Failed to remove task");
        }
      })
      .catch((error) => {
        showErrorToastMessage("Error : " + error.message)
      });
  };
  const HandleEditTask = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `JWT ${token}`);
    var raw = "";

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${BASE_URL}/updatetask/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        fetchTasks(); 
      })
      .catch((error) => {
        showErrorToastMessage("Error : " + error.message)
      });
  };
  return (
    <TodoContext.Provider value={{ fetchTasks, HandleAddTask, task, HandleDeleteTask, HandleEditTask, isLoading, setIsLoading }}>
      {children}
    </TodoContext.Provider>
  );
}

const useTodoContext = () => {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error("Auth context must be used with in auth provider")
  }
  return context;
}


export { TodoProvider, useTodoContext };
