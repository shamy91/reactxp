/// <reference types="react" />
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
import React = require('react');
import Types = require('../Types');
import Interfaces = require('../Interfaces');
export declare const FirstFocusableId = "reactxp-first-focusable";
export declare type SortAndFilterFunc = (candidates: Types.FocusCandidate[]) => Types.FocusCandidate[];
export declare function setSortAndFilterFunc(sortAndFilter: SortAndFilterFunc): void;
export declare class FocusArbitratorProvider {
    private _id;
    private _parentArbitratorProvider;
    private _view;
    private _arbitratorCallback;
    private _candidates;
    private _pendingChildren;
    constructor(view?: Interfaces.View, arbitrator?: Types.FocusArbitrator);
    private _notifyParent();
    private _arbitrate();
    private _requestFocus(component, focus, isAvailable, accessibilityId?);
    private static _arbitrate(candidates, arbitrator?);
    setCallback(arbitrator?: Types.FocusArbitrator): void;
    static requestFocus(component: React.Component<any, any>, focus: () => void, isAvailable: () => boolean, accessibilityId?: string): void;
}
export declare function requestFocus(component: React.Component<any, any>, focus: () => void, isAvailable: () => boolean, accessibilityId?: string): void;
