
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageGeneratorForm } from './components/ImageGeneratorForm';
import { GeneratedImage } from './components/GeneratedImage';
import { LoadingSpinner } from './components/LoadingSpinner';
import { generateMarketingImage } from './services/geminiService';
import type { GenerateImageParams } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = useCallback(async (params: GenerateImageParams) => {
    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const imageUrl = await generateMarketingImage(params);
      setGeneratedImageUrl(imageUrl);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      console.error('Error generating image:', errorMessage);
      setError(`Failed to generate image. ${errorMessage}. Please check your API key and try again.`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col items-center">
      <Header />
      <main className="w-full max-w-5xl mx-auto p-4 md:p-8 flex-grow">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-10">
          <p className="text-center text-gray-300 mb-8 text-lg">
            Upload your product image, describe it, choose a style, and let our AI generate a stunning marketing visual for you.
          </p>
          <ImageGeneratorForm onGenerate={handleGenerateImage} disabled={isLoading} />
        </div>
        
        {isLoading && (
          <div className="mt-10 text-center">
            <LoadingSpinner />
            <p className="mt-4 text-lg text-gray-300 animate-pulse">Generating your masterpiece... this may take a moment.</p>
          </div>
        )}

        {error && (
          <div className="mt-10 bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center">
            <h3 className="font-bold text-lg mb-2">Oops! Something went wrong.</h3>
            <p>{error}</p>
          </div>
        )}

        {generatedImageUrl && !isLoading && (
          <GeneratedImage imageUrl={generatedImageUrl} />
        )}
      </main>
      <footer className="w-full text-center p-4 text-gray-500 text-sm">
        <p>Powered by Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
