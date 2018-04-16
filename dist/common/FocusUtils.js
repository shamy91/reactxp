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
        this.FirstFocusableId = AutoFocusHelper_1.FirstFocusableId;
        this.setFocusArbitrator = AutoFocusHelper_1.setFocusArbitrator;
        this.requestFocus = AutoFocusHelper_1.requestFocus;
    }
    return FocusUtils;
}());
exports.FocusUtils = FocusUtils;
exports.default = new FocusUtils();
