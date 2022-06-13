UIJavaSB
=======


Usado en el desarrollo
=======
- Angular - *framework frontend*
- Java
- SpringBoot - *framework backend*

Cómo usar
---
Deberá crear una cuenta en la seccion ```register```, y luego iniciar sesión en ```login```.

Después quedará editar la información del usuario que haya disponible.

Ejecutar el proyecto
---
- Clonar el repositorio: ```git clone https://github.com/dclavijo45/UIJavaSB```
- Configurar el servidor MySQL local, usuario = ```root```, contraseña = **vacia**
- Crear ejecutable del backend dentro de la carpeta **backend**, comando en terminal: ```mvn clean package``` (se requiere **maven** instalado)
- Iniciar el backend, comando en terminal: ```java -jar target/spring-boot-userinterface-0.0.1-SNAPSHOT.jar``` (se requiere **Java 9+**)
- Instalar las dependencias del frontend dentro de la carpeta **frontend**, comando en terminal: ```npm install``` (se requiere **nodeJS** instalado)
- Instalar Angular globalmente para prevenir fallos, comando en terminal: ```npm i -g @angular/cli``` (se requiere **nodeJS** instalado)
- Iniciar el frontend, comando en terminal: ```ng serve```
- Entrar en el navegador a la ruta **http://localhost:4200**

License
=======
MIT
