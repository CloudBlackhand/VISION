# VISION

Landing de vendas de carros com hero 3D imersivo (estilo espacial / cinematic edit). A cada refresh da página, um BMW (M2 G87 ou M4 CSL) é sorteado no banner.

## Stack

- Next.js 16 + React 19 + TypeScript
- React Three Fiber + drei + postprocessing
- Tailwind CSS 4

## Começar

```bash
npm install
cp .env.example .env.local
# Edite NEXT_PUBLIC_WHATSAPP com seu número (DDI + DDD + número, só dígitos)
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). Pressione **F5** várias vezes para ver carros diferentes no hero.

## Variáveis de ambiente

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_WHATSAPP` | Número do WhatsApp (ex: `5511987654321`) |

## Modelos 3D do hero

Pasta `public/models/cars/` — cada carro pode ser **GLB** ou pasta **GLTF** (`scene.gltf` + `scene.bin` + `textures/`).

Configuração em [`lib/showcase.ts`](lib/showcase.ts):

```ts
{
  id: "bmw-m4-csl",
  name: "BMW M4 CSL",
  modelPath: "/models/cars/bmw-m4-csl/scene.gltf",
  fitMultiplier: 1,
  rotation: [0, Math.PI, 0],
}
```

**Créditos (obrigatório — CC-BY-NC-SA 4.0, uso não comercial):**

- [2023 BMW M2 M-Performance Parts G87](https://sketchfab.com/3d-models/2023-bmw-m2-m-performance-parts-g87-bb8b3a1f0abb46e0a5b460f1f6ffd9b4) by [Ddiaz Design](https://sketchfab.com/ddiaz-design)
- [2022 BMW M4 CSL](https://sketchfab.com/3d-models/2022-bmw-m4-csl-cbd90adb3b2c4af28da1ede516d55b79) by [Ddiaz Design](https://sketchfab.com/ddiaz-design)

Os arquivos são pesados (~17–23 MB cada). Para deploy, considere comprimir com [gltf-transform](https://gltf-transform.dev/) ou Draco.

## Estrutura principal

```
app/page.tsx              # sorteia modelo 3D (server) e monta a landing
lib/showcase.ts           # modelos 3D do banner (só troca o carro)
lib/inventory.ts          # carros à venda no /showroom
lib/hero-scene.ts         # câmera e planeta fixos (cena Utility Pro)
components/hero/          # Canvas 3D, cena espacial, overlay
components/sections/      # Destaques, Sobre, CTA
public/models/cars/       # BMW GLTF + placeholders Khronos (.glb)
public/hdr/space.hdr      # iluminação ambiente
```

## Placeholders Khronos (opcional)

Ainda existem `car-*.glb` do [Khronos glTF Sample Models](https://github.com/KhronosGroup/glTF-Sample-Models) na pasta — não estão no sorteio do hero; pode removê-los para aliviar o repo.

## Fotos do showroom (`/showroom`)

As imagens em `public/showroom/` foram obtidas da [Wikimedia Commons](https://commons.wikimedia.org/) via API da Wikipedia (uso educacional/portfólio). **Não use em produção comercial** sem verificar licença de cada arquivo e substituir por fotos próprias ou banco licenciado.

| Arquivo | Modelo (referência) |
|---------|---------------------|
| `chevrolet-onix.jpg` | Chevrolet Onix |
| `volkswagen-gol.jpg` | Volkswagen Gol |
| `hyundai-hb20.jpg` | Hyundai HB20 |
| `toyota-corolla.jpg` | Toyota Corolla |
| `honda-civic.jpg` | Honda Civic |
| `fiat-strada.jpg` | Fiat Strada |
| `toyota-hilux.jpg` | Toyota Hilux |
| `jeep-compass.jpg` | Jeep Compass |
| `volkswagen-polo.jpg` | Volkswagen Polo |
| `chevrolet-tracker.jpg` | Chevrolet Tracker |
| `hyundai-creta.jpg` | Hyundai Creta |
| `renault-kwid.jpg` | Renault Kwid |

Edite preços, status (`available` / `sold` / `reserved`) e textos em [`lib/inventory.ts`](lib/inventory.ts).

## Performance

- Apenas **1 GLB** é carregado por visita.
- Bloom/vignette desativados em mobile e com `prefers-reduced-motion`.
- DPR reduzido em telas pequenas.

## Deploy na Vercel

O projeto é **Next.js padrão** — funciona na Vercel sem config extra (`vercel.json` já incluso).

### 1. Repositório Git

Suba o código para GitHub/GitLab/Bitbucket (a pasta `public/` tem ~80 MB — modelos BMW + fotos do showroom; o push pode demorar).

```bash
git add .
git commit -m "VISION: site pronto para deploy"
git push origin main
```

Opcional: remova `public/models/cars/car-*.glb` (placeholders Khronos, ~16 MB) se não usar — o hero só usa os BMW.

### 2. Importar na Vercel

1. Acesse [vercel.com/new](https://vercel.com/new)
2. **Import Git Repository** → escolha o repo
3. Framework: **Next.js** (detectado automaticamente)
4. **Environment Variables** → adicione:

| Nome | Valor |
|------|--------|
| `NEXT_PUBLIC_WHATSAPP` | `5511999999999` (seu número, só dígitos) |

5. **Deploy**

### 3. CLI (alternativa)

```bash
npm i -g vercel
vercel login
cd "/caminho/para/VISION"
vercel --prod
```

Na primeira vez, informe a variável `NEXT_PUBLIC_WHATSAPP` quando o CLI perguntar (ou configure em Project → Settings → Environment Variables).

### Notas

- **Build:** `npm run build` (já testado localmente).
- **Home (`/`):** `force-dynamic` — sorteia o BMW no servidor a cada visita; ok na Vercel.
- **Primeira carga do hero:** modelos GLTF grandes (~17–23 MB); use rede estável; depois o browser cacheia.
- **WebGL:** precisa de GPU no cliente; em preview mobile o 3D pode ser mais leve (menos pós-processo).

## Scripts

```bash
npm run dev      # desenvolvimento
npm run build    # build de produção
npm run start    # servidor de produção
npm run lint     # ESLint
```
