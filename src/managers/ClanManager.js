/* eslint-disable no-async-promise-executor */
const BaseManager = require('./BaseManager');
const { handleData } = require('../util/Data.js');
const Routes = require('../util/Routes');

/**
 * Manages API methods for clans
 * @extends {BaseManager}
 */
class ClanManager extends BaseManager {
	/**
	 * Obtains clan info from MultiVersus.
	 * This is a planned feature and as such no data is returned.
	 * @param {string} id The ID of the user to fetch
	 * @param {number?} page The page
	 * @param {number?} count The number of entries
	 * @returns {Promise<Object>}
	 */
	fetch(id, page = 1, count = 25) {
		return new Promise(async (resolve, reject) => {
			if (!id) {
				return reject(new Error('A user ID must be provided.'));
			}
			const data = await this.client.rest.get(Routes.clan(id, page, count));
			handleData(data, resolve, reject);
		});
	}
}

module.exports = ClanManager;
