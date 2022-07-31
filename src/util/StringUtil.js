export default class StringUtil {
    static createHashValue(string, length = 8) {
        let hash = 0;

        for (let i=0; i<string.length; i++) {
            const charCode = string.charCodeAt(i);
            hash = (hash << 5) - hash + charCode;
            hash |= 0;
        }

        return String(hash).substring(0, length);
    }
}
