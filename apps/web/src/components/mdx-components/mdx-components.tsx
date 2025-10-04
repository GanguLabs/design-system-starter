import Image from 'next/image';
import * as runtime from 'react/jsx-runtime';
import { Callout } from '../callout/callout';

const useMDXComponent = (code: string) => {
	const fn = new Function(code);
	return fn({ ...runtime }).default;
};

const components = {
	Image,
	Callout,
};

interface MdxProps {
	code: string;
}

export function MdxContent({ code }: MdxProps) {
	const Component = useMDXComponent(code);
	return <Component components={components} />;
}
