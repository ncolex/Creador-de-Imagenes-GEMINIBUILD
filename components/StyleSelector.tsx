
import React from 'react';
import type { MarketingStyle } from '../types';

interface StyleSelectorProps {
  styles: MarketingStyle[];
  selectedStyle: MarketingStyle;
  onSelectStyle: (style: MarketingStyle) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onSelectStyle }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {styles.map((style) => (
        <button
          key={style.id}
          type="button"
          onClick={() => onSelectStyle(style)}
          className={`relative rounded-lg overflow-hidden border-2 focus:outline-none transition-all duration-200 ${
            selectedStyle.id === style.id ? 'border-brand-primary scale-105' : 'border-gray-600 hover:border-gray-500'
          }`}
        >
          <img src={style.thumbnail} alt={style.name} className="w-full h-24 object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-2">
            <span className="text-white text-center font-semibold text-sm">{style.name}</span>
          </div>
          {selectedStyle.id === style.id && (
            <div className="absolute top-1 right-1 bg-brand-primary rounded-full h-5 w-5 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};
