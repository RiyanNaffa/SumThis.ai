const Header = ({ title }) => {
    return (
        <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
            <div className="flex items-center space-x-3">
                <img src="/finfit.svg" alt="Logo" className="h-10 w-auto" style={{ maxHeight: '2.5rem' }} />
                <h1 className="text-3xl font-bold">{title}</h1>
            </div>
            <div className="flex space-x-4">
                <a href="/" className="text-white hover:text-gray-200">
                    Home
                </a>
                <a href="/about" className="text-white hover:text-gray-200">
                    About
                </a>
                <a href="/contact" className="text-white hover:text-gray-200">
                    Contact
                </a>
            </div>
        </div>
    );
};

export default Header;