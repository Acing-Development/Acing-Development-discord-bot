const fetch = require("node-fetch");

const urls = {
  "search_user": "https://api.github.com/search/users?q={query}&per_page=5",
  "search_repo": "https://api.github.com/search/repositories?q={query}&per_page=10",
  "repo_info": "https://api.github.com/repos/{ownerAndRepo}",
  "user_repos": "https://api.github.com/users/{user}/repos?page={page}&per_page=10"
}

async function _requestApi(e) {
  const req = await fetch(e);

  if (e.includes("../") ||
      e.includes("/..")) {
    return {
      message: "Illegal URL provided"
    };
  }

  if (req.status != 200) {
    return {
      message: "HTTP ERROR " + req.status
    }
  }

  return req.json();
}

module.exports = {
  search_user: 0,
  search_repo: 1,
  repo_info: 2,
  user_repos: 3,

  requestApi: async function(e, otherArgs={}) {
    switch (e) {
      case module.exports.search_user:
        return await _requestApi(urls.search_user
          .replace("{query}", otherArgs.query)
        );
      case module.exports.search_repo:
        return await _requestApi(urls.search_repo
          .replace("{query}", otherArgs.query)
        );
      case module.exports.repo_info:
        return await _requestApi(urls.repo_info
          .replace("{ownerAndRepo}", otherArgs.ownerAndRepo)
        );
      case module.exports.user_repos:
        return await _requestApi(urls.user_repos
          .replace("{user}", otherArgs.user)
          .replace("{page}", otherArgs.page == undefined ? "1" : otherArgs.page)
        );
    }
  }
}