"use strict";
/**
* AutoFocusHelper.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Provides the functions which allow to handle the selection of a proper component
* to focus out of the candidates which claim to be focused on mount with either
* autoFocus property or which were queued to focus using FocusUtils.requestFocus().
*/
Object.defineProperty(exports, "__esModule", { value: true });
var _sortAndFilter;
var _autoFocusTimer;
var _lastFocusArbitratorProviderId = 0;
var rootFocusArbitratorProvider;
// The default behaviour in the keyboard navigation mode is to focus first
// focusable component when a View with restrictFocusWithin is mounted.
// This is the id for the first focusable which is used by FocusManager.
// The implementors could use this id from their implementations of
// FocusArbitrator.
exports.FirstFocusableId = 'reactxp-first-focusable';
function setSortAndFilterFunc(sortAndFilter) {
    _sortAndFilter = sortAndFilter;
}
exports.setSortAndFilterFunc = setSortAndFilterFunc;
function setRootFocusArbitrator(arbitrator) {
    rootFocusArbitratorProvider.setCallback(arbitrator);
}
exports.setRootFocusArbitrator = setRootFocusArbitrator;
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
        var viewId = this._view && this._view.props && this._view.props.accessibilityId;
        if (viewId) {
            candidates.forEach(function (candidate) {
                candidate.parentAccessibilityId = viewId;
            });
        }
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
    FocusArbitratorProvider.prototype._requestFocus = function (component, focus, isAvailable, accessibilityId) {
        this._candidates.push({
            accessibilityId: accessibilityId,
            component: component,
            focus: focus,
            isAvailable: isAvailable
        });
        this._notifyParent();
    };
    FocusArbitratorProvider._arbitrate = function (candidates, arbitrator) {
        // Filtering out everything which is already unmounted.
        candidates = candidates.filter(function (item) { return item.isAvailable(); });
        if (_sortAndFilter) {
            candidates = _sortAndFilter(candidates);
        }
        var candidate = arbitrator && arbitrator(candidates);
        if (!candidate) {
            // If the arbitrator hasn't handled the focus, we choose the first focusable component provided
            // by FocusManager or the last one queued.
            for (var i = 0; i < candidates.length; i++) {
                if (candidates[i].accessibilityId === exports.FirstFocusableId) {
                    candidate = candidates[i];
                    break;
                }
            }
        }
        if (!candidate) {
            candidate = candidates[candidates.length - 1];
        }
        return candidate;
    };
    FocusArbitratorProvider.prototype.setCallback = function (arbitrator) {
        this._arbitratorCallback = arbitrator;
    };
    FocusArbitratorProvider.requestFocus = function (component, focus, isAvailable, accessibilityId) {
        if (_autoFocusTimer) {
            clearTimeout(_autoFocusTimer);
        }
        var focusArbitratorProvider = ((component._focusArbitratorProvider instanceof FocusArbitratorProvider) &&
            component._focusArbitratorProvider) ||
            (component.context && component.context.focusArbitrator) ||
            rootFocusArbitratorProvider;
        focusArbitratorProvider._requestFocus(component, focus, isAvailable, accessibilityId);
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
function requestFocus(component, focus, isAvailable, accessibilityId) {
    FocusArbitratorProvider.requestFocus(component, focus, isAvailable, accessibilityId);
}
exports.requestFocus = requestFocus;
rootFocusArbitratorProvider = new FocusArbitratorProvider();
