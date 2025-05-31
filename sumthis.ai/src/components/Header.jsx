import { AiOutlineSun, AiOutlineMoon } from 'react-icons/ai';
import { useState } from 'react';

const Header = ({ isDark, setIsDark }) => {
    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    return (
        <div className={`flex justify-between items-center p-4 ${isDark ? 'bg-[#9faf86]' : 'bg-[#dbe370]'} transition-colors duration-300`}>
            <div className="flex items-center space-x-4">
                <div>
                    <a href="/"><img src="/sumthis.svg" alt="Logo" className="h-20 w-auto" style={{ maxHeight: '4rem' }} /></a>
                </div>
                <div>
                    <a href="/"><h1 className={`text-3xl font-bold transition-colors duration-300 
                        ${isDark 
                        ? 'text-[#fdfefd] hover:text-[#ffef73]' 
                        : 'text-[#020202] hover:text-[#fdfefd]'
                        }`}>SumThis.ai</h1></a>
                </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
                <div 
                    className={`p-2 m-4 border-2 rounded-xl cursor-pointer transition-all duration-300 flex justify-center
                        ${isDark 
                        ? 'border-[#a4e2cd] hover:border-[#6ca494] hover:bg-[#6ca494]'
                        : 'border-[#6ca494] hover:border-[#a4e2cd] hover:bg-[#6ca494]'
                    }`}
                    onClick={toggleTheme}
                >
                    {isDark ? (
                        <AiOutlineSun className={`text-[#020202] text-xl transition-colors duration-300
                            ${isDark 
                            ? 'text-[#fdfefd] hover:text-[#ffef73]' 
                            : 'text-[#020202] hover:text-[#fdfefd]'
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