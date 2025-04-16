import React from 'react';

type FeatureItemProps = {
    text: string;
};

const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => (
   <div className="flex items-start gap-3">
    <img
      src="/images/icons/iconrice.png"
      alt="Icon Padi"
      className="w-5 h-5 mt-1 object-contain"
    />
    <p className="text-sm md:text-base">{text}</p>
  </div>
);

const WhyChooseUs: React.FC = () => {
    return (
         <section className="bg-[#123524] px-6 py-16 text-white">
            <div className="mx-auto max-w-6xl text-center">
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">Kenapa Memilih Kami?</h2>
                <p className="mx-auto mb-8 max-w-3xl text-base md:text-lg">
                    Dengan <span className="font-semibold">SAPARDI</span>, Anda mendapatkan solusi cerdas berbasis teknologi AI untuk deteksi penyakit
                    padi secara cepat, akurat, dan mudah digunakan. Kami menggabungkan keahlian di bidang pertanian dan kecerdasan buatan untuk
                    memberikan informasi yang dapat diandalkan. Komitmen kami adalah menyajikan layanan yang ramah pengguna, terus diperbarui, dan
                    relevan dengan kebutuhan lapangan.
                </p>

                <div className="grid items-center gap-8 md:grid-cols-2">
                    <div className="grid grid-cols-2 place-content-center gap-4">
                        <img src="images/landing/gambar1.png" alt="Petani dengan tablet" className="h-40 w-full rounded-md object-cover md:h-48" />
                        <img src="images/landing/gambar2.png" alt="Padi" className="h-40 w-full rounded-md object-cover md:h-48" />
                        <img
                            src="images/landing/gambar3.png"
                            alt="Penanaman padi"
                            className="col-span-2 mx-auto h-40 w-full rounded-md object-cover md:h-48"
                            style={{ maxWidth: '80%' }}
                        />
                    </div>

                    <div className="space-y-4 text-left">
                        <FeatureItem text="Menggunakan AI berbasis scan" />
                        <FeatureItem text="Dilengkapi ChatBot untuk menunjang kebutuhan anda" />
                        <FeatureItem text="Dapat Memberikan saran yang tepat dan sesuai dengan penyakit padi anda" />
                        <FeatureItem text="Data Aktual dari sumber yang terpercaya" />

                        <button className="mt-6 rounded-md bg-[#67AE6E] px-6 py-3 font-semibold text-white transition hover:bg-green-600">
                            Mulai Scan!
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
