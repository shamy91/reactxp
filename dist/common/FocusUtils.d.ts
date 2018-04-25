/// <reference types="react" />
/**
* FocusUtils.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Publicly accessible functions for managing the focus.
*/
import RXInterfaces = require('./Interfaces');
import { FocusArbitrator } from './Types';
export declare class FocusUtils implements RXInterfaces.FocusUtils {
    setFocusFirstEnabled(enabled: boolean): void;
    requestFocus(component: React.Component<any, any>, focus: () => void, isAvailable: () => boolean): void;
    setDefaultFocusArbitrator(arbitrator: FocusArbitrator | undefined): void;
}
declare const _default: FocusUtils;
export default _default;
