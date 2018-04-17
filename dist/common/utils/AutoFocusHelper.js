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
var _arbitrator;
var _autoFocusTimer;
var _pendingAutoFocusItems = [];
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
function setFocusArbitrator(arbitrator) {
    _arbitrator = arbitrator;
}
exports.setFocusArbitrator = setFocusArbitrator;
function requestFocus(component, focus, isAvailable, accessibilityId) {
    _pendingAutoFocusItems.push({
        accessibilityId: accessibilityId,
        component: component,
        focus: focus,
        isAvailable: isAvailable
    });
    if (_autoFocusTimer) {
        clearTimeout(_autoFocusTimer);
    }
    // Defer the action to wait for all components which are being mounted at
    // the same tick.
    _autoFocusTimer = setTimeout(function () {
        _autoFocusTimer = undefined;
        // Filtering out everything which is already unmounted.
        _pendingAutoFocusItems = _pendingAutoFocusItems.filter(function (item) {
            return item.isAvailable();
        });
        if (_sortAndFilter) {
            _pendingAutoFocusItems = _sortAndFilter(_pendingAutoFocusItems);
        }
        if (_arbitrator && _arbitrator(_pendingAutoFocusItems)) {
            _pendingAutoFocusItems = [];
            return;
        }
        var autoFocusItem;
        // If no sorting function is specified and the arbitrator hasn't handled
        // the focus, we choose the first focusable component provided by FocusManager
        // or the last one queued.
        for (var i = 0; i < _pendingAutoFocusItems.length; i++) {
            if (_pendingAutoFocusItems[i].accessibilityId === exports.FirstFocusableId) {
                autoFocusItem = _pendingAutoFocusItems[i];
                break;
            }
        }
        if (!autoFocusItem) {
            autoFocusItem = _pendingAutoFocusItems[_pendingAutoFocusItems.length - 1];
        }
        _pendingAutoFocusItems = [];
        if (autoFocusItem) {
            autoFocusItem.focus();
        }
    }, 0);
}
exports.requestFocus = requestFocus;
