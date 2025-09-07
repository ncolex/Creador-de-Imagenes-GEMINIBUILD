
import { GoogleGenAI, Modality } from "@google/genai";
import type { GenerateImageParams } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateMarketingImage(params: GenerateImageParams): Promise<string> {
  const { productName, productDescription, base64Image, mimeType, style } = params;

  const finalPrompt = `
    Generate a professional marketing image.
    
    **Product Name:** ${productName}
    **Product Description:** ${productDescription}
    **Desired Style:** ${style.prompt}

    Using the provided product image, seamlessly integrate it into a new scene that matches the desired style described above.
    Do not add any text to the image. The final output must be only the generated image.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: finalPrompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64ImageBytes: string = part.inlineData.data;
          return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
        }
      }
    }
    
    throw new Error("No image was generated in the API response.");

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if(error instanceof Error && error.message.includes('API key not valid')) {
       throw new Error("Invalid API Key. Please check your API key.");
    }
    throw new Error("The AI model failed to generate an image. This can happen with certain inputs. Please try again or adjust your prompt.");
  }
}
