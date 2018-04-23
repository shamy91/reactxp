/// <reference types="react" />
import PropTypes = require('prop-types');
import React = require('react');
import RN = require('react-native');
import { FocusArbitratorProvider } from '../common/utils/AutoFocusHelper';
import Types = require('../common/Types');
export interface TextContext {
    isRxParentAText: boolean;
    focusArbitrator?: FocusArbitratorProvider;
}
export declare class Text extends React.Component<Types.TextProps, {}> implements React.ChildContextProvider<TextContext> {
    static contextTypes: {
        focusArbitrator: PropTypes.Requireable<any> & PropTypes.Validator<any>;
    };
    context: TextContext;
    static childContextTypes: React.ValidationMap<any>;
    protected _mountedComponent: RN.ReactNativeBaseComponent<any, any> | null;
    setNativeProps(nativeProps: RN.TextProps): void;
    render(): JSX.Element;
    componentDidMount(): void;
    protected _onMount: (component: RN.ReactNativeBaseComponent<any, any> | null) => void;
    private _onPress;
    getChildContext(): {
        isRxParentAText: boolean;
    };
    protected _getStyles(): Types.StyleRuleSetRecursiveArray<Types.TextStyleRuleSet>;
    focus(): void;
    blur(): void;
}
export default Text;
