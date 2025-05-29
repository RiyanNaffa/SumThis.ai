const History = ({ history, handleDelete, handlePdf, isDark }) => {
  return (
    <section className={`mt-4 mb-4 p-4 rounded-lg shadow-lg transition-colors duration-300 ${
      isDark 
        ? 'bg-[#1a1a1a] border border-[#a1a978]' 
        : 'bg-[#f8f8ef] border border-[#6ca494]'
    }`}>
      <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-[#ffef73]' : 'text-[#020202]'}`}>
        Sum History
      </h2>
      {history.length === 0 ? (
        <p className={`${isDark ? 'text-[#a1a978]' : 'text-[#6ca494]'} text-center py-4 italic`}>
          Nothing to see here...
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {history.map((item, index) => (
            <li 
              key={index} 
              className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 border ${
                isDark 
                  ? 'bg-[#020202] border-[#a1a978] hover:bg-[#2a2a2a] hover:border-[#6ca494]' 
                  : 'bg-[#fdfefd] border-[#6ca494] hover:bg-[#dbe370] hover:border-[#a4e2cd]'
              }`}
            >
              <span className={`truncate max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl block ${
                isDark ? 'text-[#fdfefd]' : 'text-[#020202]'
              }`}>
                {item}
              </span>
              <div className="flex items-center ml-4 flex-shrink-0 gap-2">
                <button
                  onClick={() => handlePdf(index)}
                  className={`px-3 py-1 rounded transition-all duration-300 font-medium text-sm ${
                    isDark 
                      ? 'bg-[#6ca494] text-[#020202] hover:bg-[#a4e2cd] hover:shadow-md' 
                      : 'bg-[#6ca494] text-[#fdfefd] hover:bg-[#a4e2cd] hover:text-[#020202] hover:shadow-md'
                  }`}
                >
                  PDF
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className={`px-3 py-1 rounded transition-all duration-300 font-medium text-sm ${
                    isDark 
                      ? 'bg-[#e3bb74] text-[#020202] hover:bg-[#ffef73] hover:shadow-md' 
                      : 'bg-[#e3bb74] text-[#020202] hover:bg-[#ffef73] hover:shadow-md'
                  }`}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default History;