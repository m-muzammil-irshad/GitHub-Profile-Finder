const url = "https://api.github.com/users";

const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchBtn");
const avatar = document.querySelector("#avatar");
const nameOfUser = document.querySelector("#name");
const bio = document.querySelector("#bio");
const follower = document.querySelector("#follower");
const following = document.querySelector("#following")
const repos = document.querySelector("#repos");
const profileContainer = document.querySelector(".profileContainer");
const loading = document.querySelector(".loading");

const fetchProfile = async () => {
  loading.innerText = 'loading.....';
  loading.style.color = "black";
  const userName = searchInput.value;
  try {
    const res = await fetch(`${url}/${userName}`);
    const data = await res.json();
    if (data.bio) {
      loading.innerText = "";
      profileContainer.innerHTML = generateCard(data);
    }
    else {
      loading.innerText = data.massege;
      loading.style.color = 'red';
      profileContainer.innerText = " ";
    }
  } catch (error) {
    console.log(error);
  }
}
searchButton.addEventListener("click", fetchProfile)
const generateCard = (profile) => {
  return (
    `<div class="profileBox">
        <div class="topSection">
          <div class="leftSection">
            <div class="avatar">
              <img id="avatar" src="${profile.avatar_url}"
                alt="avatar" />
            </div>
            <div class="self">
              <h2>${profile.name}</h2>
              <h4>@${profile.login}</h4>
            </div>
          </div>
          <a href = "${profile.html_url}" target="_black>
          <button class="primaryBtn" id="goBtn">Check Profile</button>
          </a>
        </div>
        <div class="aboutSection">
          <h2>About</h2>
          <p> ${profile.bio} </p>
        </div>
        <div class="status">
          <div class="statusItems">
            <h4>Followers</h4>
            <p>${profile.followers}</p>
          </div>
          <div class="statusItems">
            <h4>Following</h4>
            <p>${profile.following}</p>
          </div>
          <div class="statusItems">
            <h4>Repos</h4>
            <p>${profile.public_repos}</p>
          </div>
        </div>
      </div>`
  )
}