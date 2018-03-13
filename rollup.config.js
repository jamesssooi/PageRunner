import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

/** Configuration */
const OUTPUT_FOLDER = IS_PRODUCTION ? 'dist' : 'build';

/** Rollup Configuration */
export default {

  // Input ------------------------------------------------------------------ //
  input: 'src/pagerunner.ts',

  // Output ----------------------------------------------------------------- //
  output: {
    file: path.join(OUTPUT_FOLDER, 'pagerunner.js'),
    name: 'PageRunner',
    format: 'umd'
  },

  // Plugins ---------------------------------------------------------------- //
  plugins: [
    resolve(),

    /** Compile source using Typescript, using configs from tsconfig.json */
    typescript({
      typescript: require('typescript'),
      useTsconfigDeclarationDir: true,
    }),
  ]

}
