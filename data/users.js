// =====================================
// data/users.js
// Base de datos ficticia de estudiantes
// =====================================

const usuarios = [
    {
        id: 1,
        usuario: 'ana.perez',
        password: 'Ana2026!', // En prod: bcrypt.hashSync('Ana2026!', 10)
        nombre: 'Ana Perez Gonzalez',
        carrera: 'Ingenieria en Ciberseguridad',
        semestre: 5,
        notas: [
            { ramo: 'Criptografía Aplicada', nota: 6.4 },
            { ramo: 'Redes Seguras', nota: 5.9 },
            { ramo: 'Hacking Etico', nota: 6.8 }
        ]
    },
    {
        id: 2,
        usuario: 'juan.silva',
        password: 'Juan2026!',
        nombre: 'Juan Silva Moreno',
        carrera: 'Ingenieria Informatica',
        semestre: 7,
        notas: [
            { ramo: 'Desarrollo Web Avanzado', nota: 6.2 },
            { ramo: 'Bases de Datos II', nota: 5.5 },
            { ramo: 'Arquitectura de Software', nota: 6.0 }
        ]
    }
];

module.exports = usuarios;