
import React from 'react';

interface GeneratedImageProps {
  imageUrl: string;
}

export const GeneratedImage: React.FC<GeneratedImageProps> = ({ imageUrl }) => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'generated-marketing-image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  return (
    <div className="mt-10 bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-10 flex flex-col items-center animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">Your Image is Ready!</h2>
      <div className="max-w-xl w-full rounded-lg overflow-hidden shadow-lg border-2 border-gray-700">
        <img src={imageUrl} alt="Generated marketing" className="w-full h-auto" />
      </div>
      <button
        onClick={handleDownload}
        className="mt-8 bg-green-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span>Download Image</span>
      </button>
    </div>
  );
};
