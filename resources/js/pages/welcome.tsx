import HeaderAuth from '@/components/Auth/HeaderAuth';
import GrowingLoader from '@/components/GrowingLoader';
import ChatBotSection from '@/components/Landing/chatbotsection';
import WhyChooseUs from '@/components/Landing/Feature';
import Footer from '@/components/Landing/Footer';
import Header from '@/components/Landing/Header';
import Hero from '@/components/Landing/hero';
import { usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Welcome = () => {
    const { auth } = usePage<{ auth: { user?: { id: number; name: string } } }>().props;

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 6000);
        return () => clearTimeout(timer);
    }, []);

   
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: 'beforeChildren',
                staggerChildren: 0.2,
            },
        },
    };

    const sectionVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
            },
        },
    };

    if (isLoading) return <GrowingLoader />;

    return (
        <div className="overflow-x-hidden">
            {/* Header with fade animation */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                {auth.user ? <HeaderAuth /> : <Header />}
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                {/* Hero section */}
                <motion.section variants={sectionVariants}>
                    <Hero />
                </motion.section>

                {/* WhyChooseUs section with slight delay */}
                <motion.section variants={sectionVariants} transition={{ delay: 0.2 }}>
                    <WhyChooseUs />
                </motion.section>

                {/* ChatBotSection with more delay */}
                <motion.section variants={sectionVariants} transition={{ delay: 0.4 }}>
                    <ChatBotSection />
                </motion.section>

                {/* Footer */}
                <motion.section variants={sectionVariants} transition={{ delay: 0.6 }}>
                    <Footer />
                </motion.section>
            </motion.div>
        </div>
    );
};

export default Welcome;
