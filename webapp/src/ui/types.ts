/**
 * THEME
 */
export type Typography = {
    fontFamily: string
}

export type Sizes = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
export type Colors = 'bg' | 'text' | 'white' | 'primary' | 'secondary' | 'warning' | 'success' | 'danger'
export type ColorsObject = Record<Colors, string>
export type SpacingObject = Record<Sizes, string>
export type FontSizeObject = Record<Sizes, string>
export type RadiusObject = Record<'xs' | 'md' | 'lg', string>
export type ElevationObject = Record<'xs' | 'md' | 'lg', string>
export type Styled<T extends object> = AddPrefixToObject<T, '$'>


/**
 * Styles
 */
export type ColorStyle = {
    color?: Colors
    bg?: Colors
}



/**
 * BUTTON
 */
export type VariantButton = 'text' | 'contained' | 'outlined'
export type SizeButton = 'xs' | 'md' | 'lg'
export type TextAlignButton = 'left' | 'center' | 'right' | 'between' | 'evenly'


/**
 * DROIPDOWN
 */

export type DropdownLinks = {
    icon?: React.ReactNode
    to: string
    label: string
}


/**
 * INPUT
 */
export type InputSize = 'xs' | 'md' | 'lg'


/**
 * HELPERS
 */
type AddPrefix<TKey, TPrefix extends string> = TKey extends string
    ? `${TPrefix}${TKey}`
    : never;

type RemovePrefix<TPrefixedKey, TPrefix extends string> = TPrefixedKey extends AddPrefix<infer TKey, TPrefix>
    ? TKey
    : '';

type PrefixedValue<TObject extends object, TPrefixedKey extends string, TPrefix extends string> = TObject extends { [K in RemovePrefix<TPrefixedKey, TPrefix>]: infer TValue }
    ? TValue
    : never;

type AddPrefixToObject<TObject extends object, TPrefix extends string> = {
    [K in AddPrefix<keyof TObject, TPrefix>]: PrefixedValue<TObject, K, TPrefix>
}
