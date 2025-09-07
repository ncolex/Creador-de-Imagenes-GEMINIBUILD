
import type { MarketingStyle } from './types';

export const MARKETING_STYLES: MarketingStyle[] = [
  {
    id: 'minimalist',
    name: 'Minimalist',
    prompt: 'Place the product on a clean, single-color pastel background with soft, natural lighting and a subtle shadow. The composition should be simple, elegant, and focused entirely on the product.',
    thumbnail: 'https://picsum.photos/seed/minimalist/200/200',
  },
  {
    id: 'vibrant',
    name: 'Vibrant & Bold',
    prompt: 'Create a dynamic, colorful scene with energetic light streaks and a blurred, abstract background. The colors should be bold, saturated, and complementary to the product. The mood should be exciting and modern.',
    thumbnail: 'https://picsum.photos/seed/vibrant/200/200',
  },
  {
    id: 'natural',
    name: 'Natural & Organic',
    prompt: 'Position the product in a serene natural setting, such as on a piece of slate rock, surrounded by green moss, or on a rustic wooden surface. Use warm, earthy tones and soft, diffused sunlight.',
    thumbnail: 'https://picsum.photos/seed/natural/200/200',
  },
  {
    id: 'futuristic',
    name: 'Futuristic',
    prompt: 'Display the product on a sleek, metallic pedestal with neon blue and purple holographic elements in the background. The environment should look like a high-tech lab or a scene from a sci-fi movie.',
    thumbnail: 'https://picsum.photos/seed/futuristic/200/200',
  },
  {
    id: 'luxury',
    name: 'Luxury & Elegant',
    prompt: 'Present the product on a dark marble surface with dramatic, cinematic lighting. Add subtle gold or silver accents and a soft-focus background to create a sense of sophistication and exclusivity.',
    thumbnail: 'https://picsum.photos/seed/luxury/200/200',
  },
  {
    id: 'studio',
    name: 'Studio Product Shot',
    prompt: 'Create a professional studio product shot. The product should be on a seamless white or light gray background with perfect, even lighting to highlight its features without harsh shadows. This should look like a high-quality photo for an e-commerce website.',
    thumbnail: 'https://picsum.photos/seed/studio/200/200',
  }
];
