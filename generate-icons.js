// Script para gerar ícones PWA a partir do SVG
// Requer: npm install -g sharp-cli ou usar ferramenta online

const fs = require('fs');
const path = require('path');

// Criar ícones PNG básicos usando Canvas (se disponível) ou instruir uso de ferramenta online
console.log(`
╔══════════════════════════════════════════════════════════════╗
║           Gerador de Ícones PWA - Sistema de Tarefas       ║
╚══════════════════════════════════════════════════════════════╝

Para gerar os ícones PNG necessários, você tem duas opções:

OPÇÃO 1 - Ferramenta Online (Recomendado):
1. Acesse: https://realfavicongenerator.net/
2. Faça upload do arquivo: public/icon.svg
3. Configure:
   - Android Chrome: 192x192 e 512x512
   - iOS: 180x180
4. Baixe e coloque os arquivos em public/

OPÇÃO 2 - Usando ImageMagick (se instalado):
   convert public/icon.svg -resize 192x192 public/pwa-192x192.png
   convert public/icon.svg -resize 512x512 public/pwa-512x512.png

OPÇÃO 3 - Usando Node.js com sharp:
   npm install sharp
   node -e "const sharp = require('sharp'); sharp('public/icon.svg').resize(192,192).toFile('public/pwa-192x192.png'); sharp('public/icon.svg').resize(512,512).toFile('public/pwa-512x512.png');"

Arquivos necessários após gerar:
- public/pwa-192x192.png
- public/pwa-512x512.png
`);

