# Configuração PWA - Sistema de Tarefas

## Instalação do Plugin

Execute no terminal:
```bash
npm install -D vite-plugin-pwa
```

## Ícones Necessários

Você precisa criar os seguintes ícones na pasta `public/`:

1. `pwa-192x192.png` - Ícone 192x192 pixels
2. `pwa-512x512.png` - Ícone 512x512 pixels

### Como criar os ícones:

1. Use o arquivo `icon.svg` como base
2. Converta para PNG nos tamanhos necessários usando:
   - Ferramentas online: https://realfavicongenerator.net/
   - Ou use ImageMagick: `convert icon.svg -resize 192x192 pwa-192x192.png`

## Funcionalidades Implementadas

✅ Manifest.json configurado
✅ Service Worker configurado com cache
✅ Cache para requisições Supabase
✅ Configuração no Vite
✅ Meta tags no HTML

## Como Testar

1. Execute `npm run build`
2. Execute `npm run preview`
3. Abra o DevTools > Application > Manifest
4. Verifique se o manifest está carregado
5. Teste a instalação no navegador

## Instalação no Dispositivo

### Android (Chrome):
- Menu > "Adicionar à tela inicial"

### iOS (Safari):
- Compartilhar > "Adicionar à Tela de Início"

### Desktop (Chrome/Edge):
- Ícone de instalação na barra de endereços

