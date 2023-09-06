//Imports
import image from "../Assets/tasklist.png";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const FirstScreen = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    let token = localStorage.getItem("token");
    token ? navigate("/Main") : navigate("/login");
  };
  return (
    <FirstLayout>
      <div id="first-screen">
        <div className="content">
          <h1>To-Do List Web App</h1>
          <p>
            Become focused, organized, and calm with Todoist. The fastest way to
            get tasks out of your head.Reach that mental clarity you’ve been
            longing for.
          </p>
          <button className="pushable" onClick={()=>handleClick()}>
            <span className="front">Let's Get Started</span>
          </button>
        </div>
        <div id="image">
          <img src={image} alt="tasklist"></img>
        </div>
      </div>
    </FirstLayout>
  );
};

export default FirstScreen;

const FirstLayout = styled.section`
#first-screen {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-top: 7%;
  gap: 3rem;
}
.content {
  width: 30%;
  text-align: center;
}
.content p {
  font-size: 1.2rem;
  font-weight: 200;
  line-height: 2rem;
}
.content h1 {
  font-weight: 900;
  font-size: 2rem;
}
#image {
  width: 25%;
  background-color: #9cb5c590;
  border-radius: 50%;
  margin-left: 0.5rem;
  padding: 1rem;
  box-shadow: 5px 5px 5px 5px #14354b8b;
}
#image img {
  height: 100%;
  width: 100%;
  border-bottom-right-radius: 40%;
}

.pushable {
  background: #5688a9;
  border-radius: 12px;
  border: none;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  box-shadow: 2px 2px 2px #3a7094ad;
}
.front {
  display: block;
  padding: 12px 42px;
  border-radius: 12px;
  font-size: 1.25rem;
  background: #1a3242;
  color: white;
  transform: translateY(-6px);
}

.pushable:active .front {
  transform: translateY(-2px);
}
@media (max-width: 700px){
  #first-screen{
    flex-direction: column;
  }
  .content{
    width: 100%;
  }
  #image{
    width: 80%;
    height: 40%;
    margin-top: 2rem;
  }
`;