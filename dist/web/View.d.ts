/// <reference types="react" />
/**
* View.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Web-specific implementation of the cross-platform View abstraction.
*/
import React = require('react');
import { FocusArbitratorProvider } from '../common/utils/AutoFocusHelper';
import Types = require('../common/Types');
import ViewBase from './ViewBase';
import PopupContainerView from './PopupContainerView';
import { FocusManager } from './utils/FocusManager';
export interface ViewContext {
    isRxParentAText?: boolean;
    focusManager?: FocusManager;
    popupContainer?: PopupContainerView;
    focusArbitrator?: FocusArbitratorProvider;
}
export declare class View extends ViewBase<Types.ViewProps, {}> {
    static contextTypes: React.ValidationMap<any>;
    context: ViewContext;
    static childContextTypes: React.ValidationMap<any>;
    private _focusManager;
    private _limitFocusWithin;
    private _isFocusLimited;
    private _isFocusRestricted;
    private _focusArbitratorProvider;
    private _resizeDetectorAnimationFrame;
    private _resizeDetectorNodes;
    private _popupContainer;
    private _popupToken;
    constructor(props: Types.ViewProps, context: ViewContext);
    private _renderResizeDetectorIfNeeded(containerStyles);
    private _resizeDetectorReset();
    private _resizeDetectorOnScroll();
    getChildContext(): ViewContext;
    protected _getContainer(): HTMLElement | null;
    private _isHidden();
    private _updateFocusArbitratorProvider(props);
    setFocusRestricted(restricted: boolean): void;
    setFocusLimited(limited: boolean): void;
    render(): React.ReactElement<any>;
    componentWillReceiveProps(nextProps: Types.ViewProps): void;
    enableFocusManager(): void;
    disableFocusManager(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
}
export default View;
