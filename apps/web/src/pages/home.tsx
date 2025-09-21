import { button as buttonStyles } from '@repo/styles/button.css';

import {
  actions,
  container,
  content,
  description as descriptionStyle,
  image,
  title as titleStyle,
} from '@repo/styles/card.css';
import Image from 'next/image';
import { grid } from './home.css';

import { ButtonHTMLAttributes, ReactNode } from 'react';
// Define the props for the Button component
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => (
  <button className={buttonStyles} {...props}>
    {children}
  </button>
);

// Define the props for the Card component
interface CardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
}

const Card = ({ imageSrc, imageAlt, title, description }: CardProps) => (
  <div className={container}>
    <Image
      src={imageSrc}
      alt={imageAlt}
      width={1024}
      height={1024}
      className={image}
    />
    <div className={content}>
      <div className={titleStyle}>{title}</div>
      <div className={descriptionStyle}>{description}</div>
      <div className={actions}>
        <Button>Order This Mouse Now!</Button>
      </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <div className={grid}>
      <Card
        imageSrc="/mouse-cyberpunk-2.png"
        imageAlt="Cyberpunk mouse"
        title="Odd Cyberpunk Mouse"
        description="What is this thing? Not even we know? But it's cool, right? Is it even useful?"
      />
      <Card
        imageSrc="/mouse-50s.png"
        imageAlt="50s mouse"
        title="Retro Mouse"
        description="Check out this amazing retro gaming mouse. It's like you went back to the 50s!"
      />
    </div>
  );
}
