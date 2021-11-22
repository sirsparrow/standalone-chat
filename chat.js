const setup = () => {
  const chatlog = document.querySelector("#log");
  const config = { childList: true };
  const observer = new MutationObserver(onMutation);
  observer.observe(chatlog, config);
};

const onMutation = (mutationsList) => {
  for (let mutation of mutationsList) {
    if (mutation.addedNodes.length) {
      const addedNodesArray = [...mutation.addedNodes];
      const addedDivs = addedNodesArray.filter(
        (node) => node.nodeName === "DIV"
      );

      if (addedDivs.length) {
        setTimeout(
          () => onNewDivAdded(addedDivs[addedDivs.length - 1].id),
          250
        );
      }
    }
  }
};

function onNewDivAdded(id) {
  setAvatar(id);
  typewriter(id);
}

function setAvatar(id) {
  let container = document.getElementById(id);
  if (!container) return;

  let username = container.getElementsByClassName("name")[0];
  let avatar = container.getElementsByClassName("avatar")[0];

  fetch(`https://decapi.me/twitch/avatar/${username.innerText}`)
    .then((response) => response.text())
    .then((url) => (avatar.src = url));
}

function typewriter(id) {
  let container = document.getElementById(id);
  if (!container) return;

  let typewriter = container.getElementsByClassName("typewriter")[0];

  let content = [...container.getElementsByClassName("original")[0].childNodes]
    .map((n) => (n.nodeType === 3 ? [...n.textContent] : [n.cloneNode(true)]))
    .flat();
  let pointer = 0;

  (function writeLetter() {
    if (content.length === pointer) return;

    typewriter.append(content[pointer]);
    pointer++;
    setTimeout(writeLetter, 15);
  })();
}

document.addEventListener("onLoad", setup);
window.onload = setup;
