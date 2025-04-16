import Hero from '@/components/Landing/hero'
import Header from '@/components/Landing/Header'
import WhyChooseUs from '@/components/Landing/Feature'
import ChatBotSection from '@/components/Landing/chatbotsection'
const Welcome = () => {
    return (
        <div>
            <Header />

            <Hero />

            <WhyChooseUs />
            <ChatBotSection />
        </div>
    )
}


export default Welcome
