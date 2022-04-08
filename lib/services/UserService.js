const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');

module.exports = class UserService {
  static create(code) {
    return exchangeCodeForToken(code)
      .then((token) => getGithubProfile(token))
      .then((profile) => GithubUser.findByUsername(profile.login))
      .then((user) => {
        console.log('user', user);
        if (!user) {
          user = GithubUser.insert({
            username: user.login,
            photoUrl: user.avatar_url,
          });
        } else {
          return user;
        }
      });
  }
};
