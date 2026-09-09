# Escenas para TikTok / Reels (Formato 9:16)

Estos archivos HTML contienen las escenas animadas listas para grabar. Cada una simula
el uso de la calculadora en un telefono y se repite sola cada ~12 segundos.

## Como grabar (3 opciones)

### Opcion 1 - En tu PC con OBS (gratis, recomendada)
1. Descarga OBS Studio: https://obsproject.com/es
2. Abre la escena en tu navegador (doble clic al archivo HTML)
3. En OBS: Fuente > Captura de pantalla o Captura de ventana > selecciona el navegador
4. Configura la ventana en vertical 9:16 (OBS > Configuracion > Video > Resolucion base 1080x1920)
5. Pulsa "Iniciar grabacion" y graba 12 segundos (un ciclo completo)
6. Guarda el video y subelo directo a TikTok

### Opcion 2 - Grabadora de Windows (Win + Alt + R)
1. Abre la escena en Chrome/Edge
2. Pulsa Win + Alt + R para iniciar la grabacion
3. Espera 12 segundos y pulsa Win + Alt + R para detener
4. El video queda en Videos > Capturas de pantalla

### Opcion 3 - Desde el celular (captura de pantalla)
1. Transfiere los archivos de la carpeta videos/ a tu celular
2. Abre el HTML en Chrome y activa escritorio en pantalla completa
3. Usa la grabadora de pantalla de tu celular y graba 12 segundos

## Las 10 escenas

| Archivo | Tematica | Mensaje clave |
|---|---|---|
| 01-sueldo-2500.html | Sueldo prometido vs real | S/ 2,500 → neto S/ 2,184.50 |
| 02-gratificacion-1800.html | Gratificacion | Total S/ 11,772.00 |
| 03-quinta-categoria-4000.html | 5ta categoria | S/ 4,000 → neto S/ 3,495.20 |
| 04-onp-vs-afp-2000.html | ONP vs AFP | 1,740.00 vs 1,747.60 |
| 05-cts-2200.html | CTS + intereses | CTS S/ 2,200 + S/ 82.50 |
| 06-rmv-1025.html | Sueldo minimo | S/ 1,025 → neto S/ 895.64 |
| 07-horas-extras-2500.html | Horas extras | neto S/ 2,184.50 |
| 08-contador-3500.html | Contador | S/ 3,500 → neto S/ 3,058.30 |
| 09-sueldo-gross-5000.html | Sueldo gross | S/ 5,000 → neto S/ 4,330.33 |
| 10-calculadora-rapida-2800.html | Velocidad | S/ 2,800 → neto S/ 2,446.64 |

## Formato listo para subir

Los videos MP4 (en `videos-mp4/`) ya incluyen la interfaz de TikTok:
barra "Para ti", iconos de likes/comentarios/compartir animados,
usuario @calculadoras.pe, sonido original, contador de vistas en vivo,
nav inferior y un dedo que toca la pantalla.

### Al subirlos a TikTok (paso a paso, <1 min cada video)

1. Sube el MP4 directo desde el celular (`videos-mp4/`) **sin audio** (ya esta mudo a proposito).
2. En la pantalla "Ajuntar clip" convierte el clip con el boton "Convertir en foto" NO; deja el video.
3. Toca **"Sonido"** y busca una cancion **en tendencia** (no pongas audio externo:
   TikTok lo silencia y solo su biblioteca de sonidos sube el algoritmo).
4. Ajusta el volumen de la cancion al 100% y, si quieres, sincroniza el momento del
   "reveal" (el conteo verde) con el beat usando "Ajustes" > avanzado.
5. En "Descripcion" pega el texto + hashtags del archivo `Tiktoprompts.md`.
6. En el icono de la musica que aparece al publicar, deja la etiqueta de la cancion
   elegida (el video ya no muestra "sonido original").
7. Publica. No mas de 1-2 videos por dia para no parecer cuenta automatizada.

### Como se ve el video (estilo moderno)

- Titulo gigante con tipografia de tendencia (Anton) + sombra 3D sobre la cifra del ejemplo
- Barra de progreso que se llena: "calculando..."
- Reveal del resultado final con sacudida de pantalla + lluvia de emojis 💸🤑
- Tarjeta de la calculadora real como prueba + boton de llamada a la accion
- Barra "Para ti", likes/vistas animados, disco de musica y nav inferior de TikTok

## Nota

Si el render sale con cualquier corte de edicion, regenera con:
node scripts/generate-videos.mjs
node scripts/render-videos.mjs

## Tips

- Publica 1 escena por dia durante 10 dias
- Las cifras fueron calculadas con las formulas reales (UIT 2026 S/ 5,350, RMV S/ 1,025)
- Para regenerar o crear nuevas escenas: `node scripts/generate-videos.mjs`