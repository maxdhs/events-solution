"use strict";

const fs = require("fs");
const util = require("util");
const eventEmitter = require("./eventEmitter");
require("./file-events");

const readFile = async file => {
  const fsRead = util.promisify(fs.readFile);
  try {
    const data = await fsRead(file);
    eventEmitter.emit("file-read");
    return data;
  } catch (error) {
    eventEmitter.emit("read-error", error);
  }
};

const upperCase = data => {
  let text = data.toString().toUpperCase();
  eventEmitter.emit("upper-cased", text);
  return text;
};

const writeFile = async (file, text) => {
  const fsWrite = util.promisify(fs.writeFile);
  try {
    await fsWrite(file, Buffer.from(text));
    eventEmitter.emit("file-saved");
  } catch (error) {
    eventEmitter.emit("saved-error", error);
  }
};

const alterFile = async file => {
  const data = await readFile(file);
  const text = upperCase(data);
  writeFile(file, text);
};

let file = process.argv.slice(2).shift();
alterFile(file);
