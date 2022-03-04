/**
* Route processing helper
*
* @displayName Routes helper
* @version 1.0
* @author Pavlo Uhrynovych
*/

export default class routesHelper {
    constructor(param) {
        if(param) {
            this.routes = {
                to: param.to || null,
                from: param.from || null,
                key: param.key || null
            }
        }
    }

    clearRoute(key = false) {
        if(!key) {
            if(this.routes) {
                let result = {};

                for(let route in this.routes) {
                    if(this.routes[route]) {
                        result[route] = this.routes[route].replace(/\___.*/, '');
                    }
                }

                return result;
            }
        } else {
            return [
                key.replace(/\___.*/, ''),
                key.replace(/\-.*/, '')
            ];
        }
    }

    /**
     * Formatting values into a get-parameter string
     *
     * @param  {[array]}
     * @return {[string]}
     */
    getFormat(params) {
        if(!params) return null;
        let string = '';

        for(let param in params) {
            if(param && params[param])
                string += (string && '&') + param + '=' + (params[param] === true ? 1 : (params[param] === false ? 0 : params[param]));
        }

        return string;
    }

    /**
     * Search in url string by key (get param)
     *
     * @param  {[string]}
     * @return {[string]}
     */
    findGetParameter(parameterName) {
        let result = null;
        let tmp = [];
        let items = location.search.substr(1).split('&');

        for (let index = 0; index < items.length; index++) {
            tmp = items[index].split('=');
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
            result = result === '1' ? true : (result === '0' ? false : result);
        }

        return result;
    }
}
