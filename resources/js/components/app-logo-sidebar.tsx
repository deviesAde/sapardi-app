import { ImgHTMLAttributes } from 'react';

export default function AppLogoSidebar() {
    return (
        <img src="/images/landing/logo.png" alt="App Logo" style={{ width: '50px', height: '50px', marginTop: '-10px', objectFit: 'contain' }} />
    );
}
