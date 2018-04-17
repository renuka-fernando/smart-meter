export default class Utils{
    static CONST = {
        LOGIN_TOKEN_PATH: ''
    };

    /**
     * Round the given time to nearest quarter
     * @param hours
     * @param minutes
     * @returns {string}
     */
    static getNearestQuarter(hours, minutes){
        let h = minutes > 52 ? (hours === 23 ? 0 : ++hours) : hours;
        let m = (parseInt((minutes + 7.5)/15) * 15) % 60;
        return `${h < 10 ? "0" : ""}${h}:${m < 10 ? "0" : ""}${m}`;
    }

    /**
     * Round a number to a given number of decimal places
     * @param number
     * @param precision
     * @returns {number}
     */
    static precisionRound(number, precision) {
        let factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    }
}