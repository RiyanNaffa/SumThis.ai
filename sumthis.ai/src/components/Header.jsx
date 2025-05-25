const Header = ({ title }) => {
    return (
        <div className="justify-between items-center p-4 bg-blue-500 text-white">
            <div className="flex items-center space-x-4">
                <div><a href="/"><img src="/finfit.svg" alt="Logo" className="h-20 w-auto" style={{ maxHeight: '4rem' }} /></a></div>
                <div><a href="/"><h1 className="text-3xl font-bold">{title}</h1></a></div>
            </div>
            <div className="flex space-x-4">
                <a href="/about" className="text-white hover:text-gray-200">
                    About
                </a>
                <a href="/history" className="text-white hover:text-gray-200">
                    History
                </a>
            </div>
        </div>
    );
};

export default Header;