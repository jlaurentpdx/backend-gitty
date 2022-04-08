const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');

module.exports = class UserService {
  static create(code) {
    let userProfile = null;

    return exchangeCodeForToken(code)
      .then((token) => getGithubProfile(token))
      .then(
        (profile) => (userProfile = GithubUser.findByUsername(profile.login))
      )
      .then((user) => {
        if (!userProfile) {
          userProfile = GithubUser.insert({
            username: user.login,
            photoUrl: user.avatar_url,
          });
        }
        return userProfile;
      });
  }
};
