# Sistema Solar Interactivo

Este proyecto es una simulación visual e interactiva del Sistema Solar, desarrollada con HTML, CSS y JavaScript puro. Permite observar el movimiento orbital de los planetas y la luna alrededor del Sol, visualizar las órbitas, el cinturón de asteroides y un fondo estrellado animado.

![image](https://github.com/user-attachments/assets/5c678e53-60c8-4035-9fff-90ae6794da27)

## Características principales

-   Animación realista de los planetas y la luna orbitando el Sol.
-   Líneas de órbita visibles para cada planeta.
-   Fondo estrellado animado y cinturón de asteroides con variabilidad.
-   Panel de información interactivo: haz clic en cualquier planeta o la luna para ver datos e imagen.
-   Arrastra los planetas para cambiar su órbita o lanzarlos al Sol.
-   Efectos visuales de explosión y destello solar.
-   Pausa/reanuda la animación con la barra espaciadora.
-   Reinicia el sistema con la tecla "R".
-   Diseño responsivo y accesible.

## Archivos principales

-   `index.html`: Estructura principal y referencias a scripts y estilos.
-   `styles.css`: Estilos visuales, animaciones y responsividad.
-   `script.js`: Lógica de animación, interacción y generación de elementos.
-   Carpeta `images/`: Imágenes de los planetas, luna y sol.

## Uso

1. Abre `index.html` en tu navegador.
2. Interactúa con los planetas y explora las funcionalidades.

## Despliegue en Azure App Service

### Instrucciones de despliegue
1. Crear un recurso App Service en Azure con Node.js en Linux
2. Conectar el repositorio GitHub mediante Deployment Center
3. Configurar la rama "main" para despliegue automático
4. Acceder a `https://tu-nombre-app.azurewebsites.net`

### Entorno de ejecución
- **Stack tecnológico**: HTML5, CSS3, JavaScript (Frontend)
- **Runtime**: Node.js 18.x
- **Servidor**: Node.js HTTP Server
- **Dependencias**: Solo Node.js incorporado

### Requisitos previos
- Node.js 18.x o superior
- Navegador web moderno (Chrome, Firefox, Safari, Edge)

### Variables de entorno
- `PORT`: Puerto de ejecución (por defecto 8080, Azure configura automáticamente)

### Autor
Jostin Jimenez - 2025
