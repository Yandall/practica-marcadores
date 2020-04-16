# Práctica Marcadores

## Simulador de BOOKMARKS - Marcadores del navegador
Es una página web donde se pueden registrar links de internet para tenerlos a la mano
Se pueden guardar links de páginas, imagénes, vídeos o cualquier otro contenido que se pueda acceder mediante una URL

## Características
Todos los registros guardados son no volátiles, es decir, no se perderán una vez cerrado el navegador debido a que estos registros se guardan en una base de datos en postgres
Se pueden editar o eliminar en cualquier momento cualquier registro
La página web corre en un servidor local con express

## ¿Cómo correr?
1. Crear la base de datos local con postgres usando los scripts
2. En el root del proyecto correr en la terminal 
```
node .\app.js
```
3. Ya está listo para usarlo en el navegador con la dirección
```
localhost:3000
```
