import { CgCoffee } from "react-icons/cg";

const Footer = ({ isDark }) => {
  return (
    <footer className={`bottom-0 left-0 w-full py-4 transition-colors duration-300 ${isDark ? 'bg-[#9faf86]' : 'bg-[#dbe370]'}`}>
      <div className="container mx-auto text-center">
        <p className={`text-sm ${isDark ? 'text-[#fdfefd]' : 'text-[#020202]'}`}>
          &copy; {new Date().getFullYear()} SumThis.ai. All rights reserved.
        </p>
        <p className={`inline-flex text-xs mt-2 ${isDark ? 'text-[#fdfefd]' : 'text-[#020202]'}`}>
          Made with <CgCoffee className={`mx-1 my-0.5 ${isDark ? 'text-[#f0e7a1]' : 'text-[#4e7c6f]'}`}/> by 
          <a 
            href="https://github.com/RiyanNaffa/"
            target="_blank" 
            rel="noopener noreferrer"
            className={`mx-1 rounded transition-all duration-300
              ${isDark 
                ? 'hover:bg-[#6ca494] hover:text-[#fdfefd]' 
                : 'hover:bg-[#6ca494] hover:text-[#fdfefd]'
              }`}
          >
            Riyan Naffa Nusafara
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;