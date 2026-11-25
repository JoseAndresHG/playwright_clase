# Playwright Clase

Proyecto de automatización de pruebas end-to-end con [Playwright](https://playwright.dev/) y TypeScript, usando el sitio de práctica [Sauce Demo](https://www.saucedemo.com/).

## Requisitos

- [Node.js](https://nodejs.org/) (recomendado: LTS)
- npm (incluido con Node.js)

## Instalación

1. Clona el repositorio y entra en la carpeta del proyecto.
2. Instala las dependencias:

   ```bash
   npm ci
   ```

   (También puedes usar `npm install` en desarrollo local.)

3. Instala los navegadores de Playwright (solo la primera vez o cuando se actualice Playwright):

   ```bash
   npx playwright install
   ```

## Configuración

### Variables de entorno

Algunas pruebas leen credenciales desde variables de entorno (por ejemplo, [tests/carrito.spec.ts](tests/carrito.spec.ts) usa `APP_USER` y `APP_PASSWORD`). El proyecto carga variables con `dotenv` (ver [playwright.config.ts](playwright.config.ts)).

1. Crea un archivo `.env` en la raíz del proyecto (este archivo está ignorado por Git; no lo subas al repositorio).
2. Define las variables necesarias:

   ```env
   APP_USER=tu_usuario
   APP_PASSWORD=tu_contraseña
   ```

> Nota: `.env` está excluido en [.gitignore](.gitignore). Para CI (GitHub Actions), configura estas variables como secretos/variables del repositorio en lugar de commitear el archivo.

## Ejecución de pruebas

Ejecutar todas las pruebas (todos los navegadores configurados):

```bash
npx playwright test
```

Ejecutar en un navegador específico:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Otros comandos útiles:

```bash
npx playwright test --ui        # Modo UI interactivo
npx playwright test --headed    # Ejecutar con navegador visible
npx playwright test --debug     # Modo depuración
```

## Reportes

- La configuración genera un reporte HTML (`reporter: 'html'` en [playwright.config.ts](playwright.config.ts)).
- Para abrir el último reporte:

  ```bash
  npx playwright show-report
  ```

- Los artefactos locales de ejecución/reportes (como `playwright-report/` y `test-results/`) están ignorados por Git según [.gitignore](.gitignore).

## Estructura del proyecto

```text
.
├─ .github/
│  └─ workflows/
│     └─ playwright.yml      # Pipeline de CI en GitHub Actions
├─ pages/                    # Page Objects (patrón POM)
│  └─ LoginPage.ts
├─ tests/                    # Especificaciones de prueba
│  ├─ Login.spec.ts
│  └─ carrito.spec.ts
├─ playwright.config.ts      # Configuración de Playwright
├─ tsconfig.json             # Configuración de TypeScript
├─ package.json
└─ package-lock.json
```

## Detalles de la configuración

- **Directorio de pruebas**: `./tests` ([playwright.config.ts](playwright.config.ts)).
- **Base URL**: `https://www.saucedemo.com/` (permite usar rutas relativas como `page.goto('/')`).
- **Navegadores/proyectos**: Chromium, Firefox y WebKit (Desktop).
- **CI**: cuando `CI` está activo, se ajustan reintentos, workers y `forbidOnly` (ver [playwright.config.ts](playwright.config.ts)).

## Integración continua (GitHub Actions)

El flujo [.github/workflows/playwright.yml](.github/workflows/playwright.yml) se ejecuta en `push` y `pull_request` sobre las ramas `main` y `master`:

1. Instala dependencias con `npm ci`.
2. Instala navegadores con `npx playwright install --with-deps`.
3. Ejecuta `npx playwright test`.
4. Publica el reporte (`playwright-report/`) como artefacto.

Si las pruebas requieren credenciales (p. ej. `APP_USER`, `APP_PASSWORD`), define los secretos correspondientes en el repositorio y expórtalos como variables de entorno en el paso de ejecución de pruebas.

## Tecnologías

- [@playwright/test](https://playwright.dev/docs/test-intro)
- [TypeScript](https://www.typescriptlang.org/)
- [dotenv](https://github.com/motdotla/dotenv)

## Autor y licencia

- Autor: Jose
- Licencia: ISC (ver [package.json](package.json))