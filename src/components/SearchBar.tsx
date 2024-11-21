'use client';

import { useState, useEffect, useRef } from 'react';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
import { useDebounce } from '@/hooks/useDebounce';
import { getLegalSuggestions } from '@/lib/gemini';

interface Suggestion {
  title: string;
  year: string;
  court: string;
  brief: string;
}

export default function SearchBar() {
  // Initialize state with empty string///
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Use debounce with proper typing
  const debouncedQuery = useDebounce<string>(query, 500);

  // Handle input change safely
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const result = await getLegalSuggestions(debouncedQuery);
        setSuggestions(result.suggestions || []);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          placeholder="SEARCH_QUERY//"
          className="w-full px-6 py-4 bg-black/80 border-2 border-[#0FF]/30 text-white 
                   placeholder-[#0FF]/50 focus:outline-none focus:border-[#0FF] 
                   [clip-path:polygon(0_0,100%_0,98%_100%,2%_100%)]
                   font-tech tracking-wider"
        />
        <button 
          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-[#0FF]/20 
                    text-[#0FF] hover:bg-[#0FF]/30 transition-colors
                    [clip-path:polygon(10%_0,100%_0,90%_100%,0%_100%)]"
        >
          {isLoading ? (
            <div className="animate-spin w-5 h-5 border-2 border-[#0FF] border-t-transparent rounded-full" />
          ) : (
            <FiSearch className="w-5 h-5" />
          )}
        </button>
      </div>

      {showSuggestions && (query.length > 0) && (
        <div className="absolute w-full mt-2 bg-black/95 border border-[#0FF]/30 
                      [clip-path:polygon(0_0,100%_0,98%_100%,2%_100%)] z-50">
          {suggestions.length > 0 ? (
            <div className="divide-y divide-[#0FF]/10">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-4 hover:bg-[#0FF]/10 transition-colors cursor-pointer group"
                  onClick={() => {
                    setQuery(suggestion.title);
                    setShowSuggestions(false);
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-white font-tech">{suggestion.title}</h3>
                      <p className="text-sm text-gray-400 mt-1 font-mono">
                        {suggestion.brief}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-[#0FF]/70 bg-[#0FF]/10 px-2 py-1 rounded">
                          {suggestion.year}
                        </span>
                        <span className="text-xs text-[#0FF]/70">
                          {suggestion.court}
                        </span>
                      </div>
                    </div>
                    <FiArrowRight className="w-5 h-5 text-[#0FF]/50 group-hover:text-[#0FF] transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-gray-400 text-center font-tech">
              {isLoading ? 'Searching...' : 'No results found'}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 