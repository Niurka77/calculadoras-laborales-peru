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

### Al subirlos a TikTok

1. Sube el MP4 directo (no lo grabes de nuevo)
2. Elige un sonido en tendencia como MUSICA (el video ya no lleva audio)
3. En el campo de descripcion usa el texto del archivo TiktokPrompts.md
4. En el boton de musica cambia la etiqueta a tu cancion elegida

## Nota

Si el render sale con cualquier corte de edicion, regenera con:
node scripts/generate-videos.mjs
node scripts/render-videos.mjs

## Tips

- Publica 1 escena por dia durante 10 dias
- Las cifras fueron calculadas con las formulas reales (UIT 2026 S/ 5,350, RMV S/ 1,025)
- Para regenerar o crear nuevas escenas: `node scripts/generate-videos.mjs`