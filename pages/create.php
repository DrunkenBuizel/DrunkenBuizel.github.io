
<!--  < >  Hola! Dejo esto aqui porque mi teclado no incluye estos carácteres   -->

<?php 

    $id = 0;
    $nombre = "";
    $apellido = "";
    $telefono = "";
    $email = "";
    $ciudad = "";
    $pais = "";


    //Variable $_SERVER es una variable del servidor apache, en donde puede acceder 
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        guardarDatos();
    }

    function guardarDatos(){

        require_once "config.php";

        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $telefono = $_POST["telefono"];
        $email = $_POST["email"];
        $ciudad = $_POST["ciudad"];
        $pais = $_POST["pais"];

        $sql = "INSERT INTO contacto(nombre, apellido, telefono, email, ciudad, pais)
                   VALUES (?,?,?,?,?,?)";

        //$pdo es variable en config.php, la que crea la variable de conexion
        if($stmt = $pdo->prepare($sql)) {
            if($stmt->execute([$nombre, $apellido                                   , $telefono, $email, $ciudad, $pais])) {
                header ("location: form.php");
                exit;
            }

            else{
                echo "Lo siento, ocurrio un error inesperado";
            }
        }

        unset ($stmt);
        unset ($pdo);
    }

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