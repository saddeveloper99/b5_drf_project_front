import { writePosting } from "./community-api.js";

console.log("11231232")

function handleWriteButtonClick() {
    writePosting();
}

const writeButton = document.getElementById("writeButton");
writeButton.addEventListener("click", handleWriteButtonClick);