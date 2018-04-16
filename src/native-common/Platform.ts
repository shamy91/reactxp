/**
* Platform.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Native implementation of Platform interface.
*/

import RN = require('react-native');

import RX = require('../common/Interfaces');
import Types = require('../common/Types');

export class Platform extends RX.Platform {
    getType(): Types.PlatformType {
        return RN.Platform.OS;
    }

    select<T>(specifics: { [ platform in Types.PlatformType | 'default' ]?: T }): T | undefined {
        const platformType = this.getType();
        return platformType in specifics ? specifics[platformType] : specifics.default;
    }
}

export default new Platform();
