//Creamos la base de datos
var db = null;
var request = window.indexedDB.open("nombreBaseDatos", 1);
document.addEventListener('deviceready', function() {
    db = window.sqlitePlugin.openDatabase({ name: 'my.db', location: 'default' });
    if (db) {
        console.log('Base de datos abierta correctamente.');
    } else {
        console.error('Error al abrir la base de datos.');
    }
    db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT UNIQUE, email TEXT, password TEXT)');
    });
});
//funcion donde se podra ver la base de datos
function abrirVentanaTabla() {
    window.open('tabla.html', '_blank');
}
//funcion que permite eliminar usuarios mediante el email
function eliminarUsuario() {
    var email = prompt('Ingrese el email del usuario a eliminar:');
    if (email) {
        deleteUserByEmail(email);
    }
}
//funcion que permite guardar a los nuevos usuarios
function saveUsuario(){
    request.onupgradeneeded = function(event) {
          // Este evento es solo usado en la primera creación de la base de datos o cuando se requiere una actualización de versión.
          db = event.target.result;

          // Crear object stores (como tablas en bases de datos relacionales)
          var objectStore = db.createObjectStore("nombreObjectStore", { keyPath: "id" });

          // Definir los índices si son necesarios
          objectStore.createIndex("nombre", "nombre", { unique: false });

          // Aquí puedes realizar otras inicializaciones
        };
}

