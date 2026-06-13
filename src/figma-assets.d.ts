// Type declarations for Vite's figma:asset plugin
// This allows TypeScript to resolve `figma:asset/*.png` imports
declare module "figma:asset/*" {
  const src: string;
  export default src;
}
