import { projects, favorites } from "./data.js";

// // Create a Project
const createProject = (object) => {
  return `
  <div class="card" style="width: 40rem; gap:20px;">
    <div class="card-body">
      <h3 class="card-title">${object.name}</h3>
       <button class="btn rate-btn" data-id="${object.id}"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="22.5" viewBox="0 0 576 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#f1f2f3" d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/></svg> Star</button>
      <h4 class="card-description">${object.description}</h4>
      <h6>${object.type}</h6>
    </div>
  </div>`;
};

const displayProjects = (array) => {
  let content = "";
  array.forEach((item) => {
    content += createProject(item);
  });

  displayInDom("#projects-cnt", content);
  document.querySelectorAll(".rate-btn").forEach((button) => {
    button.addEventListener("click", favor);
  });

  gsap.to(".card", {
    opacity: 1,
    y: 20,
    stagger: 0.2,
    duration: 3,
    ease: "power1.in",
    x: 30,
    backgroundColor: "	#f1d1e3",
    color: "#43c4da",
  });
};

// Display in DOM utility function
const displayInDom = (divID, content) => {
  const findDiv = document.querySelector(divID);
  findDiv.innerHTML = content;
};
// //create new project form
const projectForm = document.querySelector("#createProject");

const newProject = (e) => {
  e.preventDefault();
  //create new project
  const project = {
    id: projects.length + 1,
    name: document.querySelector("#name").value,
    description: document.querySelector("#description").value,
    type: "project",
  };
  projects.push(project);
  displayProjects(projects);
  projectForm.reset();
};

// Search bar

const search = (event) => {
  const eventSearch = event.target.value.toLowerCase();
  const searchResult = projects.filter((item) => {
    return (
      item.name.toLowerCase().includes(eventSearch) ||
      item.description.toLowerCase().includes(eventSearch)
    );
  });
  displayProjects(searchResult);
};

document.querySelector("#search-bar").addEventListener("keyup", search);

projectForm.addEventListener("submit", newProject);

document.addEventListener("DOMContentLoaded", () => {
  displayProjects(projects);
  projectForm.addEventListener("submit", newProject);
});

//favorites
const displayFavs = (array) => {
  let content = "";
  array.forEach((item) => {
    content += createProject(item);
  });
  displayInDom("#pinned", content);

  document.querySelectorAll(".rate-btn").forEach((button) => {
    button.addEventListener("click", favor);
  });
};

const favor = (event) => {
  const id = parseInt(event.target.getAttribute("data-id"));
  const pjIndex = projects.findIndex((pj) => pj.id === id);
  if (pjIndex !== -1) {
    const pj = projects[pjIndex];
    pj.pinned = true;
    favorites.push(pj);
    projects.splice(pjIndex, 1);
  } else {
    const favIndex = favorites.findIndex((pj) => pj.id === id);
    if (favIndex !== -1) {
      const pj = favorites[favIndex];
      pj.pinned = false;
      projects.push(pj);
      favorites.splice(favIndex, 1);
    }
  }
  displayProjects(projects);
  displayFavs(favorites);
};
