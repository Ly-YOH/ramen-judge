import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'inject-admax',
      transformIndexHtml(html) {
        return html.replace(
          '</body>',
          `<!-- admax -->\n<script src="https://adm.shinobi.jp/s/45f785f2c648050ded30ac3f29866b46"></script>\n<!-- admax -->\n</body>`
        )
      },
    },
  ],
})
