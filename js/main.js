window.addEventListener("DOMContentLoaded", event => {
  if (window.localStorage) {
    window.topicsCompleted = getTopicsFromLocalStorage();
    updateUI();
  }
});

function updateUI() {
  checkForCompletedButtons();
  checkSideBar();
}

function checkForCompletedButtons() {
  [...getButtons()].forEach(button => {
    const topic = button.dataset.topic;
    if (isCompleted(topic)) {
      markButtonAsCompleted(button);
    } else {
      markButtonAsNotCompleted(button);
    }
  });
}

function getButtons() {
  return document.querySelectorAll(".completed-button");
}

function toggleCompletedTopic(topic) {
  if (isCompleted(topic)) {
    removeCompletedTopic(topic);
    updateUI();
  } else {
    addCompletedTopic(topic);
    updateUI();
  }
}

function isCompleted(topic) {
  return window.topicsCompleted && window.topicsCompleted.includes(topic);
}

function markButtonAsCompleted(button) {
  button.classList.add("completed");
  button.innerText = "Completed!";
}

function markButtonAsNotCompleted(button) {
  button.classList.remove("completed");
  button.innerText = "Mark as completed";
}

function getTopicsFromLocalStorage() {
  return JSON.parse(window.localStorage.getItem("topicsCompleted"));
}

function addCompletedTopic(topic) {
  let topics = getTopicsFromLocalStorage();
  if (!topics) {
    topics = [];
  }
  topics.push(topic);
  save(topics);
}

function save(topics) {
  window.topicsCompleted = topics;
  window.localStorage.setItem("topicsCompleted", JSON.stringify(topics));
}

function removeCompletedTopic(topic) {
  const topics = getTopicsFromLocalStorage();
  save(topics.filter(t => t !== topic));
}

function getSidebarItems() {
  return document.querySelectorAll(".topics li");
}

function checkSideBar() {
  [...getSidebarItems()].forEach(item => {
    const topic = item.dataset.topic;
    if (isCompleted(topic)) {
      item.classList.add("completed");
    } else {
      item.classList.remove("completed");
    }
  });
}
