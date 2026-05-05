import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const indexPath = resolve('dist/index.html')
let html = readFileSync(indexPath, 'utf-8')
html = html.replace(
  '</body>',
  '<!-- admax -->\n<script src="https://adm.shinobi.jp/s/45f785f2c648050ded30ac3f29866b46"></script>\n<!-- admax -->\n</body>'
)
writeFileSync(indexPath, html)
console.log('AdMax tag injected into dist/index.html')
