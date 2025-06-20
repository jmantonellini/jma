# 🌱 eco-sistema.net — Personal Web + Blog + Portfolio

Bienvenido al código fuente de [eco-sistema.net](https://eco-sistema.net) — un sitio web personal que documenta viajes, voluntariados, fotografía, y contenido sobre vínculos entre humanos, naturaleza, y tecnología.

---

## 🚀 Deploy automático con CapRover + GitHub Actions

Cada push al branch `main` desencadena un flujo de integración continua que:

1. 🐳 **Construye una imagen Docker** usando `adapter-node` para SvelteKit
2. 📦 **Publica la imagen** en el Container Registry de GitHub (GHCR)
3. 🛳️ **Despliega automáticamente en CapRover** usando esa imagen

### 🔁 ¿Cómo desplegar?

```bash
git push origin main
```

¡Eso es todo! En segundos, tu app estará en línea con la nueva versión 🎉

---

## 🧱 Stack

- **Frontend:** [SvelteKit 2](https://kit.svelte.dev/) con `adapter-node`
- **CSS:** TailwindCSS + DaisyUI
- **i18n:** inlang + Paraglide
- **DB:** Prisma ORM
- **Almacenamiento:** S3 (upload firmado desde el browser)
- **CI/CD:** GitHub Actions + GHCR
- **Hosting:** CapRover en DigitalOcean
- **Analytics:** Umami en CapRover

---

## 🐞 Complicaciones encontradas durante el deploy

- ❗ **GHCR no permite pushear si el package no fue creado previamente.**  
  Fue necesario hacer un `docker push` manual desde local usando un PAT con `write:packages`.

- 🔓 **El package debía estar en modo público.**  
  Si quedaba privado, CapRover no podía hacer pull sin autenticación adicional.

- 🧭 **El comando correcto para ejecutar un SvelteKit `adapter-node` es:**  
  ```dockerfile
  CMD ["node", "build"]
  ```
  (No usar `build/index.js`, a menos que lo especifiques como entrada principal).

- 🧱 **La carpeta `build/` no se generaba si no se usaba correctamente `adapter-node`.**  
  Asegurate de tener esto en `svelte.config.ts`:
  ```ts
  adapter: adapter({ out: 'build' })
  ```

- 🧪 **El build fallaba silenciosamente si faltaban variables de entorno.**  
  Variables como `AWS_REGION`, `AWS_ACCESS_KEY_ID`, etc., deben estar disponibles en runtime (ya sea via CapRover o `.env` en local).

- 🧼 **`.dockerignore` bloqueaba archivos clave si no estaba bien afinado.**  
  Especial cuidado con ignorar por accidente `build/` o `package.json`.

- 🧱 **Prisma necesitó configuración específica para Alpine y producción.**  
  Se resolvió agregando `binaryTargets = ["native", "linux-musl"]` en `schema.prisma`.

- ❌ **GitHub Actions arrojaba 403 Forbidden al subir a GHCR.**  
  Esto se solucionó agregando los permisos al workflow:
  ```yaml
  permissions:
    contents: read
    packages: write
  ```

- 🛑 **El deploy en CapRover fallaba si el nombre de imagen no coincidía.**  
  Confirmar que `ghcr.io/jmantonellini/jma:main` coincida con el nombre seteado en CapRover.

---

## 💡 Cambios de arquitectura

- Se movió la base de datos del servicio cloud de Supabase a una One-Click app de Caprover en PostgreSQL puro. Se optó por no usar la app de Supabase por considerarase overkill para los requerimientos.
- Se intentó utilizar imgproxy pero se decidió ir por Imagor (preset con almacenamiento local en CapRover) debido a múltiples fallos con firmas, compilación y descargas desde URLs remotas.
- Se integró Amazon CloudFront como CDN delante del bucket S3 para servir imágenes a través de un subdominio, mejorando significativamente la velocidad de carga, reduciendo la latencia global y permitiendo cacheo eficiente en los edge locations de AWS.
- Analytics usando Umami self-hosted en CapRover
- Implementación de reglas de seguridad en CloudFlare y middleware en Svelte contra bots

### 🔄 Nueva infraestructura para imágenes
- Se crearon buckets S3 separados: `my-photos-album` para fotos generales y `posts-cover-images` para imágenes de portada de posts.
- Se implementó Amazon CloudFront como CDN para ambos buckets, cada uno con su propia distribución y dominio personalizado (`images.eco-sistema.net` para fotos y `posts-images.eco-sistema.net` para posts).
- Configuración de certificados ACM para habilitar HTTPS en ambos subdominios.
- Se ajustaron políticas de acceso y reglas para asegurar que solo CloudFront pueda acceder a los buckets, mejorando la seguridad y rendimiento.
- El proxy de imágenes (Imagor) se configuró para consumir las URLs a través de CloudFront, evitando problemas de acceso y mejorando la velocidad de entrega.

---

## 🧩 Features presentes

- Infinite scrolling para mostrar imágenes utilizando la API IntersectionObserver
- Sección de blog-posts usando mdsvex
- Mapa interactivo que utiliza las librerías topojson y d3 con objetos países customizados
- 

---

## 🧠 Filosofía

> Este proyecto busca documentar aprendizajes y compartir caminos que fortalezcan nuestra relación con la tierra. 🌍

---



Desarrollado por [Juan Manuel Antonellini](https://eco-sistema.net)  
[GitHub](https://github.com/jmantonellini) · [Instagram](https://instagram.com/juanma.antonellini)
