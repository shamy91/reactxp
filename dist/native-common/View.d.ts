/// <reference types="react" />
import React = require('react');
import RN = require('react-native');
import { FocusArbitratorProvider } from '../common/utils/AutoFocusHelper';
import Types = require('../common/Types');
import ViewBase from './ViewBase';
export interface ViewContext {
    focusArbitrator?: FocusArbitratorProvider;
}
export declare class View extends ViewBase<Types.ViewProps, {}> {
    static contextTypes: React.ValidationMap<any>;
    context: ViewContext;
    static childContextTypes: React.ValidationMap<any>;
    protected _internalProps: any;
    touchableGetInitialState: () => RN.Touchable.State;
    touchableHandleStartShouldSetResponder: () => boolean;
    touchableHandleResponderTerminationRequest: () => boolean;
    touchableHandleResponderGrant: (e: React.SyntheticEvent<any>) => void;
    touchableHandleResponderMove: (e: React.SyntheticEvent<any>) => void;
    touchableHandleResponderRelease: (e: React.SyntheticEvent<any>) => void;
    touchableHandleResponderTerminate: (e: React.SyntheticEvent<any>) => void;
    private _mixinIsApplied;
    private _childrenKeys;
    private _mixin_componentDidMount?;
    private _mixin_componentWillUnmount?;
    private _isMounted;
    private _hideTimeout;
    private _defaultOpacityValue;
    private _opacityAnimatedValue;
    private _opacityAnimatedStyle;
    private _focusArbitratorProvider;
    constructor(props: Types.ViewProps, context: ViewContext);
    componentWillReceiveProps(nextProps: Types.ViewProps): void;
    componentWillUpdate(nextProps: Types.ViewProps, nextState: {}): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private _updateMixin(props, initial);
    getChildContext(): ViewContext;
    /**
     * Attention:
     * be careful with setting any non layout properties unconditionally in this method to any value
     * as on android that would lead to extra layers of Views.
     */
    protected _buildInternalProps(props: Types.ViewProps): void;
    private _isTouchFeedbackApplicable();
    private _opacityActive(duration);
    private _opacityInactive(duration);
    private _getDefaultOpacityValue(props);
    private _setOpacityTo(value, duration);
    private _showUnderlay();
    private _hideUnderlay;
    protected _isButton(viewProps: Types.ViewProps): boolean;
    private _updateFocusArbitratorProvider(props);
    render(): JSX.Element;
    touchableHandlePress(e: Types.SyntheticEvent): void;
    touchableHandleLongPress(e: Types.SyntheticEvent): void;
    touchableHandleActivePressIn(e: Types.SyntheticEvent): void;
    touchableHandleActivePressOut(e: Types.SyntheticEvent): void;
    touchableGetHighlightDelayMS(): number;
    touchableGetPressRectOffset(): {
        top: number;
        left: number;
        right: number;
        bottom: number;
    };
    focus(): void;
    setFocusRestricted(restricted: boolean): void;
    setFocusLimited(limited: boolean): void;
}
export default View;
