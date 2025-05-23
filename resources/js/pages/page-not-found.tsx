const CustomReact = () => {
    return (
        <div className="flex h-[100vh] items-center justify-center bg-white px-5 lg:px-0">
            <div className="mx-auto w-[415px] flex-col items-center justify-center gap-[100px] text-center">
                <div className="mb-8 md:mb-[56px]">
                    <div className="relative mx-auto flex h-[160px] w-full max-w-[312px] items-center justify-center">
                        <img src="/images/404/404.jpg" alt="404" />
                    </div>
                </div>
                <div>
                    <h3 className="text-4xl leading-[64px] text-black md:text-[56px]">Page Not Found</h3>
                </div>
                <div className="mt-3 flex flex-col gap-6">
                    <div className="text-center">
                        <p className="font-sans text-base leading-6 tracking-wider text-black">
                            Sepertinya Anda Tersesat, Take A break dan kembali ke halaman utama
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <a
                            href="/"
                            className="flex h-[48px] w-full max-w-[146px] items-center justify-center rounded-[100px] bg-green-500 font-sans text-sm font-medium text-white hover:bg-green-600"
                        >
                            Home Page
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CustomReact;
