<?php
    switch($data["action"]){
        case "new":
            $idCliente = (int) $data["idCliente"];
            $numero = (int) $data["numero"];
            $rua = (String) $data["rua"];
            $bairro = (String) $data["bairro"];
            $cidade = (String) $data["cidade"];
            $estado = (String) $data["estado"];
            $cep = (String) $data["cep"];
            $lat = (String) $data["lat"];
            $lon = (String) $data["lon"];
            $taxa = (float) $data["taxa"];
            $created_at = date(DATE_ISO8601);
            $updated_at = date(DATE_ISO8601);

            $addressSelectQuery = $CONNECTION->prepare("INSERT INTO enderecos(numero,rua,bairro,cidade,estado,cep,latitude,longitude,idCliente,created_at,updated_at,taxa) VALUE(:numero,:rua,:bairro,:cidade,:estado,:cep,:latitude,:longitude,:idCliente,:created_at,:updated_at,:taxa)")->execute([
                "numero"=>$numero,
                "rua"=>$rua,
                "cidade"=>$cidade,
                "estado"=>$estado,
                "cep"=>$cep,
                "bairro"=>$bairro,
                "latitude"=>$lat,
                "longitude"=>$lon,
                "taxa"=>$taxa,
                "idCliente"=>$idCliente,
                "created_at"=>$created_at,
                "updated_at"=>$updated_at,
            ]);

            $returnAPI = $CONNECTION->lastInsertId();
            break;
        case "all":
            $addresses = array();
            $addressQuery = $CONNECTION->prepare("SELECT * FROM enderecos");
            $addressQuery->execute();

            foreach($addressQuery as $row){
                $address = array(
                    "id" => $row["id"],
                    "numero"=>$row["numero"],
                    "rua"=>$row["rua"],
                    "cidade"=>$row["cidade"],
                    "estado"=>$row["estado"],
                    "cep"=>$row["cep"],
                    "bairro"=>$row["bairro"],
                    "latitude"=>$row["latitude"],
                    "longitude"=>$row["longitude"],
                    "taxa"=>$row["taxa"],
                    "idCliente"=>$row["idCliente"],
                );

                array_push($addresses,$address);
            }

            $returnAPI = $addresses;
            break;
        case "delete":
            $id = (int) $data["id"];
            $addressDeletingQuery = $CONNECTION->prepare("DELETE FROM enderecos WHERE idCliente=:id");
            $addressDeletingQuery->execute(["id"=>$id]);

            $returnAPI = "Success";
            break;
        case "update":
            $id = (int) $data["id"];
            $idCliente = (int) $data["idCliente"];
            $numero = (int) $data["numero"];
            $rua = (String) $data["rua"];
            $bairro = (String) $data["bairro"];
            $cidade = (String) $data["cidade"];
            $estado = (String) $data["estado"];
            $cep = (String) $data["cep"];
            $lat = (String) $data["lat"];
            $lon = (String) $data["lon"];
            $taxa = (float) $data["taxa"];
            $updated_at = date(DATE_ISO8601);

            $addressUpdateQuery = $CONNECTION->prepare("UPDATE enderecos SET numero=:numero,rua=:rua,	bairro=:bairro,	cidade=:cidade,	estado=:estado,	cep=:cep, latitute=:latitude,longitude=:longitude,idCliente=:idCliente,	updated_at=:updated_at	 WHERE id=:id");
            $addressUpdateQuery->execute([
                "id"=>$id,
                "numero"=>$numero,
                "rua"=>$rua,
                "cidade"=>$cidade,
                "estado"=>$estado,
                "cep"=>$cep,
                "bairro"=>$bairro,
                "latitude"=>$lat,
                "longitude"=>$lon,
                "taxa"=>$taxa,
                "idCliente"=>$idCliente,
                "updated_at"=>$updated_at,
            ]);
            
            $returnAPI = "Success";
            break;
        case "one":
            $address = array();
            $id = (int) $data["id"];

            $addressQuery = $CONNECTION->prepare("SELECT * FROM enderecos WHERE idCliente=:id");
            $addressQuery->execute(["id"=>$id]);

            foreach($addressQuery as $row){
                $address = array(
                    "id" => $row["id"],
                    "numero"=>$row["numero"],
                    "rua"=>$row["rua"],
                    "cidade"=>$row["cidade"],
                    "estado"=>$row["estado"],
                    "cep"=>$row["cep"],
                    "bairro"=>$row["bairro"],
                    "latitude"=>$row["latitude"],
                    "longitude"=>$row["longitude"],
                    "taxa"=>$row["taxa"],
                    "idCliente"=>$row["idCliente"],
                );
            }

            $returnAPI = $address;
            break;
        default:
            $returnAPI = "Nothing Done";
            break;
    }
?>