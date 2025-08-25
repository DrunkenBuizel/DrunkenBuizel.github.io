
<!--  < >  Hola! Dejo esto aqui porque mi teclado no incluye estos carácteres   -->

<?php 

    $host = "localhost";
    $db = "mortgage";
    $charset = "utf8mb4";
    $user = "root";
    $pass = "";

    $options = [

        PDO::ATTR_ERRMODE             =>PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE  =>PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES    =>false,

    ];

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    
    try {
        $pdo = new PDO($dsn, $user, $pass, $options);
        echo "conectado a base de datos correctamente";
    }

    catch (PDOException $e){
        throw new PDOException($e->getMessage(), (int)$e->getCode());
        echo "Se intento";
    }

?>