import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {

    return (
        <img
            src="/images/landing/logo-mono.png"
            alt="App Logo"
            className="size-9"
            style={{ width: '350px', height: '160px', marginTop: '-100px'}} 
            {...props}
        />
    );
}
