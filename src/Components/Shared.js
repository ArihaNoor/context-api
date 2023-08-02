export const showModal = () => {
    var modal = document.getElementById("Modal");
    modal.style.display = "block";
    let blur = document.getElementById("content");
    blur.classList.add("blur");
  };

export  const HideModal = () => {
    var modal = document.getElementById("Modal");
    modal.style.display = "none";
    let blur = document.getElementById("content");
    blur.classList.remove("blur");
  };
