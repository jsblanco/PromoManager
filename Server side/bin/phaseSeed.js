const mongoose = require('mongoose');

const phaseSeeds = [{
    "_id": {
        "$oid": "5e932e5a5126e34ddd0bf3f0"
    },
    "isItOver": false,
    "tasks": [{
        "name": "Petición de bibliografía a cliente",
        "assignedUser": ["Account", "5e932c9c5126e34ddd0bf3e7"],
        "message": "There was a problem",
        "spentTime": "03:15",
        "deadline": "2020-04-12",
        "isItOver": true,
        "completedOn": {
            "$date": {
                "$numberLong": "1586908800000"
            }
        }
    }, {
        "name": "Desarrollo de contenido",
        "assignedUser": ["AV", "5e94eebedadfd41721cbd894"],
        "message": "",
        "spentTime": "00:10",
        "deadline": "2020-04-15"
    }, {
        "name": "Envío a cliente",
        "assignedUser": ["Account"],
        "message": "",
        "spentTime": "00:00",
        "deadline": "2020-04-16"
    }],
    "basicTasks": [{
        "$oid": "5e9436cc9973ad1e0486530a"
    }, {
        "$oid": "5e9447419973ad1e0486530d"
    }, {
        "$oid": "5e94474f9973ad1e0486530e"
    }],
    "name": "Propuesta de contenido",
    "project": {
        "$oid": "5e932e3c5126e34ddd0bf3ef"
    },
    "created_at": {
        "$date": {
            "$numberLong": "1586703962564"
        }
    },
    "updated_at": {
        "$date": {
            "$numberLong": "1586957459895"
        }
    },
    "__v": {
        "$numberInt": "0"
    }
}, {
    "_id": {
        "$oid": "5e932e645126e34ddd0bf3f1"
    },
    "isItOver": false,
    "tasks": [{
        "name": "Aplicación de feedback de cliente",
        "assignedUser": ["Scientific"],
        "message": "",
        "spentTime": "00:00",
        "deadline": "2020-04-17"
    }, {
        "name": "Maquetación de material",
        "assignedUser": ["Design"],
        "message": "",
        "spentTime": "00:00",
        "deadline": "2020-04-20"
    }, {
        "name": "Revisión de la maquetación",
        "assignedUser": ["Scientific"],
        "message": "",
        "spentTime": "00:00",
        "deadline": "2020-04-22"
    }, {
        "name": "Envío a cliente",
        "assignedUser": ["Account"],
        "message": "",
        "spentTime": "00:00",
        "deadline": "2020-04-23"
    }],
    "basicTasks": [{
        "$oid": "5e946efa9973ad1e04865310"
    }, {
        "$oid": "5e946f069973ad1e04865311"
    }, {
        "$oid": "5e946f139973ad1e04865312"
    }, {
        "$oid": "5e946f1f9973ad1e04865313"
    }],
    "name": "Maquetación del material",
    "project": {
        "$oid": "5e932e3c5126e34ddd0bf3ef"
    },
    "created_at": {
        "$date": {
            "$numberLong": "1586703972494"
        }
    },
    "updated_at": {
        "$date": {
            "$numberLong": "1586789434301"
        }
    },
    "__v": {
        "$numberInt": "0"
    }
}, {
    "_id": {
        "$oid": "5e932e6d5126e34ddd0bf3f2"
    },
    "isItOver": false,
    "tasks": [{
        "name": "Validación de presupuesto de impresión",
        "assignedUser": ["Account"],
        "message": "",
        "spentTime": "00:00",
        "deadline": "2020-04-24"
    }],
    "basicTasks": [{
        "$oid": "5e947c749973ad1e04865314"
    }],
    "name": "Impresión",
    "project": {
        "$oid": "5e932e3c5126e34ddd0bf3ef"
    },
    "created_at": {
        "$date": {
            "$numberLong": "1586703981651"
        }
    },
    "updated_at": {
        "$date": {
            "$numberLong": "1586809949996"
        }
    },
    "__v": {
        "$numberInt": "0"
    }
}, {
    "_id": {
        "$oid": "5e9330b65126e34ddd0bf3f8"
    },
    "isItOver": false,
    "tasks": [{
        "name": "Validación de mensajes clave con cliente",
        "assignedUser": ["Account", "5e932c9c5126e34ddd0bf3e7"],
        "isItOver": true,
        "spentTime": "00:30",
        "message": "",
        "deadline": "2020-04-15",
        "completedOn": {
            "$date": {
                "$numberLong": "1586908800000"
            }
        }
    }, {
        "name": "Revisión de la bibliografía",
        "assignedUser": ["Design", "5e932ce65126e34ddd0bf3eb"],
        "message": "Uno de los artículos no es de acceso libre",
        "spentTime": "00:15",
        "deadline": "2020-04-15",
        "isItOver": false,
        "completedOn": null
    }, {
        "name": "Propuesta de contenido",
        "assignedUser": ["Scientific", "5e932cc05126e34ddd0bf3e9"],
        "message": "",
        "spentTime": "00:00",
        "deadline": "2020-04-17"
    }, {
        "name": "Validación de contenido con cliente",
        "assignedUser": ["Scientific"],
        "message": "",
        "spentTime": "00:00",
        "deadline": "2020-04-20"
    }],
    "basicTasks": [{
        "$oid": "5e94663c9973ad1e0486530f"
    }, {
        "$oid": "5e94cc762859ba0f9a8335f5"
    }, {
        "$oid": "5e94cc7d2859ba0f9a8335f6"
    }, {
        "$oid": "5e94cc8a2859ba0f9a8335f7"
    }],
    "name": "Creación de contenido",
    "project": {
        "$oid": "5e932fd65126e34ddd0bf3f5"
    },
    "created_at": {
        "$date": {
            "$numberLong": "1586704566529"
        }
    },
    "updated_at": {
        "$date": {
            "$numberLong": "1586958540472"
        }
    },
    "__v": {
        "$numberInt": "0"
    }
}, {
    "_id": {
        "$oid": "5e9330c45126e34ddd0bf3f9"
    },
    "isItOver": false,
    "tasks": [{
        "name": "Implementación de feedback de cliente",
        "assignedUser": ["Scientific"],
        "message": "",
        "spentTime": "00:00",
        "deadline": "2020-04-21"
    }, {
        "name": "Maquetación de contenido",
        "assignedUser": ["Design"],
        "message": "",
        "spentTime": "00:00",
        "deadline": "2020-04-22"
    }, {
        "name": "Revisión de la maquetación",
        "assignedUser": ["Scientific"],
        "message": "",
        "spentTime": "00:00",
        "deadline": "2020-04-23"
    }, {
        "name": "Validación con cliente",
        "assignedUser": ["Account"],
        "message": "",
        "spentTime": "00:00",
        "deadline": "2020-04-24"
    }],
    "basicTasks": [{
        "$oid": "5e94cca82859ba0f9a8335f8"
    }, {
        "$oid": "5e94ccb12859ba0f9a8335f9"
    }, {
        "$oid": "5e94ccbe2859ba0f9a8335fa"
    }, {
        "$oid": "5e94cccd2859ba0f9a8335fb"
    }],
    "name": "Maquetación del material",
    "project": {
        "$oid": "5e932fd65126e34ddd0bf3f5"
    },
    "created_at": {
        "$date": {
            "$numberLong": "1586704580473"
        }
    },
    "updated_at": {
        "$date": {
            "$numberLong": "1586810132692"
        }
    },
    "__v": {
        "$numberInt": "0"
    }
}, {
    "_id": {
        "$oid": "5e9330da5126e34ddd0bf3fa"
    },
    "isItOver": false,
    "tasks": [{
        "name": "Exportación de artes finales",
        "assignedUser": ["Design"],
        "message": "",
        "spentTime": "00:00",
        "deadline": "2020-04-27"
    }, {
        "name": "Programación del material",
        "assignedUser": ["Developer"],
        "message": "",
        "spentTime": "00:00",
        "deadline": "2020-04-28"
    }, {
        "name": "Revisión de la programación",
        "assignedUser": ["Scientific"],
        "message": "",
        "spentTime": "00:00",
        "deadline": "2020-04-29"
    }, {
        "name": "Validación con cliente",
        "assignedUser": ["Account"],
        "message": "",
        "spentTime": "00:00",
        "deadline": "2020-04-30"
    }],
    "basicTasks": [{
        "$oid": "5e94ccdf2859ba0f9a8335fc"
    }, {
        "$oid": "5e94ccea2859ba0f9a8335fd"
    }, {
        "$oid": "5e94ccf62859ba0f9a8335fe"
    }, {
        "$oid": "5e94cd012859ba0f9a8335ff"
    }],
    "name": "Programación para Veeva",
    "project": {
        "$oid": "5e932fd65126e34ddd0bf3f5"
    },
    "created_at": {
        "$date": {
            "$numberLong": "1586704602465"
        }
    },
    "updated_at": {
        "$date": {
            "$numberLong": "1586810324708"
        }
    },
    "__v": {
        "$numberInt": "0"
    }
}, {
    "_id": {
        "$oid": "5e9330e85126e34ddd0bf3fb"
    },
    "isItOver": false,
    "tasks": [{
        "name": "Propuesta de Wireframes",
        "assignedUser": ["Design", "5e932ce65126e34ddd0bf3eb"],
        "message": "Cliente solicita una navbar desplegable",
        "spentTime": "00:30",
        "deadline": "2020-04-14",
        "isItOver": true,
        "completedOn": {
            "$date": {
                "$numberLong": "1586908800000"
            }
        }
    }, {
        "name": "Validación con cliente",
        "assignedUser": ["Account", "5e932c9c5126e34ddd0bf3e7"],
        "message": "Cliente ha solicitado un cambio de enfoque",
        "spentTime": "01:15",
        "deadline": "2020-04-16",
        "isItOver": true,
        "completedOn": {
            "$date": {
                "$numberLong": "1586908800000"
            }
        }
    }, {
        "name": "Propuesta de Wireframes",
        "assignedUser": ["Design", "5e932ce65126e34ddd0bf3eb"],
        "isItOver": true,
        "spentTime": "01:20",
        "message": "",
        "deadline": "2020-04-15",
        "completedOn": {
            "$date": {
                "$numberLong": "1586908800000"
            }
        }
    }, {
        "name": "Validación con cliente",
        "assignedUser": ["Account"],
        "isItOver": false,
        "spentTime": "00:00",
        "message": "",
        "deadline": "2020-04-16"
    }],
    "basicTasks": [{
        "$oid": "5e943eb19973ad1e0486530b"
    }, {
        "$oid": "5e94c9db2859ba0f9a8335f1"
    }],
    "name": "Propuesta de estructura",
    "project": {
        "$oid": "5e932f695126e34ddd0bf3f4"
    },
    "created_at": {
        "$date": {
            "$numberLong": "1586704616444"
        }
    },
    "updated_at": {
        "$date": {
            "$numberLong": "1586951504324"
        }
    },
    "__v": {
        "$numberInt": "0"
    }
}, {
    "_id": {
        "$oid": "5e9330ee5126e34ddd0bf3fc"
    },
    "isItOver": false,
    "tasks": [{
        "name": "Definición de funcionalidades",
        "assignedUser": ["Developer"],
        "message": "",
        "spentTime": "00:00",
        "deadline": "2020-04-17"
    }, {
        "name": "Creación de contenido",
        "assignedUser": ["Scientific"],
        "message": "",
        "spentTime": "00:00",
        "deadline": "2020-04-20"
    }, {
        "name": "Validación con cliente",
        "assignedUser": ["Account"],
        "message": "",
        "spentTime": "00:00",
        "deadline": "2020-04-22"
    }],
    "basicTasks": [{
        "$oid": "5e94c9e32859ba0f9a8335f2"
    }, {
        "$oid": "5e94ca162859ba0f9a8335f3"
    }, {
        "$oid": "5e94ca212859ba0f9a8335f4"
    }],
    "name": "Desarrollo de contenidos",
    "project": {
        "$oid": "5e932f695126e34ddd0bf3f4"
    },
    "created_at": {
        "$date": {
            "$numberLong": "1586704622739"
        }
    },
    "updated_at": {
        "$date": {
            "$numberLong": "1586809594449"
        }
    },
    "__v": {
        "$numberInt": "0"
    }
}, {
    "_id": {
        "$oid": "5e9330f75126e34ddd0bf3fd"
    },
    "isItOver": false,
    "tasks": [],
    "basicTasks": [],
    "name": "Maquetación de la web",
    "project": {
        "$oid": "5e932f695126e34ddd0bf3f4"
    },
    "created_at": {
        "$date": {
            "$numberLong": "1586704631927"
        }
    },
    "updated_at": {
        "$date": {
            "$numberLong": "1586704631927"
        }
    },
    "__v": {
        "$numberInt": "0"
    }
}, {
    "_id": {
        "$oid": "5e9331125126e34ddd0bf3fe"
    },
    "isItOver": false,
    "tasks": [],
    "basicTasks": [],
    "name": "Programación de la web",
    "project": {
        "$oid": "5e932f695126e34ddd0bf3f4"
    },
    "created_at": {
        "$date": {
            "$numberLong": "1586704658559"
        }
    },
    "updated_at": {
        "$date": {
            "$numberLong": "1586704658559"
        }
    },
    "__v": {
        "$numberInt": "0"
    }
}, {
    "_id": {
        "$oid": "5e93311b5126e34ddd0bf3ff"
    },
    "isItOver": false,
    "tasks": [],
    "basicTasks": [],
    "name": "Actualización post-evento",
    "project": {
        "$oid": "5e932f695126e34ddd0bf3f4"
    },
    "created_at": {
        "$date": {
            "$numberLong": "1586704667264"
        }
    },
    "updated_at": {
        "$date": {
            "$numberLong": "1586704667264"
        }
    },
    "__v": {
        "$numberInt": "0"
    }
}, {
    "_id": {
        "$oid": "5e9331305126e34ddd0bf400"
    },
    "isItOver": true,
    "tasks": [{
        "name": "Petición de bibliografía a cliente",
        "assignedUser": ["Account", "5e932c9c5126e34ddd0bf3e7"],
        "message": "Issue with study Costanza et al. 2019",
        "spentTime": "09:49",
        "deadline": "2020-04-15",
        "isItOver": true,
        "completedOn": {
            "$date": {
                "$numberLong": "1586908800000"
            }
        }
    }, {
        "name": "Análisis de la bibliografía",
        "assignedUser": ["Account", "5e932c9c5126e34ddd0bf3e7"],
        "message": "",
        "spentTime": "02:17",
        "deadline": "2020-04-17",
        "isItOver": true,
        "completedOn": {
            "$date": {
                "$numberLong": "1586908800000"
            }
        }
    }],
    "basicTasks": [{
        "$oid": "5e9336a6fb1a47185431b071"
    }, {
        "$oid": "5e9336f4fb1a47185431b072"
    }],
    "name": "Propuesta de estructura",
    "project": {
        "$oid": "5e932f2a5126e34ddd0bf3f3"
    },
    "created_at": {
        "$date": {
            "$numberLong": "1586704688944"
        }
    },
    "updated_at": {
        "$date": {
            "$numberLong": "1586952299512"
        }
    },
    "__v": {
        "$numberInt": "0"
    }
}, {
    "_id": {
        "$oid": "5e93314d5126e34ddd0bf401"
    },
    "isItOver": false,
    "tasks": [{
        "name": "Selección de mensajes clave",
        "assignedUser": ["Scientific", "5e932cc05126e34ddd0bf3e9"],
        "message": "Nuevas directrices de cliente - en mail",
        "spentTime": "05:30",
        "deadline": "2020-04-21",
        "isItOver": true,
        "completedOn": {
            "$date": {
                "$numberLong": "1586908800000"
            }
        }
    }, {
        "name": "Validación con cliente de propuesta de mensajes",
        "assignedUser": ["Account", "5e932c9c5126e34ddd0bf3e7"],
        "message": "",
        "spentTime": "00:15",
        "deadline": "2020-04-22"
    }, {
        "name": "Propuesta de contenido",
        "assignedUser": ["Scientific"],
        "message": "",
        "spentTime": "00:00",
        "deadline": "2020-04-24"
    }, {
        "name": "Envío a cliente",
        "assignedUser": ["Account"],
        "message": "",
        "spentTime": "00:00",
        "deadline": "2020-04-27"
    }],
    "basicTasks": [{
        "$oid": "5e948b057b40924de3424944"
    }, {
        "$oid": "5e948b147b40924de3424945"
    }, {
        "$oid": "5e948b1c7b40924de3424946"
    }, {
        "$oid": "5e948b257b40924de3424947"
    }],
    "name": "Propuesta de contenidos",
    "project": {
        "$oid": "5e932f2a5126e34ddd0bf3f3"
    },
    "created_at": {
        "$date": {
            "$numberLong": "1586704717812"
        }
    },
    "updated_at": {
        "$date": {
            "$numberLong": "1586958462368"
        }
    },
    "__v": {
        "$numberInt": "0"
    }
}, {
    "_id": {
        "$oid": "5e9331615126e34ddd0bf402"
    },
    "isItOver": false,
    "tasks": [{
        "name": "Marcado de las referencias y empaquetado",
        "assignedUser": ["Scientific"],
        "message": "",
        "spentTime": "00:00"
    }],
    "basicTasks": [{
        "$oid": "5e970925446bdc11d42c36ee"
    }],
    "name": "Validación del reference-pack",
    "project": {
        "$oid": "5e932f2a5126e34ddd0bf3f3"
    },
    "created_at": {
        "$date": {
            "$numberLong": "1586704737086"
        }
    },
    "updated_at": {
        "$date": {
            "$numberLong": "1586956581737"
        }
    },
    "__v": {
        "$numberInt": "0"
    }
}, {
    "_id": {
        "$oid": "5e93316d5126e34ddd0bf403"
    },
    "isItOver": false,
    "tasks": [],
    "basicTasks": [],
    "name": "Maquetación de las diapositivas",
    "project": {
        "$oid": "5e932f2a5126e34ddd0bf3f3"
    },
    "created_at": {
        "$date": {
            "$numberLong": "1586704749636"
        }
    },
    "updated_at": {
        "$date": {
            "$numberLong": "1586704749636"
        }
    },
    "__v": {
        "$numberInt": "0"
    }
}, {
    "_id": {
        "$oid": "5e9331765126e34ddd0bf404"
    },
    "isItOver": false,
    "tasks": [],
    "basicTasks": [],
    "name": "Programación del material",
    "project": {
        "$oid": "5e932f2a5126e34ddd0bf3f3"
    },
    "created_at": {
        "$date": {
            "$numberLong": "1586704758917"
        }
    },
    "updated_at": {
        "$date": {
            "$numberLong": "1586704758917"
        }
    },
    "__v": {
        "$numberInt": "0"
    }
}, {
    "_id": {
        "$oid": "5e9331825126e34ddd0bf405"
    },
    "isItOver": true,
    "tasks": [{
        "name": "Análisis de la bibliografía",
        "assignedUser": ["Scientific", "5e932cc05126e34ddd0bf3e9"],
        "message": "",
        "spentTime": "00:30",
        "deadline": "2020-04-13",
        "isItOver": true,
        "completedOn": {
            "$date": {
                "$numberLong": "1586908800000"
            }
        }
    }, {
        "name": "Propuesta de mensajes clave",
        "assignedUser": ["Scientific", "5e932cc05126e34ddd0bf3e9"],
        "message": "",
        "spentTime": "01:30",
        "deadline": "2020-04-15",
        "isItOver": true,
        "completedOn": {
            "$date": {
                "$numberLong": "1586908800000"
            }
        }
    }, {
        "name": "Validación con cliente",
        "assignedUser": ["Account", "5e932c9c5126e34ddd0bf3e7"],
        "message": "",
        "spentTime": "00:45",
        "deadline": "2020-04-16",
        "isItOver": true,
        "completedOn": {
            "$date": {
                "$numberLong": "1586908800000"
            }
        }
    }],
    "basicTasks": [{
        "$oid": "5e943ee09973ad1e0486530c"
    }, {
        "$oid": "5e94c7c12859ba0f9a8335e5"
    }, {
        "$oid": "5e94c7cc2859ba0f9a8335e6"
    }],
    "name": "Selección de mensajes clave",
    "project": {
        "$oid": "5e9330a95126e34ddd0bf3f7"
    },
    "created_at": {
        "$date": {
            "$numberLong": "1586704770497"
        }
    },
    "updated_at": {
        "$date": {
            "$numberLong": "1586809195798"
        }
    },
    "__v": {
        "$numberInt": "0"
    }
}, {
    "_id": {
        "$oid": "5e93318c5126e34ddd0bf406"
    },
    "isItOver": false,
    "tasks": [{
        "name": "Propuesta de contenidos",
        "assignedUser": ["Scientific", "5e932cc05126e34ddd0bf3e9"],
        "message": "There is work to be done",
        "spentTime": "04:12",
        "deadline": "2020-04-22",
        "isItOver": true,
        "completedOn": {
            "$date": {
                "$numberLong": "1586908800000"
            }
        }
    }, {
        "name": "Validación con cliente",
        "assignedUser": ["Account", "5e932c9c5126e34ddd0bf3e7"],
        "message": "",
        "spentTime": "00:15",
        "deadline": "2020-04-23"
    }],
    "basicTasks": [{
        "$oid": "5e94c7db2859ba0f9a8335e7"
    }, {
        "$oid": "5e94c7e62859ba0f9a8335e8"
    }],
    "name": "Propuesta de contenidos",
    "project": {
        "$oid": "5e9330a95126e34ddd0bf3f7"
    },
    "created_at": {
        "$date": {
            "$numberLong": "1586704780243"
        }
    },
    "updated_at": {
        "$date": {
            "$numberLong": "1586958517985"
        }
    },
    "__v": {
        "$numberInt": "0"
    }
}, {
    "_id": {
        "$oid": "5e9331995126e34ddd0bf407"
    },
    "isItOver": false,
    "tasks": [{
        "name": "Aplicación del feedback de cliente",
        "assignedUser": ["Scientific"],
        "message": "",
        "spentTime": "00:00",
        "deadline": "2020-04-24"
    }, {
        "name": "Maquetación del contenido",
        "assignedUser": ["Design"],
        "message": "",
        "spentTime": "00:00",
        "deadline": "2020-04-28"
    }, {
        "name": "Revisión de la maquetación",
        "assignedUser": ["Scientific"],
        "message": "",
        "spentTime": "00:00",
        "deadline": "2020-04-29"
    }, {
        "name": "Envío a cliente",
        "assignedUser": ["Account"],
        "message": "",
        "spentTime": "00:00",
        "deadline": "2020-04-30"
    }],
    "basicTasks": [{
        "$oid": "5e94c7f02859ba0f9a8335e9"
    }, {
        "$oid": "5e94c7fa2859ba0f9a8335ea"
    }, {
        "$oid": "5e94c8052859ba0f9a8335eb"
    }, {
        "$oid": "5e94c80f2859ba0f9a8335ec"
    }],
    "name": "Diseño del díptico",
    "project": {
        "$oid": "5e9330a95126e34ddd0bf3f7"
    },
    "created_at": {
        "$date": {
            "$numberLong": "1586704793370"
        }
    },
    "updated_at": {
        "$date": {
            "$numberLong": "1586808984864"
        }
    },
    "__v": {
        "$numberInt": "0"
    }
}, {
    "_id": {
        "$oid": "5e9331a15126e34ddd0bf408"
    },
    "isItOver": false,
    "tasks": [{
        "name": "Aprobación de presupuestos de impresión",
        "assignedUser": ["Administration"],
        "message": "",
        "spentTime": "00:00",
        "deadline": "2020-05-01"
    }, {
        "name": "Envío de artes finales a impresor",
        "assignedUser": ["Design"],
        "message": "",
        "spentTime": "00:00",
        "deadline": "2020-05-04"
    }],
    "basicTasks": [{
        "$oid": "5e94c8372859ba0f9a8335ed"
    }, {
        "$oid": "5e94c84a2859ba0f9a8335ee"
    }],
    "name": "Impresión y envío a ciente",
    "project": {
        "$oid": "5e9330a95126e34ddd0bf3f7"
    },
    "created_at": {
        "$date": {
            "$numberLong": "1586704801233"
        }
    },
    "updated_at": {
        "$date": {
            "$numberLong": "1586809003056"
        }
    },
    "__v": {
        "$numberInt": "0"
    }
}, {
    "_id": {
        "$oid": "5e95e12d69cb7d717704e0ea"
    },
    "isItOver": true,
    "tasks": [{
        "name": "Creación de línea gráfica",
        "assignedUser": ["Design", "5e932ce65126e34ddd0bf3eb"],
        "message": "",
        "spentTime": "04:55",
        "deadline": "2020-04-15",
        "isItOver": true
    }],
    "basicTasks": [{
        "$oid": "5e95fe3169cb7d717704e0eb"
    }],
    "name": "Propuesta de contenido",
    "project": {
        "$oid": "5e95e12169cb7d717704e0e9"
    },
    "created_at": {
        "$date": {
            "$numberLong": "1586880813123"
        }
    },
    "updated_at": {
        "$date": {
            "$numberLong": "1586888616516"
        }
    },
    "__v": {
        "$numberInt": "0"
    }
}, {
    "_id": {
        "$oid": "5e972d9588adba5f6cde11ca"
    },
    "isItOver": true,
    "tasks": [{
        "name": "Maquetación de contenidos",
        "assignedUser": ["Design", "5e932ce65126e34ddd0bf3eb"],
        "message": "",
        "spentTime": "02:00",
        "deadline": "2020-04-15",
        "isItOver": true,
        "completedOn": {
            "$date": {
                "$numberLong": "1586908800000"
            }
        }
    }, {
        "name": "Revisión de la maquetación",
        "assignedUser": ["Scientific", "5e932cc05126e34ddd0bf3e9"],
        "message": "",
        "spentTime": "01:00",
        "deadline": "2020-04-16",
        "isItOver": true,
        "completedOn": {
            "$date": {
                "$numberLong": "1586908800000"
            }
        }
    }, {
        "name": "Envío a cliente",
        "assignedUser": ["Account", "5e932c9c5126e34ddd0bf3e7"],
        "message": "",
        "spentTime": "00:30",
        "deadline": "2020-04-17",
        "isItOver": true,
        "completedOn": {
            "$date": {
                "$numberLong": "1586908800000"
            }
        }
    }],
    "basicTasks": [{
        "$oid": "5e972d9d88adba5f6cde11cb"
    }, {
        "$oid": "5e972db988adba5f6cde11cc"
    }, {
        "$oid": "5e972dc388adba5f6cde11cd"
    }],
    "name": "Maquetación",
    "project": {
        "$oid": "5e972d6988adba5f6cde11c9"
    },
    "created_at": {
        "$date": {
            "$numberLong": "1586965909800"
        }
    },
    "updated_at": {
        "$date": {
            "$numberLong": "1586966117227"
        }
    },
    "__v": {
        "$numberInt": "0"
    }
}, {
    "_id": {
        "$oid": "5e972dc988adba5f6cde11ce"
    },
    "isItOver": true,
    "tasks": [{
        "name": "Programación del AoM",
        "assignedUser": ["Developer", "5e932d035126e34ddd0bf3ed"],
        "message": "",
        "spentTime": "01:45",
        "deadline": "2020-04-20",
        "isItOver": true,
        "completedOn": {
            "$date": {
                "$numberLong": "1586908800000"
            }
        }
    }],
    "basicTasks": [{
        "$oid": "5e972dd888adba5f6cde11cf"
    }],
    "name": "Programación",
    "project": {
        "$oid": "5e972d6988adba5f6cde11c9"
    },
    "created_at": {
        "$date": {
            "$numberLong": "1586965961804"
        }
    },
    "updated_at": {
        "$date": {
            "$numberLong": "1586966136791"
        }
    },
    "__v": {
        "$numberInt": "0"
    }
}]

module.exports = phaseSeeds