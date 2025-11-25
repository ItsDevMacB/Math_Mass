// Script temporal para generar iconos PWA
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const inputLogo = join(__dirname, 'public/icons/Math_Mass_Logo.png')
const outputDir = join(__dirname, 'public/icons/')

// Configuración de iconos a generar
const icons = [
  { size: 192, name: 'icon-192x192.png', padding: 0 },
  { size: 192, name: 'icon-192x192-maskable.png', padding: 19 }, // 10% padding para safe zone
  { size: 512, name: 'icon-512x512.png', padding: 0 },
  { size: 512, name: 'icon-512x512-maskable.png', padding: 51 }, // 10% padding para safe zone
]

async function generateIcons() {
  console.log('🎨 Generando iconos PWA desde Math_Mass_Logo.png...\n')

  for (const { size, name, padding } of icons) {
    const logoSize = size - padding * 2

    try {
      await sharp(inputLogo)
        .resize(logoSize, logoSize, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 },
        })
        .extend({
          top: padding,
          bottom: padding,
          left: padding,
          right: padding,
          background: { r: 255, g: 255, b: 255, alpha: 0 },
        })
        .png({ quality: 100 })
        .toFile(join(outputDir, name))

      console.log(`✅ Generado: ${name} (${size}x${size}px)`)
    } catch (error) {
      console.error(`❌ Error generando ${name}:`, error.message)
    }
  }

  console.log('\n🎉 ¡Todos los iconos PWA generados exitosamente!')
}

generateIcons().catch(console.error)
