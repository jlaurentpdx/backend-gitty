const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');

module.exports = class UserService {
  static create(code) {
    let userProfile = null;

    return exchangeCodeForToken(code)
      .then((token) => getGithubProfile(token))
      .then((profile) => {
        userProfile = profile;
        return GithubUser.findByUsername(profile.login);
      })
      .then((user) => {
        if (!user) {
          return GithubUser.insert({
            username: userProfile.login,
            photoUrl: userProfile.avatar_url,
          });
        }
        return user;
      });
  }
};
