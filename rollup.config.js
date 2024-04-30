import { defineConfig } from 'rollup';
import typeScript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

export default defineConfig({
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    name: 'scratchcard-react',
  },
  external: ['react', 'react-dom'],
  plugins: [
    typeScript({ tsconfig: 'tsconfig.json' }),
    postcss({
      input: 'src/styles/card.css',
      output: 'dist/styles/card.css',
      sourceMap: true,
    }),
  ],
});
