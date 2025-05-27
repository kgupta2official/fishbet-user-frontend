const BlockedPage = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen bg-white text-black text-center">
                <h1 className="text-2xl md:text-4xl font-bold mb-4">
                    This site is not available in your location.
                </h1>
                <p className="text-lg md:text-xl font-medium">
                    If you believe this is a mistake, please contact support.
                </p>
            </div>
        </>
    );
};
export default BlockedPage;