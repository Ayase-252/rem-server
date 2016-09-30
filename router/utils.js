/**
 * Utility function library of Router Module.
 *
 * This module contains functions to do something other than routing request.
 * i.e, concatenating URL.
 *
 *
 * @author Ayase-252(bitdqy@hotmail.com)
 *
 * @requires /rem.conf.js
 **/

import {
    HOST_DOMAIN
} from '../rem.conf'


/**
 * Concatenates domain of host and path of API to form the URL for the API.
 *
 * @param {String} apiPath Path of API
 *
 * @deprecated
 *
 * @returns {String} url URL of API
 */
function catApiUrl(apiPath) {
  const hostDomain = HOST_DOMAIN === '' ? 'localhost:3000/' : HOST_DOMAIN
  return hostDomain + apiPath
}

export { catApiUrl }
