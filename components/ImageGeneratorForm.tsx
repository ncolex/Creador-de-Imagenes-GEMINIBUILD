
import React, { useState } from 'react';
import { StyleSelector } from './StyleSelector';
import { MARKETING_STYLES } from '../constants';
import type { GenerateImageParams, MarketingStyle } from '../types';

interface ImageGeneratorFormProps {
  onGenerate: (params: GenerateImageParams) => void;
  disabled: boolean;
}

const fileToBas64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        reject(new Error('Failed to read file as base64'));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

export const ImageGeneratorForm: React.FC<ImageGeneratorFormProps> = ({ onGenerate, disabled }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<MarketingStyle>(MARKETING_STYLES[0]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productImage || !productName || !selectedStyle) {
      alert('Please fill out all fields and upload an image.');
      return;
    }

    try {
      const base64Image = await fileToBas64(productImage);
      onGenerate({
        productName,
        productDescription,
        base64Image,
        mimeType: productImage.type,
        style: selectedStyle,
      });
    } catch (error) {
      console.error('Error converting file to base64:', error);
      alert('Could not process the image file. Please try a different one.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Inputs */}
        <div className="space-y-6">
          <div>
            <label htmlFor="productName" className="block text-lg font-medium text-gray-200 mb-2">1. Product Name</label>
            <input
              id="productName"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g., 'Aura Smartwatch'"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition"
              required
            />
          </div>
          <div>
            <label htmlFor="productDescription" className="block text-lg font-medium text-gray-200 mb-2">2. Product Description (Optional)</label>
            <textarea
              id="productDescription"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="e.g., 'A sleek, waterproof smartwatch with a vibrant AMOLED display and advanced fitness tracking.'"
              rows={4}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition"
            />
          </div>
        </div>
        
        {/* Right Column: Image Upload */}
        <div>
          <label className="block text-lg font-medium text-gray-200 mb-2">3. Upload Product Image</label>
          <div className="mt-2 flex justify-center items-center w-full h-48 border-2 border-dashed border-gray-600 rounded-lg bg-gray-700/50 hover:border-brand-primary transition">
            {imagePreview ? (
              <img src={imagePreview} alt="Product preview" className="h-full w-full object-contain p-2" />
            ) : (
              <div className="text-center">
                <p className="text-gray-400">Drag & drop or click to upload</p>
                <p className="text-xs text-gray-500">PNG, JPG, WEBP</p>
              </div>
            )}
            <input type="file" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} className="absolute w-full h-full opacity-0 cursor-pointer" required />
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-lg font-medium text-gray-200 mb-4">4. Choose a Style</label>
        <StyleSelector
          styles={MARKETING_STYLES}
          selectedStyle={selectedStyle}
          onSelectStyle={setSelectedStyle}
        />
      </div>

      <div className="text-center pt-4">
        <button
          type="submit"
          disabled={disabled || !productImage}
          className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
        >
          {disabled ? 'Generating...' : '✨ Generate Image'}
        </button>
      </div>
    </form>
  );
};
