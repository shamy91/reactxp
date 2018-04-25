/// <reference types="react" />
/**
* AutoFocusHelper.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Provides the functions which allow to handle the selection of a proper component
* to focus from the multiple candidates with autoFocus=true.
*/
import React = require('react');
import Types = require('../Types');
import Interfaces = require('../Interfaces');
export declare type SortAndFilterFunc = (candidates: FocusCandidate[]) => FocusCandidate[];
export declare function setSortAndFilterFunc(sortAndFilter: SortAndFilterFunc): void;
export declare function setRootFocusArbitrator(arbitrator: Types.FocusArbitrator | undefined): void;
export declare function setFocusFirstEnabled(enabled: boolean): void;
export declare class FocusCandidate implements Types.FocusCandidate {
    component: React.Component<any, any>;
    focus: () => void;
    isAvailable: () => boolean;
    getParentAccessibilityId: () => string | undefined;
    constructor(component: React.Component<any, any>, focus: () => void, isAvailable: () => boolean, parentAccessibilityId: string | undefined);
    getAccessibilityId(): string | undefined;
}
export declare class FirstFocusCandidate extends FocusCandidate {
}
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
    private _requestFocus(component, focus, isAvailable, isFirstFocusable?);
    private static _arbitrate(candidates, arbitrator?);
    setCallback(arbitrator?: Types.FocusArbitrator): void;
    static requestFocus(component: React.Component<any, any>, focus: () => void, isAvailable: () => boolean, isFirstFocusable?: boolean): void;
}
