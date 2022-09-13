
Temática: E-commerce de bebibas alcohólicas
Publico objetivo: mayores de 18

url:ebebidas.com.ar

Ebebidas es un sitio web ecommerce cuyo objetivo es cambiar la experiencia en la compra de bebidas.

Cómo lo haremos?

Ofreceremos bebidas alcohólicas y en un futuro todo tipo de producto que puede mejorar la experiencia de una 
buena bebida, desde vasos hasta quesos o embutidos que vayan en sintonia con lo elegido.

El comprador no solo encontrará un sin número de ofertas de bebidas, sino también como realizar los mejores tragos 
 e inclusive un poco de historia,datos de algunas de ellas.
Además, como expansión futura de la plataforma, el cliente no solo dispondra de la posibilidad de comprar
las bebidas en el stock de la página, sino que también lo hará mediante comercio P2P, vinculando dinamicamente a 
los clientes oferentes de los demandantes.
Sin duda, ebebidas es tu sitio ideal, para festejar de un buen trago, entre amigos y familia!

Integrantes:
- Sambuelli Sergio: Ing. en electrónica apasionado de la tecnología, con muchas ganas de aprender del mundo web.
- Tomas Tasat
- Joaquín Giudice canteli
- Doniguian Christian: Ing. Aeronautico, fanatico de la mecanica, la electrónica y de los deportes al aire libre.

Referencias:
https://www.fullescabio.com/,
http://www.puroescabio.com.ar/,
https://www.diageobaracademy.com/es_es/conoce-tu-bebida/nuestras-marcas/,
https://www.beerhouse.mx/new,
https://siempreencasa.com.ar/

enlace a trello: 
https://trello.com/proyectorintegradorgrupo1



Notas Versión SPRINT4:
 - Estructurado en modo MVC, implementación EJS
 - Agregado de partials (head, header, footer)
 - Página agregada (/productos/productEdit)
 - Acceso a página de edición de productos:
    usuario:ADMIN
    constraseña:ADMIN
 - Cambio de fondos

Notas Versión SPRINT5:
 - Agregado sistema de verificación con Express Validator
 - Verificación completa login y registro
 - Creación de usuarios (user.json)
 - Aplicación de cookies (recordar usuario) y session para mantenimiento de la sesión
 - Aplicación de middlewares para validación y control de rutas para usuarios logueados. (los usuarios logueados no pueden acceder directamente por la url a REGISTRO o LOGUIN, deben desloguerse!). Si no estas logueado, y estas en la pagina de detalle de producto, al pulsar "añadir carrito", si no esta logueado el usuario, redirecciona a la página de loguin.
 -División de la estructura de la página para soportar implementación directa con SQL(findAll, findOne, etc).
 - Acceso a pagina de productos y su edición a traves de:
 correo: admin@admin.com
 pass:admin

 Notas Versión SPRINT6:
 - Agregado control por base de datos (ebebidas_db.sql)
 - CRUD usuario y productos
 - Acceso al CRUD  usuario y productos:
 Para el CRUD de productos, se utiliza la información de db para los SELECT
 correo: admin@admin.com
 