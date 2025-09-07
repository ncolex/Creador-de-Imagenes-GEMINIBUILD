
export interface MarketingStyle {
  id: string;
  name: string;
  prompt: string;
  thumbnail: string;
}

export interface GenerateImageParams {
  productName: string;
  productDescription: string;
  base64Image: string;
  mimeType: string;
  style: MarketingStyle;
}
