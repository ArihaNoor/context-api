import React from "react";
import styled from 'styled-components';

const Loader = () => {
  return (
    <Wrapper>
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    </Wrapper>
  );
};

export default Loader;

const Wrapper = styled.section`
    .loading-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
      
      .spinner {
        border: 6px solid rgba(0, 0, 0, 0.3);
        border-top: 4px solid #3498db;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      
    `;