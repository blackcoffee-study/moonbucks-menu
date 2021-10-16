/**
 *
 * @param {Object} obj
 * @param {string[] | string} path
 */
export function getProp(obj, path = []) {
    if (!Array.isArray(path)) {
        return getProp(obj, path.split("."));
    }
    if (path.length === 0) {
        return obj;
    }
    return getProp(obj[path[0]], path.slice(1));
}
