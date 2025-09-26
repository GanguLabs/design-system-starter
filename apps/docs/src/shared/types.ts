import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps, JSXElementConstructor } from 'react';

type AllProps =
	| keyof React.JSX.IntrinsicElements
	| JSXElementConstructor<unknown>;

export type ComponentStruct = Meta<ComponentProps<AllProps>>;

export type Story = StoryObj<ComponentProps<AllProps>>;
export type Stories = Record<string, Story>;
export type StoriesCollection = Array<[string, Story | undefined]>;
