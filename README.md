# WEAThER WEB



## Tecnologías

- Angular
- Angular material


## Instalacion

1. Clona el repositorio
```bash
 git clone https://github.com/jsdiaz19/Weather.git
```
2. Navega a la carpeta del proyecto:
```bash
 cd weather
```
3. Instala las dependencias:
```bash
 npm install
```
4. Ejecuta el proyecto:
```bash
 npm run start
```

5. Abre tu navegador y ve a `http://localhost:4200`


## Detalles de implementacion

Para la integración con **WeatherAPI**, implementé un servicio en Angular que maneja las solicitudes HTTP utilizando `HttpClient`. Utilicé un **interceptor HTTP** para adjuntar automáticamente el token de autenticación y el idioma seleccionado en cada solicitud, asegurando una integración fluida y segura con la API. Además, manejé los errores de manera global dentro del interceptor, proporcionando mensajes de error claros y personalizados para mejorar la experiencia del usuario.

En cuanto a las **optimizaciones**, apliqué las siguientes estrategias:

1.  **Uso de RxJS para actualizaciones automáticas:**
    
    -   Implementé operadores de RxJS como `switchMap`, `debounceTime` y `distinctUntilChanged` para optimizar las búsquedas y evitar llamadas innecesarias a la API.
    -   Utilicé `shareReplay` para almacenar en caché las respuestas y evitar múltiples solicitudes al mismo endpoint.
2.  **Internacionalización (i18n):**
    
    -   Agregué soporte para **español e inglés** utilizando `ngx-translate`, permitiendo a los usuarios cambiar el idioma dinámicamente sin necesidad de recargar la página.
3.  **Modo oscuro y claro:**
    
    -   Implementé un sistema de **temas dinámicos** utilizando Angular Material, permitiendo a los usuarios alternar entre **modo oscuro y claro**.
4.  **Paginación y optimización del historial de búsquedas:**
    
    -   Utilicé la **paginación de Angular Material** para mostrar resultados de manera eficiente cuando la lista de búsquedas y favoritos crece.
    -   Implementé almacenamiento en `localStorage` para persistir el historial y evitar llamadas redundantes a la API.
5.  **Diseño responsivo:**
    
    -   Utilicé **Angular Material** para una experiencia de usuario consistente en dispositivos móviles y escritorio.
    -   Implementé **media queries** para asegurar un diseño adaptable a diferentes tamaños de pantalla.
6.  **Manejo eficiente de la memoria:**
    
    -   Me aseguré de realizar la **desuscripción** de observables en cada componente para evitar fugas de memoria.
7.  **Pipes personalizados:**
    
    -   Creé un **pipe personalizado** para validar y mostrar las ciudades favoritas correctamente en la vista.

Con estas optimizaciones, logré mejorar la **eficiencia, usabilidad y escalabilidad** de la aplicación, garantizando una experiencia fluida y optimizada para los usuarios.
