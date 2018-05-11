"use strict";
/**
* Accessibility.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var RN = require("react-native");
var Accessibility_1 = require("../native-common/Accessibility");
var Accessibility = /** @class */ (function (_super) {
    __extends(Accessibility, _super);
    function Accessibility() {
        var _this = _super.call(this) || this;
        _this._isHighContrast = RN.AccessibilityInfo.initialHighContrast || false;
        RN.AccessibilityInfo.addEventListener('highContrastDidChange', function (isEnabled) {
            _this._updateIsHighContrast(isEnabled);
        });
        return _this;
    }
    Accessibility.prototype._updateIsHighContrast = function (isEnabled) {
        if (this._isHighContrast !== isEnabled) {
            this._isHighContrast = isEnabled;
            this.highContrastChangedEvent.fire(isEnabled);
        }
    };
    Accessibility.prototype.isHighContrastEnabled = function () {
        return this._isHighContrast;
    };
    Accessibility.prototype.announceForAccessibility = function (announcement) {
        // We cannot just call super.announceForAccessibility here, because RootView subscribes on this
        // parent class singleton instance. Calling Accessibility.announceForAccessibility from the consumer app
        // will then create a different event and the announcements won't work. Instead, we just call the
        // instance method directly.
        //
        // This dirty hack was copied from android/Accessibility.ts but it's temporary.
        // TODO: Decide on which pattern to use for "extending"/"inheriting" classes while not
        // having problem with duplicate state like here. And then replace this dirty hack (and all the other 
        // bugs in existing code - this class and others) with proper pattern.
        Accessibility_1.default.announceForAccessibility(announcement);
    };
    return Accessibility;
}(Accessibility_1.Accessibility));
exports.Accessibility = Accessibility;
exports.default = new Accessibility();
