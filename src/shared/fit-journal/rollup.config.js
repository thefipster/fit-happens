import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/fit-journal.js',
      format: 'esm',
      sourcemap: true,
    }
  ],
  plugins: [
    resolve(),        
    typescript({
      tsconfig: './tsconfig.json',
      clean: true
    })
  ]
};