// TypeScript 6 no longer infers a type for side-effect CSS imports; Next handles
// the actual bundling, so an ambient declaration is all that's needed.
declare module '*.css';
