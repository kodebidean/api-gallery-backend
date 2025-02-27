# Galería de Imágenes - Backend

API REST desarrollada con Spring Boot para gestionar una galería de imágenes utilizando Cloudinary como servicio de almacenamiento en la nube.

## Tecnologías

- Java 17
- Spring Boot 3.4.3
- PostgreSQL
- Cloudinary
- Swagger/OpenAPI

## Configuración

1. Clonar el repositorio
2. Configurar la base de datos PostgreSQL
3. Crear una cuenta en Cloudinary y obtener las credenciales
4. Crear `application-dev.properties` con las siguientes propiedades:
    
```properties
spring.datasource.url=jdbc:postgresql://localhost:5433/adat_uploadimage
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
cloudinary.cloud-name=tu_cloud_name
cloudinary.api-key=tu_api_key
cloudinary.api-secret=tu_api_secret
```

## Ejecución
```bash
mvn spring-boot:run
```


La API estará disponible en `http://localhost:9090`

## Documentación

La documentación de la API está disponible en:
- Swagger UI: `http://localhost:9090/swagger-ui.html`
- OpenAPI: `http://localhost:9090/v3/api-docs`

## Licencia

Distribuido bajo la licencia MIT. Ver [LICENSE](LICENSE) para más información.

---