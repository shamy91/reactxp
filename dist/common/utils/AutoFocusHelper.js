"use strict";
/**
* AutoFocusHelper.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Provides the functions which allow to handle the selection of a proper component
* to focus from the multiple candidates with autoFocus=true.
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
var _sortAndFilter;
var _autoFocusTimer;
var _isFocusFirstEnabled = true;
var _lastFocusArbitratorProviderId = 0;
var rootFocusArbitratorProvider;
function setSortAndFilterFunc(sortAndFilter) {
    _sortAndFilter = sortAndFilter;
}
exports.setSortAndFilterFunc = setSortAndFilterFunc;
function setRootFocusArbitrator(arbitrator) {
    rootFocusArbitratorProvider.setCallback(arbitrator);
}
exports.setRootFocusArbitrator = setRootFocusArbitrator;
function setFocusFirstEnabled(enabled) {
    _isFocusFirstEnabled = enabled;
}
exports.setFocusFirstEnabled = setFocusFirstEnabled;
var FocusCandidate = /** @class */ (function () {
    function FocusCandidate(component, focus, isAvailable, parentAccessibilityId) {
        this.component = component;
        this.focus = focus;
        this.isAvailable = isAvailable;
        this.getParentAccessibilityId = function () { return parentAccessibilityId; };
    }
    FocusCandidate.prototype.getAccessibilityId = function () {
        return this.component.props && this.component.props.accessibilityId;
    };
    return FocusCandidate;
}());
exports.FocusCandidate = FocusCandidate;
var FirstFocusCandidate = /** @class */ (function (_super) {
    __extends(FirstFocusCandidate, _super);
    function FirstFocusCandidate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FirstFocusCandidate;
}(FocusCandidate));
exports.FirstFocusCandidate = FirstFocusCandidate;
var FocusArbitratorProvider = /** @class */ (function () {
    function FocusArbitratorProvider(view, arbitrator) {
        this._candidates = [];
        this._pendingChildren = {};
        this._id = ++_lastFocusArbitratorProviderId;
        this._view = view;
        this._parentArbitratorProvider = view
            ? ((view.context && view.context.focusArbitrator) || rootFocusArbitratorProvider)
            : undefined;
        this._arbitratorCallback = arbitrator;
    }
    FocusArbitratorProvider.prototype._notifyParent = function () {
        if (this._parentArbitratorProvider) {
            this._parentArbitratorProvider._pendingChildren['fa-' + this._id] = this;
            this._parentArbitratorProvider._notifyParent();
        }
    };
    FocusArbitratorProvider.prototype._arbitrate = function () {
        var _this = this;
        var candidates = this._candidates;
        Object.keys(this._pendingChildren).forEach(function (key) {
            var candidate = _this._pendingChildren[key]._arbitrate();
            if (candidate) {
                candidates.push(candidate);
            }
        });
        this._candidates = [];
        this._pendingChildren = {};
        return FocusArbitratorProvider._arbitrate(candidates, this._arbitratorCallback);
    };
    FocusArbitratorProvider.prototype._requestFocus = function (component, focus, isAvailable, isFirstFocusable) {
        var parentProvider = this._view !== component ? this : this._parentArbitratorProvider;
        var parentAccessibilityId = parentProvider
            ? parentProvider._view && parentProvider._view.props && parentProvider._view.props.accessibilityId
            : undefined;
        this._candidates.push(isFirstFocusable && _isFocusFirstEnabled
            ? new FirstFocusCandidate(component, focus, isAvailable, parentAccessibilityId)
            : new FocusCandidate(component, focus, isAvailable, parentAccessibilityId));
        this._notifyParent();
    };
    FocusArbitratorProvider._arbitrate = function (candidates, arbitrator) {
        // Filtering out everything which is already unmounted.
        candidates = candidates.filter(function (item) { return item.isAvailable(); });
        if (_sortAndFilter) {
            candidates = _sortAndFilter(candidates);
        }
        for (var i = 0; i < candidates.length; i++) {
            if (candidates[i] instanceof FirstFocusCandidate) {
                return candidates[i];
            }
        }
        if (arbitrator) {
            return arbitrator(candidates);
        }
        return candidates[candidates.length - 1];
    };
    FocusArbitratorProvider.prototype.setCallback = function (arbitrator) {
        this._arbitratorCallback = arbitrator;
    };
    FocusArbitratorProvider.requestFocus = function (component, focus, isAvailable, isFirstFocusable) {
        if (_autoFocusTimer) {
            clearTimeout(_autoFocusTimer);
        }
        var focusArbitratorProvider = ((component._focusArbitratorProvider instanceof FocusArbitratorProvider) &&
            component._focusArbitratorProvider) ||
            (component.context && component.context.focusArbitrator) ||
            rootFocusArbitratorProvider;
        focusArbitratorProvider._requestFocus(component, focus, isAvailable, isFirstFocusable);
        _autoFocusTimer = setTimeout(function () {
            _autoFocusTimer = undefined;
            var candidate = rootFocusArbitratorProvider._arbitrate();
            if (candidate) {
                candidate.focus();
            }
        }, 0);
    };
    return FocusArbitratorProvider;
}());
exports.FocusArbitratorProvider = FocusArbitratorProvider;
rootFocusArbitratorProvider = new FocusArbitratorProvider();
