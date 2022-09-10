import { useState, useEffect } from 'react';
import { FaChevronUp } from 'react-icons/fa';

export default function ScrollToTop() {
  const [showScroll, setShowScroll] = useState(false);
  useEffect(() => {
    const checkScrollTop = () => {
      if (window.pageYOffset > 400) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, []);

  return (
    <button
      className={`flex justify-center items-center fixed bottom-4 right-4 w-12 h-12 border-none bg-blue-900 rounded-full text-white transition duration-500 hover:opacity-75 ${
        showScroll ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <FaChevronUp size={28} />
    </button>
  );
}
