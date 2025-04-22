import HeaderAuth from '@/components/Auth/HeaderAuth';
import ChatBotSection from '@/components/Landing/chatbotsection';
import WhyChooseUs from '@/components/Landing/Feature';
import Footer from '@/components/Landing/Footer';
import Header from '@/components/Landing/Header';
import Hero from '@/components/Landing/hero';
import { usePage } from '@inertiajs/react';

const Welcome = () => {
    const { auth } = usePage<{ auth: { user?: { id: number; name: string } } }>().props; // Mengambil data autentikasi dari backend

    return (
        <div>
            
            {auth.user ? <HeaderAuth /> : <Header />}

            <Hero />
            <WhyChooseUs />
            <ChatBotSection />
            <Footer />
        </div>
    );
};

export default Welcome;
