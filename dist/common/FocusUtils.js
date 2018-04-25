"use strict";
/**
* FocusUtils.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Publicly accessible functions for managing the focus.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var AutoFocusHelper_1 = require("./utils/AutoFocusHelper");
var FocusUtils = /** @class */ (function () {
    function FocusUtils() {
    }
    FocusUtils.prototype.setFocusFirstEnabled = function (enabled) {
        AutoFocusHelper_1.setFocusFirstEnabled(enabled);
    };
    FocusUtils.prototype.requestFocus = function (component, focus, isAvailable) {
        AutoFocusHelper_1.FocusArbitratorProvider.requestFocus(component, focus, isAvailable);
    };
    FocusUtils.prototype.setDefaultFocusArbitrator = function (arbitrator) {
        AutoFocusHelper_1.setRootFocusArbitrator(arbitrator);
    };
    return FocusUtils;
}());
exports.FocusUtils = FocusUtils;
exports.default = new FocusUtils();
