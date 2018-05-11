import { Accessibility as NativeAccessibility } from '../native-common/Accessibility';
export declare class Accessibility extends NativeAccessibility {
    private _isHighContrast;
    constructor();
    private _updateIsHighContrast(isEnabled);
    isHighContrastEnabled(): boolean;
    announceForAccessibility(announcement: string): void;
}
declare const _default: Accessibility;
export default _default;
