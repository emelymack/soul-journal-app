# Soul Journal

!['Logo Soul Journal'](assets/logo_circle.png)

_Proyecto desarrollado para el curso **Desarrollo de Aplicaciones Flex** de Coderhouse._

## Objetivo
Soul Journal es una aplicación móvil que nace con la idea de crear un espacio digital para pausar, respirar y reconectarse. 

Diseñada para ayudar a las personas a cultivar la atención plena y reconectarse con el presente a través de la escritura diaria, promueve la gratitud cotidiana, la claridad mental y la conexión con uno mismo.

La app invita a registrar pensamientos, emociones y momentos significativos, combinando texto y fotos, ofreciendo una experiencia simple, estética y personal, centrada en el bienestar emocional.

---

## Funcionalidades Principales
- **Creación de Entradas:** Permite a los usuarios escribir entradas de diario con título, cuerpo de texto y un estado de ánimo asociado (categoría).
  
- **Formato con Markdown:** El cuerpo de la entrada soporta sintaxis Markdown para dar estilo al texto (negritas, itálicas, etc.), que se renderiza visualmente en la pantalla de la entrada.
  
- **Galería Personal:** Cada entrada puede ir acompañada de una foto, seleccionada desde la galería del dispositivo o tomada en el momento con la cámara.
  
- **Listado Cronológico:** Las entradas se muestran en una pantalla principal de forma cronológica, con la más reciente primero.
  
- **Autenticación de Usuarios:** Sistema de registro e inicio de sesión utilizando Firebase Authentication para mantener la privacidad de los diarios.

---

## Stack tecnológico

Esta aplicación está construida con **Expo SDK 54**. A continuación se detallan las tecnologías y librerías clave utilizadas:

- `React Navigation`
  - Gestión de la navegación entre las diferentes pantallas de la aplicación
- `Redux Toolkit` (RTK) y `RTK Query`
  - Solución central para el manejo de estado y el fetching de datos de la API de Firebase
- `Firebase` (Backend-as-a-Service)
  - Authentication: Gestión de registro e inicio de sesión de usuarios de forma segura.
  - Realtime Database: Base de datos NoSQL para almacenar toda la información de los usuarios.
- `Expo SQLite`
  - Creación y gestión de una base de datos local en el dispositivo. En este proyecto, se utiliza para almacenar la sesión del usuario de forma persistente.
- `react-native-markdown-display`
  - Librería utilizada para renderizar el texto plano escrito con sintaxis Markdown en componentes nativos de React Native, mostrando el texto estilizado en la pantalla de la entrada.
- `yup` para validación de formularios
  - Validación de esquemas de datos en los formularios
- `date-fns`
  - Manipulación y formateo de fechas.
- `expo-image-picker`
  - Acceso a la cámara y a la galería de imágenes del dispositivo, permitiendo al usuario seleccionar o tomar fotos para adjuntar a sus entradas.
- Componentes personalizados (`custom components`)

---

## Estructura de Datos en Firebase

La base de datos en Firebase Realtime Database se organiza de la siguiente manera:

1. **Categorías** (`/categories.json`)

    Es una colección global en la raíz de la base de datos. Se almacena como un Array de objetos, donde cada objeto representa un estado de ánimo.
    ```
    [
      { "id": 1, "name": "Feliz", "emoji": "😊", "color": "#FFD166" },
      { "id": 2, "name": "En paz", "emoji": "🌿", "color": "#C3F0CA" },
      { "id": 3, "name": "Agradecido", "emoji": "🙏", "color": "#F4A261" },
      { "...": "..." }
    ]
    ```

2. **Entradas de Diario** (`/entries/{userId}.json`)

    Las entradas se almacenan bajo un nodo principal entries, y luego se anidan bajo el userId único de cada usuario para garantizar la privacidad de los datos. Cada entrada es un objeto con un ID único generado por Firebase.
    ```
    {
      "entries": {
        "USER_ID_1": {
          "-NqA_abc123...": {
            "title": "Un día increíble",
            "text": "Hoy fue un día genial. Usé **negrita** para resaltar esto.",
            "categoryId": 1,
            "date": "2025-10-16T18:30:00.123Z",
            "image": "data:image/jpeg;base64,...",
            "location": "Buenos Aires, Argentina"
          },
          "...": {}
        },
        "USER_ID_2": {
          "...": {}
        }
      }
    }
    ```

---

## Requisitos previos

Antes de instalar y ejecutar la app, necesitás tener instalados:

- [Node.js](https://nodejs.org/) (versión 20 o superior recomendada)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (global)
- [Git](https://git-scm.com/)
- Una cuenta de Firebase con proyecto configurado (opcional, para autenticación y base de datos). 
- Un editor de código como [VS Code](https://code.visualstudio.com/).

## Instalación y configuración

1. Cloná el repositorio:
    ```
    git clone https://github.com/emelymack/soul-journal-app.git
    cd soul-journal-app
    ```

2. Instalá las dependencias:
    ```
    npm install
    ```

3. Configurá las variables de entorno para Firebase

    Crea un archivo .env en la raíz del proyecto con las siguientes variables (usá tus credenciales de Firebase):
    ```
    - EXPO_PUBLIC_BASE_URL_RTDB="TU_URL_DE_REALTIME_DATABASE"
    - EXPO_PUBLIC_BASE_URL_AUTH=https://identitytoolkit.googleapis.com/v1/
    - EXPO_PUBLIC_FIREBASE_API_KEY="TU_API_KEY_DE_FIREBASE"
    ```

      DISCLAIMER PARA ENTREGA DEL PROYECTO: profe, envié mi .env a través del chat de la plataforma Coderhouse (alumna: Emely Mack).

4. Iniciá la aplicación en modo desarrollo:

    ```
    npx expo start
    ```

5. Ejecutá la app:
    
    Una vez que el servidor de Metro esté corriendo, podés escanear el código QR con la app de Expo Go en tu celular, o presionar `a` para abrirla en un emulador de Android o `i` para un emulador de iOS.

6. **Enjoy! 💜**