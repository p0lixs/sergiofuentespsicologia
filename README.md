# Sergio Fuentes Psicología

Página web para servicios de psicología online, desarrollada con React, TypeScript y Vite.

## Desarrollo

```bash
npm install
npm run dev
```

## Producción

```bash
npm run build
```

## Envío del formulario

El formulario utiliza una función serverless de Vercel y la API de Resend.

Configura estas variables en **Vercel → Project → Settings → Environment Variables**:

```text
RESEND_API_KEY
CONTACT_FROM_EMAIL
```

`CONTACT_FROM_EMAIL` debe utilizar un dominio previamente verificado en Resend. Ejemplo:

```text
Sergio Fuentes Psicología <solicitudes@sergiofuentespsicologia.com>
```
