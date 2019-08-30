import passport from 'passport-strategy';
import util from 'util';
import user from './mockUser';

/**
   * It inherits from the passport.Strategy constructor, and returns a strategy
   * object which uses the authenticate method to handle the authentication
   * request and send the result back to the route controller
   * @function Strategy
   * @param {string} name
   * @param {function} callback
   * @returns {Object} Strategy
*/
function Strategy(name, callback) {
  if (!name || name.length === 0) { throw new TypeError('Please supply a strategy name to work with.'); }
  passport.Strategy.call(this);
  this.name = name;
  this._user = user[name];
  this._cb = callback;
}
util.inherits(Strategy, passport.Strategy);

/**
   * It handles the logic of authentication, and then calls the callback passed
   * to the Strategy constructor, passing it a value for the accessToken, refreshToken, the
   * profile of the authenticated user, and a done function for the callback to call, when it
   * is done with its own logic
   * this.success and this.error comes from the passport.Strategy constructor
   * @function authenticate
   * @param {Object} req The express request object
   * @returns {Object} (user | error)
*/
Strategy.prototype.authenticate = function authenticate(req) {
  const { headers: { testerror } } = req;
  if (testerror) this._user = user[testerror];
  this._cb(null, null, this._user, (err, authenticatedUser) => {
    if (err) this.error(err);
    else if (this._user) this.success(authenticatedUser);
    else this.success(undefined);
  });
};
export default Strategy;
