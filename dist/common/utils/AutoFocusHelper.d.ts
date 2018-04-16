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
export declare const FirstFocusableId = "reactxp-first-focusable";
export declare type SortAndFilterFunc = (candidates: Types.FocusCandidate[]) => Types.FocusCandidate[];
export declare function setSortAndFilterFunc(sortAndFilter: SortAndFilterFunc): void;
export declare function setFocusArbitrator(arbitrator: Types.FocusArbitrator): void;
export declare function requestFocus(component: React.Component<any, any>, focus: () => void, accessibilityId?: string): void;
