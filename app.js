

// my original code

const header = document.querySelector("header");
const logo = document.querySelector(".logo");
const authPage = document.querySelector("section");
const logout = document.querySelector(".logout");
const article = document.querySelector("article");
const content = document.querySelector(".article-content-container");
const headerSelect = document.querySelector(".header-options");
const bodySelect = document.querySelector(".body-options");
const loginBtn = document.querySelector(".login-btn");
const welcomeMsg = document.querySelector(".welcome-msg");
const targetImg = document.querySelector("article", "img");
const darkModeToggler = document.querySelector(".night-mode-icon");
const usernameInput = document.querySelector(".unInput");
const passwordInput = document.querySelector(".pwInput");
const contentLinks = document.querySelectorAll(".media-footer .media");
const shareBtn = document.querySelector(".share");

let db = [
  { username: "rosa", password: "king" },
  { username: "ed", password: "123" },
  { username: "nancy", password: "123" },
  { username: "oscar", password: "haw" },
];

let isAuth = false;

if (!isAuth) {
  headerSelect.classList.add("hide");
  logout.classList.add("hide");
  content.classList.add("hide");
} else {
  headerSelect.classList.remove("hide");
  logout.classList.remove("hide");
  content.classList.remove("hide");
  authPage.classList.add("hide");
}

function authenticate(user, pass) {
  let authenticated = false;

  for (let i = 0; i < db.length; i++) {
    if (db[i].username === user && db[i].password === pass) {
      authenticated = true;
      break;
    }
  }

  if (authenticated) {
    headerSelect.classList.remove("hide");
    logout.classList.remove("hide");
    content.classList.remove("hide");
    authPage.classList.add("hide");
    logo.classList.add("hide");
  } else {
    alert("Invalid username or password");
  }
}

function login(e) {
  e.preventDefault();
  const userInput = document.getElementById("username").value;
  const passInput = document.getElementById("password").value;

  welcomeMsg.innerHTML = `
  <div>
    <p>Welcome ${userInput}, choose a category</p>
  </div>
    `;
  authenticate(userInput, passInput);
}

function fetchData(category) {
  fetch(`https://api.waifu.pics/nsfw/${category}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Clear previous content
      content.innerHTML = "";

      // Render fetched data
      const mediaContainer = document.createElement("div");
      mediaContainer.classList.add("media-container");

      const mediaContent = document.createElement("div");
      mediaContent.classList.add("media-content");
      const img = document.createElement("img");
      img.src = data.url; // Assuming data.url contains the image URL
      mediaContent.appendChild(img);
      mediaContainer.appendChild(mediaContent);

      // Append media container to content
      content.appendChild(mediaContainer);

      // // Render a button
      // const actionButton = document.createElement("button");
      // actionButton.textContent = "Share This Image";
      // actionButton.classList.add("share"); // Add class for styling if needed
      // actionButton.addEventListener("click", () => {
      //   copyToClipboard(img.src); // Use your existing copyToClipboard function
      // });

      // // Append button to content
      // mediaContainer.appendChild(actionButton);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function selectCategories() {
  const selectedCategory = this.value;
  fetchData(selectedCategory);
}

function nextMedia(e) {
  let selectedCategory = headerSelect.value || bodySelect.value;

  if (
    (e.target.tagName === "IMG" && e.type === "mousedown") ||
    e.keyCode === 13 ||
    e.keyCode === 32 ||
    e.keyCode === 39
  ) {
    fetchData(selectedCategory);
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("night-mode");

  if (document.body.classList.contains("night-mode")) {
    header.style.background = "black";
    document.body.style.color = "white";
    logout.style.color = "white";
  } else {
    header.style.background = "whitesmoke";
    document.body.style.color = "black";
    logout.style.color = "black";
  }
}

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Text copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}

function handleSignOut() {
  window.location.href = "index.html";
}

window.addEventListener("keydown", nextMedia);

darkModeToggler.addEventListener("click", toggleDarkMode);
loginBtn.addEventListener("click", login);
headerSelect.addEventListener("change", selectCategories);
bodySelect.addEventListener("change", selectCategories);
targetImg.addEventListener("mousedown", nextMedia);
shareBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const mediaUrl = article.querySelector("img").src; // Assuming you want to copy the image URL
  copyToClipboard(mediaUrl);
});

