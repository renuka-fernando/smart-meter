/*
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import Utils from './Utils';

export default class User {
    constructor(name, type = User.CONST.CLIENT, remember = false) {
        this.name = name;
        this._scopes = [];
        this._remember = remember;
        this._type = type;
    }

    get scopes() {
        return this._scopes;
    }

    set scopes(newScopes) {
        Object.assign(this.scopes, newScopes);
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    static fromJson(userJson) {
        if (!userJson.name) {
            throw new Error('Need to provide user `name` key in the JSON object, to create an user');
        }

        const _user = new User(userJson.name);
        _user._type = userJson.type;
        _user.scopes = userJson.scopes;
        _user.rememberMe = userJson.remember;
        return _user;
    }

    toJson() {
        return {
            name: this.name,
            type: this._type,
            scopes: this._scopes,
            remember: this._remember,
        };
    }
}

User.CONST = {
    LOCAL_STORAGE_USER: 'sms_user',
    CLIENT: 'client',
    ADMIN: 'admin'
};