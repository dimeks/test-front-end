import 'styled-components';
import { ColorsObject, RadiusObject, ElevationObject, SpacingObject, FontSizeObject, Typography } from './types';

declare module 'styled-components' {
    export interface DefaultTheme {
        typography: Typography;
        colors: ColorsObject;
        colors: ColorsObject;
        radius: RadiusObject;
        elevation: ElevationObject;
        spacing: SpacingObject;
        fontSize: FontSizeObject;
    }
}