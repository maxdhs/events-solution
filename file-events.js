const eventEmitter = require("./eventEmitter");

eventEmitter.on("file-read", () => {
  console.log("file read!");
});

eventEmitter.on("read-error", err => {
  console.log("read error!", err);
});

eventEmitter.on("file-saved", () => {
  console.log("file saved!");
});

eventEmitter.on("saved-error", error => {
  console.log("file saved error", error);
});
