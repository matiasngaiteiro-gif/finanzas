# Nexo Finanzas

Aplicación web progresiva para administrar finanzas personales desde el navegador. Funciona sin servidor y conserva los datos únicamente en el dispositivo.

## Funciones

- Registro y filtrado de ingresos, gastos y transferencias.
- Presupuestos mensuales por categoría.
- Agenda de alquiler, servicios, suscripciones, ingresos y otros vencimientos.
- Cuentas bancarias, efectivo, billeteras, inversiones y tarjetas.
- Seguimiento de deudas, patrimonio y metas de ahorro.
- Informes de flujo, categorías, gastos fijos y variables y tasa de ahorro.
- Exportación e importación de una copia completa en JSON.
- Instalación como PWA y funcionamiento sin conexión.
- Diseño responsive para computadora y teléfono.

## Publicar en GitHub Pages

1. Crear un repositorio vacío en GitHub.
2. Subir todos los archivos de esta carpeta a la rama `main`.
3. Abrir `Settings` → `Pages`.
4. En `Build and deployment`, seleccionar `GitHub Actions`.
5. Esperar a que finalice el flujo `Deploy GitHub Pages`.

La URL aparecerá en la sección `Pages` y en la ejecución del workflow.

## Privacidad

GitHub aloja solamente los archivos de la aplicación. Los datos financieros se guardan en `localStorage` dentro del navegador y no se suben al repositorio. Para utilizar la misma información en otro dispositivo hay que exportar una copia e importarla allí.

No ingresar claves bancarias, números completos de tarjeta, códigos de seguridad ni credenciales.

## Uso local

La aplicación puede abrirse con cualquier servidor estático. Para probar la instalación y el modo sin conexión no conviene abrir `index.html` directamente mediante `file://`; usar un servidor local o GitHub Pages.
