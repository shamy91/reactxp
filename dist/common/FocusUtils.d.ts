/**
* FocusUtils.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Publicly accessible functions for managing the focus.
*/
import RXInterfaces = require('./Interfaces');
import { requestFocus, setFocusArbitrator } from './utils/AutoFocusHelper';
export declare class FocusUtils implements RXInterfaces.FocusUtils {
    FirstFocusableId: string;
    setFocusArbitrator: typeof setFocusArbitrator;
    requestFocus: typeof requestFocus;
}
declare const _default: FocusUtils;
export default _default;