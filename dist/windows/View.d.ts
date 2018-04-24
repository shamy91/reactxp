/// <reference types="react" />
/**
* View.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Windows-specific implementation of View.
*/
import React = require('react');
import RN = require('react-native');
import Types = require('../common/Types');
import { View as ViewCommon, ViewContext as ViewContextCommon } from '../native-common/View';
import { FocusManagerFocusableComponent, FocusManager } from '../native-desktop/utils/FocusManager';
import PopupContainerView from '../native-common/PopupContainerView';
export interface ViewContext extends ViewContextCommon {
    isRxParentAText?: boolean;
    focusManager?: FocusManager;
    popupContainer?: PopupContainerView;
}
export declare class View extends ViewCommon implements React.ChildContextProvider<ViewContext>, FocusManagerFocusableComponent {
    static contextTypes: React.ValidationMap<any>;
    context: ViewContext;
    static childContextTypes: React.ValidationMap<any>;
    private _onKeyDown;
    private _onMouseEnter;
    private _onMouseLeave;
    private _onMouseOver;
    private _onMouseMove;
    private _focusableElement;
    private _focusManager;
    private _limitFocusWithin;
    private _isFocusLimited;
    private _isFocusRestricted;
    private _popupContainer;
    private _popupToken;
    constructor(props: Types.ViewProps, context: ViewContext);
    componentWillReceiveProps(nextProps: Types.ViewProps): void;
    enableFocusManager(): void;
    disableFocusManager(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    protected _buildInternalProps(props: Types.ViewProps): void;
    render(): JSX.Element;
    private _onFocusableRef;
    focus(): void;
    blur(): void;
    getChildContext(): ViewContext;
    private _isHidden();
    setFocusRestricted(restricted: boolean): void;
    setFocusLimited(limited: boolean): void;
    setNativeProps(nativeProps: RN.ViewProps): void;
    protected _isButton(viewProps: Types.ViewProps): boolean;
    private _onFocusableKeyDown;
    private _onFocusableKeyUp;
    private _onFocus;
    private _onBlur;
    onFocus(): void;
    getTabIndex(): number | undefined;
    updateNativeTabIndex(): void;
}
export default View;
