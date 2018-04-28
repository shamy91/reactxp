/// <reference types="react" />
/**
* Link.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* RN Desktop-specific implementation of the cross-platform Link abstraction.
*/
import React = require('react');
import RN = require('react-native');
import { FocusManagerFocusableComponent } from '../native-desktop/utils/FocusManager';
import { Link as LinkCommon } from '../native-common/Link';
export interface LinkContext {
    isRxParentAText?: boolean;
}
export declare class Link extends LinkCommon implements FocusManagerFocusableComponent {
    static contextTypes: React.ValidationMap<any>;
    context: LinkContext;
    protected _render(internalProps: RN.TextProps): JSX.Element;
    private _renderLinkAsFocusableText(internalProps);
    private _focusableElement;
    private _onFocusableRef;
    private _createFocusableTextProps(internalProps);
    private _nativeHyperlinkElement;
    private _onNativeHyperlinkRef;
    private _renderLinkAsNativeHyperlink(internalProps);
    focus(): void;
    blur(): void;
    setNativeProps(nativeProps: RN.TextProps): void;
    private _onKeyDown;
    private _onKeyUp;
    private _onFocus;
    onFocus(): void;
    getTabIndex(): number | undefined;
    updateNativeTabIndex(): void;
}
export default Link;
