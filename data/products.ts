export type Product = {
  id: number;
  brand: string;
  model: string;
  category: string;
  flavors: string[];
  price: number;
  stock: number;
  nicotine: string;
  puffs: string;
  symbol: string;
  image: string;
};

export const products: Product[] = [
  { id: 5, brand: "North", model: "North 5K", category: "Disposable", flavors: ["Blue Razz Ice", "Miami Mint", "Watermelon Ice", "Sour Apple Ice"], price: 19.99, stock: 9, nicotine: "5%", puffs: "5000", symbol: "N5", image: "/images/north5k.webp" },
  { id: 6, brand: "North", model: "North Vision", category: "Disposable", flavors: ["Blue Razz Ice", "Miami Mint", "Watermelon Ice", "Sour Apple Ice"], price: 29.99, stock: 6, nicotine: "5%", puffs: "15000", symbol: "NV", image: "/images/northvision.webp" },
  { id: 7, brand: "North", model: "North Stellar", category: "Disposable", flavors: ["Blue Razz Ice", "Miami Mint", "Watermelon Ice", "Sour Apple Ice"], price: 34.99, stock: 5, nicotine: "5%", puffs: "40000", symbol: "NS", image: "/images/northstellar.webp" },
  { id: 3, brand: "Lost Mary", model: "Turbo MT35000", category: "Disposable", flavors: ["Blue Razz Ice", "Miami Mint", "Watermelon Ice", "Sour Apple Ice"], price: 34.99, stock: 8, nicotine: "5%", puffs: "35000", symbol: "LM", image: "/images/lostmaryturbo.webp" },
  { id: 4, brand: "Lost Mary", model: "Nera Full View", category: "Disposable", flavors: ["Blue Razz Ice", "Miami Mint", "Watermelon Ice", "Sour Apple Ice"], price: 39.99, stock: 7, nicotine: "5%", puffs: "70000", symbol: "LM", image: "/images/lostmarynera.webp" },
  { id: 13, brand: "Kado Bar", model: "NI 40000", category: "Disposable", flavors: ["Blue Razz Ice", "Miami Mint", "Watermelon Ice", "Sour Apple Ice"], price: 29.99, stock: 9, nicotine: "5%", puffs: "40000", symbol: "N5", image: "/images/kadobarni40000.webp" },
  { id: 14, brand: "Kado Bar", model: "Rizz", category: "Disposable", flavors: ["Blue Razz Ice", "Miami Mint", "Watermelon Ice", "Sour Apple Ice"], price: 24.99, stock: 6, nicotine: "5%", puffs: "25000", symbol: "NV", image: "/images/kadobarrizz.webp" },
  { id: 15, brand: "Kado Bar", model: "Drip", category: "Disposable", flavors: ["Blue Razz Ice", "Miami Mint", "Watermelon Ice", "Sour Apple Ice"], price: 34.99, stock: 5, nicotine: "5%", puffs: "35000", symbol: "NS", image: "/images/kadobardrip.webp" },
  { id: 11, brand: "Foger", model: "Foger Switch Pro Kit", category: "Disposable", flavors: ["Blue Razz Ice", "Miami Mint", "Watermelon Ice", "Sour Apple Ice"], price: 34.99, stock: 8, nicotine: "5%", puffs: "30000", symbol: "LM", image: "/images/fogerswitchprokit.webp" },
  { id: 12, brand: "Foger", model: "Fogest", category: "Disposable", flavors: ["Blue Razz Ice", "Miami Mint", "Watermelon Ice", "Sour Apple Ice"], price: 29.99, stock: 7, nicotine: "5%", puffs: "15000", symbol: "LM", image: "/images/fogerfogest.webp" },
  { id: 1, brand: "Geek Bar", model: "Pulse", category: "Disposable", flavors: ["Blue Razz Ice", "Miami Mint", "Watermelon Ice", "Sour Apple Ice"], price: 29.99, stock: 12, nicotine: "5%", puffs: "15000", symbol: "GB", image: "/images/geekbarpulse.webp" },
  { id: 2, brand: "Geek Bar", model: "Pulse X", category: "Disposable", flavors: ["Blue Razz Ice", "Miami Mint", "Watermelon Ice", "Sour Apple Ice"], price: 34.99, stock: 10, nicotine: "5%", puffs: "25000", symbol: "GB", image: "/images/geekbarpulsex.webp" }
];
