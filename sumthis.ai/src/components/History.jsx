const History = ({ history, handleDelete, handlePdf }) => {
  return (
    <section className="mt-4 bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Sum History</h2>
      {history.length === 0 ? (
        <p className="text-gray-700">Nothing to see here ...</p>
      ) : (
        <ul className="list-disc list-inside text-gray-700 flex flex-col gap-2">
          {history.map((item, index) => (
            <li key={index} className="flex items-center justify-between">
              <span className="truncate max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl block">
                {item}
              </span>
              <div className="flex items-center ml-4 flex-shrink-0">
                <button
                  onClick={() => handleDelete(index)}
                  className="ml-2 px-2 py-1 bg-red-400 text-white rounded hover:bg-red-500 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => handlePdf(index)}
                  className="ml-2 px-2 py-1 bg-red-400 text-white rounded hover:bg-red-500 transition"
                >
                  PDF
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