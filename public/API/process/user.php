<?php
    switch($data["action"]){
        case "new":
            $nome = (String) $data["nome"];
            $cpf = (String) $data["cpf"];
            $telefone = (String) $data["telefone"];
            $created_at = date(DATE_ISO8601);
            $updated_at = date(DATE_ISO8601);

            $userSelectQuery = $CONNECTION->prepare("INSERT INTO usuario(nome,cpf,celular,created_at,updated_at) VALUES(:nome,:cpf,:telefone,:created_at,:updated_at)")->execute([
                "nome"=>$nome,
                "cpf"=>$cpf,
                "telefone"=>$telefone,
                "created_at"=>$created_at,
                "updated_at"=>$updated_at,
            ]);

            $returnAPI = $CONNECTION->lastInsertId();
            break;
        case "all":
            $users = array();
            $userQuery = $CONNECTION->prepare("SELECT * FROM usuario");
            $userQuery->execute();

            foreach($userQuery as $row){
                $user = array(
                    "id" => $row["id"],
                    "nome" => $row["nome"],
                    "cpf" => $row["cpf"],
                    "telefone" => $row["celular"],
                );

                array_push($users,$user);
            }

            $returnAPI = $users;
            break;
        case "delete":
            $id = (int) $data["id"];
            $userDeletingQuery = $CONNECTION->prepare("DELETE FROM usuario WHERE id=:id");
            $userDeletingQuery->execute(["id"=>$id]);

            $returnAPI = "Success";
            break;
        case "update":
            $id = (int) $data["id"];
            $nome = (String) $data["nome"];
            $cpf = (String) $data["cpf"];
            $telefone = (String) $data["telefone"];
            $updated_at = date(DATE_ISO8601);

            $userUpdateQuery = $CONNECTION->prepare("UPDATE usuario SET nome=:nome,cpf=:cpf,celular=:telefone,updated_at=:updated_ate WHERE id=:id");
            $userUpdateQuery->execute([
                "nome"=>$nome,
                "id"=>$id,
                "cpf"=>$cpf,
                "telefone"=>$telefone,
                "updated_at"=>$updated_at,
            ]);
            
            $returnAPI = "Success";
            break;
        case "one":
            $user = array();
            $id = (int) $data["id"];

            $userQuery = $CONNECTION->prepare("SELECT * FROM usuario WHERE id=:id");
            $userQuery->execute(["id"=>$id]);

            foreach($userQuery as $row){
                $user = array(
                    "id" => $row["id"],
                    "nome" => $row["nome"],
                    "cpf" => $row["cpf"],
                    "telefone" => $row["celular"],
                );
            }

            $returnAPI = $user;
            break;
        default:
            $returnAPI = "Nothing Done";
            break;
    }
?>