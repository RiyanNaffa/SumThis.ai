import { AiOutlineSun, AiOutlineMoon } from 'react-icons/ai';

const Header = ({ isDark, setIsDark }) => {
    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    return (
        <div className={`flex justify-between items-center p-4 ${isDark ? 'bg-[#9faf86]' : 'bg-[#dbe370]'} transition-colors duration-300`}>
            <div className="flex items-center space-x-4 pt-8 pl-8 pb-4">
                <div>
                    <a href="/" className="group">
                        <img
                        src="/sumthis.svg"
                        alt="Logo"
                        className="h-80 w-auto drop-shadow-[0_8px_9px_#707c5e] transition-transform duration-300 group-hover:scale-110"
                        style={{ maxHeight: '8rem', minHeight: '2rem' }}
                        />
                    </a>
                </div>
                <div>
                    <a href="/" className='group'>
                    <h1 className={`text-3xl font-extrabold transition-all duration-300 
                        ${isDark 
                            ? 'text-[#fdfefd] hover:text-[#ffef73]' 
                            : 'text-[#020202] hover:text-[#fdfefd]'
                        }
                        group-hover:scale-110
                        `}>
                        <span style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 600 }}>
                            SumThis.ai
                        </span>
                    </h1>
                    </a>
                </div>
            </div>
            <div className="flex flex-col items-center space-y-4 pr-8">
                <div 
                    className={`p-2 m-4 border-2 rounded-xl cursor-pointer transition-all duration-300 flex justify-center
                        ${isDark 
                        ? 'border-[#a4e2cd] hover:border-[#6ca494] hover:bg-[#6ca494]'
                        : 'border-[#6ca494] hover:border-[#a4e2cd] hover:bg-[#6ca494]'
                    }`}
                    onClick={toggleTheme}
                >
                    {isDark ? (
                        <AiOutlineSun className={`text-[#020202] text-xl transition-all duration-300
                            ${isDark 
                            ? 'text-[#fdfefd] hover:text-[#ffef73] hover:rotate-45'
                            : 'text-[#020202] hover:text-[#fdfefd] hover:rotate-45'
                        }`} />
                    ) : (
                        <AiOutlineMoon className={`text-[#020202] text-xl transition-colors duration-300
                        ${isDark 
                            ? 'text-[#fdfefd] hover:text-[#ffef73]' 
                            : 'text-[#020202] hover:text-[#fdfefd]'
                        }`} />
                    )}
                </div>
                <div className={`py-0.5 px-4 border-2 rounded-xl cursor-pointer transition-all duration-300
                    ${isDark 
                        ? 'border-[#a4e2cd] hover:border-[#6ca494] hover:bg-[#6ca494]' 
                        : 'border-[#6ca494] hover:border-[#a4e2cd] hover:bg-[#6ca494]'
                    }`}>
                    <a href="/about" className={`text-center transition-colors duration-300
                        ${isDark 
                            ? 'text-[#fdfefd] hover:text-[#ffef73]' 
                            : 'text-[#020202] hover:text-[#fdfefd]'
                        }`}>
                        About
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Header;