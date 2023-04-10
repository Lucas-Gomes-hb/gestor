<?php
    switch ($data["action"]) {
        case 'new':
            $idCliente = $data["idCliente"];
            $endereco = $data["endereco"];
            $item = $data["item"];
            $dataEntrega = $data["dataEntrega"];
            $created_at = date(DATE_ISO8601);
            $updated_at = date(DATE_ISO8601);

            $orderQuery = $CONNECTION->prepare("INSERT INTO pedidos(idCliente,endereco,item,dataEntrega,created_at,updated_at) VALUES(:idCliente,:endereco,:item,:dataEntrega,:created_at,:updated_at)");
            $orderQuery->execute([
                "idCliente"=>$idCliente,
                "endereco"=>$endereco,
                "item"=>$item,
                "dataEntrega"=>$dataEntrega,
                "created_at"=>$created_at,
                "updated_at"=>$updated_at,
            ]);

            unlink("../cache/cache.json");
            $returnAPI = $CONNECTION->lastInsertId();
            break;
        case 'delete':
            $id = $data["id"];

            $orderDeleteQuery = $CONNECTION->prepare("DELETE FROM pedidos WHERE id=:id");
            $orderDeleteQuery->execute(["id"=>$id]);

            unlink("../cache/cache.json");
            $returnAPI = "SUCCESS";
            break;
    }
?>