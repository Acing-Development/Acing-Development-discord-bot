const fs = require('fs');

class TempDBClient {
  constructor() {
    this.path = "./tempdb.json";
    this.connectionCount = 0;
  }

  setPath(path) {
    this.path = path;
  }

  removeGarbage() {
    if (!this.connection) console.log("No connection has been made yet and therefor couldn't execute a removeGarbage() function.");

    const now = Date.now() / 1000;

    for (const [key, value] of Object.entries(this.connection)) {
      if (value.expireTime < now && value.expireTime != null) {
        delete this.connection[key];
      }
    }
  }

  connect() {
    if (this.connectionCount == 0) {
      this.connection = require(this.path);
      this.removeGarbage();
    }

    this.connectionCount += 1;
  }

  set(key, value, expireTime = -1) {
    if (!this.connection) console.log("No connection has been made yet and therefor couldn't execute a set() function.");

    if (expireTime == -1) {
      this.connection[key] = {value: value, expireTime: null};
    } else {
      this.connection[key] = {value: value, expireTime: Date.now() / 1000 + expireTime};
    }
  }

  get(key) {
    if (!this.connection) console.log("No connection has been made yet and therefor couldn't execute a get() function.");

    const value = this.connection[key];

    if (value) {
      if (value.expireTime == null) {
        return value;
      }

      if (value.expireTime < Date.now() / 1000) {
        delete this.connection[key];
        return null;
      }
    }

    return value;
  }

  disconnect() {
    this.connectionCount -= 1;

    if (this.connectionCount == 0) {
      fs.writeFile(this.path, JSON.stringify(this.connection), function (err) {
        if (err) return console.error(err);
      });
    }
  }
}

module.exports = new TempDBClient();