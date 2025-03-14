import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';


export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/float-toolbar.umd.js',
      format: 'umd',
      name: 'FloatToolbar',
      globals: { 
        'lodash': '_',
        'document': 'document' }
    },
    {
      file: 'dist/float-toolbar.esm.js',
      format: 'es',
      globals: { 'document': 'document' }
    }
  ],
  plugins: [
    resolve(),
    copy({
      targets: [
        { src: 'assets/**/*', dest: 'dist/assets' }
      ]
    })
  ]
};