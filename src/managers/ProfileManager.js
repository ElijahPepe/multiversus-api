/* eslint-disable no-async-promise-executor */
const BaseManager = require('./BaseManager');
const Profile = require('../structures/Profile');
const Search = require('../structures/Search');
const { handleData } = require('../util/Data.js');
const Routes = require('../util/Routes');

/**
 * Manages API methods for profiles
 * @extends {BaseManager}
 */
class ProfileManager extends BaseManager {
	/**
	 * Searches for a user from Multiversus
	 * @param {string} username The username to search for
	 * @param {limit?} limit The number of entries
	 * @param {string?} cursor The cursor
	 * @returns {Promise<Search>}
	 */
	search(username, limit = 25, cursor = null) {
		return new Promise(async (resolve, reject) => {
			if (!username) {
				throw new Error('A query must be provided.');
			}
			const data = await this.client.rest.get(Routes.profileSearch(username, limit, cursor));
			if (data.msg) {
				return reject(new Error(data.msg));
			} else {
				handleData(new Search(this.client, data), resolve, reject);
			}
		});
	}

	/**
	 * Obtains a user from MultiVersus
	 * @param {string} id The ID of the user to fetch
	 * @returns {Promise<Profile>}
	 */
	fetch(id) {
		return new Promise(async (resolve, reject) => {
			if (!id) {
				throw new Error('A user ID must be provided.');
			}
			const data = await this.client.rest.get(Routes.profile(id));
			if (data.msg) {
				return reject(new Error(data.msg));
			} else {
				handleData(new Profile(this.client, data), resolve, reject);
			}
		});
	}
}

module.exports = ProfileManager;
