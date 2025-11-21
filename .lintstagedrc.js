import baseConfig from '../../.lintstagedrc.mjs'

export default {
  ...baseConfig,
  '*.*js': 'prettier --write',
  '*.ts*': [
    'tsc-files --noEmit',
    'prettier --write',
    'eslint --max-warnings=0 --report-unused-disable-directives',
  ],
}
