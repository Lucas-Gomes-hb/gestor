<?php
    switch($data["action"]){
        case "new":
            $nome = (String) $data["nome"];
            $valor = (float) $data["valor"];
            $created_at = date(DATE_ISO8601);
            $updated_at = date(DATE_ISO8601);

            $itemSelectQuery = $CONECTION->prepare("INSERT INTO item(nome,valor,created_at,updated_at) VALUES(:nome,:valor,:created_at,:updated_at)")->execute([
                "nome"=>$nome,
                "valor"=>$valor,
                "created_at"=>$created_at,
                "updated_at"=>$updated_at,
            ]);

            $returnAPI = $CONECTION->lastInsertId();
            break;
        case "all":
            $items = array();
            $itemQuery = $CONECTION->prepare("SELECT * FROM item");
            $itemQuery->execute();

            foreach($itemQuery as $row){
                $item = array(
                    "id" => $row["id"],
                    "nome" => $row["nome"],
                    "valor" => $row["valor"],
                );

                array_push($items,$item);
            }

            $returnAPI = $items;
            break;
        case "delete":
            $id = (int) $data["id"];
            $itemDeletingQuery = $CONECTION->prepare("DELETE FROM item WHERE id=:id");
            $itemDeletingQuery->execute(["id"=>$id]);

            $returnAPI = "Success";
            break;
        case "update":
            $id = (int) $data["id"];
            $nome = (String) $data["nome"];
            $valor = (float) $data["valor"];
            $updated_at = date(DATE_ISO8601);

            $itemUpdateQuery = $CONECTION->prepare("UPDATE item SET nome=:nome,valor=:valor,updated_at=:updated_ate WHERE id=:id");
            $itemUpdateQuery->execute([
                "nome"=>$nome,
                "id"=>$id,
                "valor"=>$valor,
                "updated_at"=>$updated_at,
            ]);
            
            $returnAPI = "Success";
            break;
        default:
            $returnAPI = "Nothing Done";
            break;
    }
?>