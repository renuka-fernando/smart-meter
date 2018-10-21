import * as Axios from "axios";
import Utils from './Utils'
import User from './User'
import * as Qs from "qs";

class AuthManager {
    static getUser() {
        const userData = localStorage.getItem(`${User.CONST.LOCAL_STORAGE_USER}`);
        if (!userData) {
            return false;
        }

        return User.fromJson(JSON.parse(userData));
    }

    static authenticateUser(username, password) {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        const data = {
            username,
            password,
            grant_type: 'password',
            validity_period: -1,
            scopes: AuthManager.CONST.USER_SCOPES,
            remember_me: true,
        };

        const promisedResponse = Axios(Utils.CONST.LOGIN_TOKEN_PATH, {
            method: 'POST',
            data: Qs.stringify(data),
            headers,
            withCredentials: true,
        });

        promisedResponse.then((response) => {
            const user = AuthManager.getUserFromResponse(response);
            AuthManager.setUser(user);
            console.log(`Authentication Success: User - ${user.name}`);
        }).catch((error) => {
            console.error(`Authentication Error:\n`, error);
        });

        return promisedResponse;
    }

    /**
     * Temp Solution this should be removed
     * @param username
     * @param password
     */
    static authenticateUserTemp(username, password) {
        if ((username === "Menuka" || username === "Renuka") && password === "admin") {
            let user = new User(username);
            user.type = (username === "Menuka") ? User.CONST.ADMIN : User.CONST.CLIENT;
            AuthManager.setUser(user);

            console.log(`Authentication Success: User - ${user.name}`);
        }
        console.error('Authentication Error:');
    }

    /**
     * Logout the user from session
     * @returns {boolean} successfully logout or not
     */
    static logout() {
        // TODO: logout form backend with calling rest APIs
        localStorage.removeItem(`${User.CONST.LOCAL_STORAGE_USER}`);
        console.log('Successfully logout');
        return true;
    }

    static setUser(user) {
        if (user) {
            localStorage.setItem(`${User.CONST.LOCAL_STORAGE_USER}`, JSON.stringify(user.toJson()));
        }
    }

    static getUserFromResponse(response) {
        const {data} = response;
        const {validityPeriod} = data; // In seconds
        const user = new User(data.authUser);
        user.scopes = data.scopes.split(' ');
        return user;
    }

    static hasScopes(resourcePath, resourceMethod) {

    }
}

AuthManager.CONST = {
    USER_SCOPES:
        'sms:api_view sms:api_create sms:api_publish sms:tier_view sms:tier_manage ' +
        'sms:subscription_view sms:subscription_block sms:subscribe sms:external_services_discover',
};

export default AuthManager;