/** Internal Leonardo Casting Types */
interface LeonardoSwatch {
	name: string;
	value: string;
	contrast: number;
}
/** Background scales in theme.contrastColors have this shape */
interface LeonardoBackgroundOutput {
	// name: string;
	// values: LeonardoSwatch[];
	background: string; // Background unique property
}
/** Foreground scales in theme.contrastColors have this shape */
interface LeonardoColorOutput {
	name: string;
	values: LeonardoSwatch[];
}

// type LeonardoOutputScale = LeonardoBackgroundOutput | LeonardoColorOutput;
