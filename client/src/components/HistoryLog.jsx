  import { useEffect, useState } from 'react';
  import { getHistory } from '../api';

  export default function HistoryLog({ refresh }) {
    const [history, setHistory] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
      getHistory(page).then((res) => {
        setHistory(res.data.data);
        setTotalPages(res.data.totalPages);
      });
    }, [refresh, page]);

    return (
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Claim History</h3>
        <ul className="bg-[#121212] p-4 rounded border border-[#f0f0f0] max-h-60 overflow-y-scroll">
          {history.map((entry, idx) => (
            <li key={idx} className="border-b border-gray-700 py-1 text-gray-300">
              {entry.userId.name} claimed {entry.points} pts on{' '}
              {new Date(entry.claimedAt).toLocaleString()}
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="px-2 text-white disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-2 text-gray-300">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="px-2 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    );
  }
