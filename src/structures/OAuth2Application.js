const Snowflake = require('../util/Snowflake');
const Constants = require('../util/Constants');

/**
 * Represents an OAuth2 Application.
 */
class OAuth2Application {
  constructor(client, data) {
    /**
     * The client that instantiated the application
     * @name OAuth2Application#client
     * @type {Client}
     * @readonly
     */
    Object.defineProperty(this, 'client', { value: client });

    this.setup(data);
  }

  setup(data) {
    /**
     * The ID of the app
     * @type {Snowflake}
     */
    this.id = data.id;

    /**
     * The name of the app
     * @type {string}
     */
    this.name = data.name;

    /**
     * The app's description
     * @type {string}
     */
    this.description = data.description;

    /**
     * The app's icon hash
     * @type {string}
     */
    this.icon = data.icon;

    /**
     * The app's RPC origins
     * @type {?string[]}
     */
    this.rpcOrigins = data.rpc_origins;

    /**
     * The app's redirect URIs
     * @type {string[]}
     */
    this.redirectURIs = data.redirect_uris;

    /**
     * If this app's bot requires a code grant when using the OAuth2 flow
     * @type {boolean}
     */
    this.botRequireCodeGrant = data.bot_require_code_grant;

    /**
     * If this app's bot is public
     * @type {boolean}
     */
    this.botPublic = data.bot_public;

    /**
     * If this app can use rpc
     * @type {boolean}
     */
    this.rpcApplicationState = data.rpc_application_state;

    /**
     * Object containing basic info about this app's bot
     * @type {Object}
     */
    this.bot = data.bot;

    /**
     * The flags for the app
     * @type {number}
     */
    this.flags = data.flags;

    /**
     * OAuth2 secret for the application
     * @type {boolean}
     */
    this.secret = data.secret;

    if (data.owner) {
      /**
       * The owner of this OAuth application
       * @type {?User}
       */
      this.owner = this.client.dataManager.newUser(data.owner);
    }
  }

  /**
   * The timestamp the app was created at
   * @type {number}
   * @readonly
   */
  get createdTimestamp() {
    return Snowflake.deconstruct(this.id).timestamp;
  }

  /**
   * The time the app was created
   * @type {Date}
   * @readonly
   */
  get createdAt() {
    return new Date(this.createdTimestamp);
  }

  /**
   * A link to the application's icon
   * @param {string} [format='webp'] One of `webp`, `png`, `jpg`, `gif`.
   * @param {number} [size=128] One of `128`, '256', `512`, `1024`, `2048`
   * @returns {?string} URL to the icon
   */
  iconURL(format, size) {
    if (!this.icon) return null;
    if (typeof format === 'number') {
      size = format;
      format = 'default';
    }
    return Constants.Endpoints.CDN(this.client.options.http.cdn).AppIcon(this.id, this.icon, format, size);
  }

  /**
   * Reset the app's secret and bot token.
   * @returns {OAuth2Application}
   */
  reset() {
    return this.client.rest.methods.resetApplication(this.id);
  }

  /**
   * When concatenated with a string, this automatically concatenates the app name rather than the app object.
   * @returns {string}
   */
  toString() {
    return this.name;
  }
}

module.exports = OAuth2Application;
