import { createContext, useContext, useState } from 'react';
import { BASE_URL } from '../BaseURL/BaseURL';
import { HideModal } from "../Components/Shared";
import Swal from "sweetalert";

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
        Swal({
          title: "Error",
          text: "Error : " + error.message,
          icon: "error",
        });
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
          Swal({
            title: "Success",
            text: "Task added successfully",
            icon: "success",
          }).then(() => {
            HideModal();
            fetchTasks();
          });
        } else {
          Swal({
            title: "Error",
            text: "Failed to add task",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        Swal({
          title: "Error",
          text: "Error : " + error.message,
          icon: "error",
        });
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
          Swal({
            title: "Success",
            text: "Task removed successfully",
            icon: "success",
          }).then(() => {
            fetchTasks();
          });
        } else {
          Swal({
            title: "Error",
            text: "Failed to remove task",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        Swal({
          title: "Error",
          text: "Error : " + error.message,
          icon: "error",
        });
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
        Swal({
          title: "Error",
          text: "Error : " + error.message,
          icon: "error",
        });
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
