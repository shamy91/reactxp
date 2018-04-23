/// <reference types="react" />
/**
* TextInput.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Web-specific implementation of the cross-platform TextInput abstraction.
*/
import React = require('react');
import { FocusArbitratorProvider } from '../common/utils/AutoFocusHelper';
import Types = require('../common/Types');
export interface TextInputState {
    inputValue?: string;
}
export interface TextInputContext {
    focusArbitrator?: FocusArbitratorProvider;
}
export declare class TextInput extends React.Component<Types.TextInputProps, TextInputState> {
    static contextTypes: React.ValidationMap<any>;
    context: TextInputContext;
    private _mountedComponent;
    private _selectionStart;
    private _selectionEnd;
    private _isFocused;
    private _ariaLiveEnabled;
    constructor(props: Types.TextInputProps, context: TextInputContext);
    componentWillReceiveProps(nextProps: Types.TextInputProps): void;
    componentDidMount(): void;
    render(): JSX.Element;
    private _onMount;
    private _onInput;
    private _onFocus;
    private _onBlur;
    private _getKeyboardType();
    private _onPaste;
    private _onInputChanged;
    private _checkSelectionChanged;
    private _onKeyDown;
    private _onScroll;
    private _focus;
    blur(): void;
    focus(): void;
    setAccessibilityFocus(): void;
    isFocused(): boolean;
    selectAll(): void;
    selectRange(start: number, end: number): void;
    getSelectionRange(): {
        start: number;
        end: number;
    };
    setValue(value: string): void;
}
export default TextInput;
