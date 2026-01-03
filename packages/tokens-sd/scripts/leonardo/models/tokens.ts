/**
 * Individual W3C Color Token leaf node (Inherits type from parent)
 */
export interface W3CColorToken {
	$value: string;
	// $type?: 'color';
	$description?: string;
}

/**
 * A group of tokens (e.g., 'neutral' or 'blue')
 */
export interface W3CColorGroup {
	[key: string]: W3CColorToken | string | undefined;
	$type?: 'color';
}

/**
 * The root structure of the generated JSON
 */
export interface W3CTokenExport {
	color?: { $type: 'color'; [scaleName: string]: W3CColorGroup | 'color' };
	semantic?: {
		$type: 'color';
		[tokenName: string]: W3CColorGroup | W3CColorToken | 'color';
	};
}
