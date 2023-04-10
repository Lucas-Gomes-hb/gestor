<?php
header('Access-Control-Allow-Origin: *'); 
header('Content-type:application/json;charset=utf-8');
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

$return = array();
$error = false;
$returnAPI = "";
$CONNECTION = new PDO("mysql:host=127.0.0.1;dbname=gestor;charset=utf8mb4", "root", "", []);

switch ($_SERVER["REQUEST_METHOD"]) {
    case 'POST':
        $action = $_POST["action"];
        $data = $_POST["info"];

        switch ($action) {
            case "user":
                include_once("process/user.php");
                break;
            case "item":
                include_once("process/item.php");
                break;
            case "address":
                include_once("process/address.php");
                break;
            case "order":
                include_once("process/order.php");
                break;
            default:
                $error = "No map action";
                break;
        }
        
        break;
    case "GET":
        if(file_exists("cache/cache.json")){
            $json = json_decode(file_get_contents("cache/cache.json"));
            $returnAPI = $json;
        }else{
            $orders = array();
    
                $orderQuery = $CONNECTION->prepare("SELECT o.id,o.dataEntrega, u.id AS idCliente, u.nome, u.cpf, e.numero, e.rua,e.bairro, e.cidade,e.estado,e.taxa, i.nome AS item ,i.valor FROM pedidos o, usuario u, enderecos e, item i WHERE e.id = o.endereco AND i.id = o.item AND u.id = o.idCliente");
                $orderQuery->execute();

                foreach($orderQuery as $row){
                    $order =array(
                        "id"=>$row["id"],
                        "idCliente"=>$row["idCliente"],
                        "nomeCliente"=>$row["nome"],
                        "cpfCliente"=>$row["cpf"],
                        "numero"=>$row["numero"],
                        "rua"=>$row["rua"],
                        "bairro"=>$row["bairro"],
                        "cidade"=>$row["cidade"],
                        "estado"=>$row["estado"],
                        "taxa"=>$row["taxa"],
                        "item"=>$row["item"],
                        "itemValor"=>$row["valor"],
                        "dataEntrega"=>$row["dataEntrega"],
                    );

                    array_push($orders,$order);
                }
                $returnAPI = $orders;

                $json = "cache/cache.json";
                $fp = fopen($json, "w");

                $cache = json_encode($orders);

                $clean = preg_replace(array('/<!--(.*)-->/Uis',"/[[:blank:]]+/"),array('',' '),str_replace(array("\n","\r","\t"),'', $cache));

                $fw = fwrite($fp, $clean);
        }
        break;
    default:
        $error = "No map request method";
        break;
}


//Retorno da API
if(!$error) header("HTTP/1.1 200 OK"); else header("HTTP/1.1 400 Bad Request");
$return['status'] = ($error) ? false : true;
if(!$error)$return['return'] = $returnAPI;

if($error) $return['error'] = $error; 
if($error) $return['error']['date'] = date(DATE_ISO8601); 
echo json_encode($return);
?>