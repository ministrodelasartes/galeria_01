# GALERIA 01 — Datos en JSON

La web lee los datos desde **/public/data**. Para editar sin tocar código:

- `public/data/artists.json`
- `public/data/works.json`
- `public/data/exhibitions.json`

## Cómo editar en GitHub
1. Abre el archivo (por ejemplo `public/data/works.json`).
2. Click **Edit** (lapicito).
3. Agrega, modifica o elimina objetos JSON (cada objeto = una fila).
4. **Commit**. Vercel despliega solo.

## Formatos

### works.json (obras)
```json
[
  {
    "slug": "serie-cromatica-i",
    "title": "Serie Cromática I",
    "year": 2024,
    "medium": "Acrílico sobre tela",
    "dimensions": "80 x 80 cm",
    "image": "https://ruta/imagen.jpg",
    "artist_slug": "valentina-rios",
    "description": "opcional"
  }
]
```

### artists.json
```json
[
  {"slug":"valentina-rios","name":"Valentina Ríos","bio":"...","location":"Santiago, Chile","website":"https://...","instagram":"https://...","avatar":"https://ruta/avatar.jpg"}
]
```

### exhibitions.json
```json
[
  {
    "slug": "materia-luz-2025",
    "title": "Materia & Luz",
    "startDate": "2025-07-10",
    "endDate": "2025-09-30",
    "location": "GALERIA 01",
    "description": "texto...",
    "cover": "https://ruta/cover.jpg",
    "works": ["serie-cromatica-i", "ensamble-luz-iii"]
  }
]
```

> **Nota:** Las imágenes deben ser URLs. Puedes subir imágenes a GitHub (carpeta `public/images`) y usar rutas relativas como `/images/miobra.jpg`.

## Scripts

```bash
npm install
npm run dev      # desarrollo local (opcional)
npm run build    # build de prod
npm run preview  # previsualizar build
```

Deploy en Vercel: importa el repo, Build `npm run build`, Output `dist`.
