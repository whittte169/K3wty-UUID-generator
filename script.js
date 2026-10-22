const githubBtn = document.getElementById('github-container');
githubBtn.addEventListener("click", () => {
  window.open("https://github.com/whittte169/K3wty-UUID-generator", "_blank");
});
const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
const generateButton = document.getElementById("generate");
generateButton.addEventListener("click", () => {
  const uuidContainer = document.getElementById("uuid-text");
  const uuid = generateUUID();
  uuidContainer.textContent = uuid;
});
const copyButton = document.getElementById("copy");
copyButton.addEventListener("click", () => {
  const uuidContainer = document.getElementById("uuid-text");
  const uuid = uuidContainer.textContent.trim();
  copyButton.classList.add("clicked");
  if (uuid.toLowerCase() == "uuid") {
    setTimeout(() => {
      copyButton.src = "failure.png";
      copyButton.classList.remove("clicked");
    }, 150);
    setTimeout(() => {
      copyButton.src = "copy.png";
    }, 1000);
    return;
  }
  if (copyButton.src == "success.png" || copyButton.src == "failure.png") {
    setTimeout(() => {
      copyButton.src = "failure.png";
      copyButton.classList.remove("clicked");
    }, 150);
    setTimeout(() => {
      copyButton.src = "copy.png";
    }, 1000);
    return;
  }
  navigator.clipboard.writeText(uuid).then(() => {
    setTimeout(() => {
      copyButton.src = "success.png";
      copyButton.classList.remove("clicked");
    }, 150);
    setTimeout(() => {
      copyButton.src = "copy.png";
    }, 1000);
  }).catch((error) => {
    setTimeout(() => {
      copyButton.src = "failure.png";
      copyButton.classList.remove("clicked");
    }, 150);
  });
});
