const uuidText = document.getElementById("uuid-text");
const generateButton = document.getElementById("generate");
const copyButton = document.getElementById("copy");
const generateUUID = () => crypto.randomUUID
  ? crypto.randomUUID()
  : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
  });
const flash = state => {
  copyButton.classList.add("clicked");
  setTimeout(() => {
    copyButton.dataset.state = state;
    copyButton.classList.remove("clicked");
  }, 150);
  setTimeout(() => {
    copyButton.dataset.state = "copy";
  }, 1000);
};
generateButton.addEventListener("click", () => {
  uuidText.textContent = generateUUID();
  uuidText.classList.add("filled");
});
copyButton.addEventListener("click", () => {
  const uuid = uuidText.textContent.trim();
  if (uuid.toLowerCase() === "uuid") {
    flash("bad");
    return;
  }
  navigator.clipboard.writeText(uuid).then(() => flash("ok")).catch(() => flash("bad"));
});
