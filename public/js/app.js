//Comunicatio with server API
async function communication(action, info) {
    let data = "";
    await $.ajax({
        url: "http://localhost/gestor/public/API/",
        method: "POST",
        dataType: "JSON",
        data: {
            "action": action,
            "info": info
        },
        success: (dataServer) => {
            data = dataServer;
        },
        error: () => {
            console.log("Connection problem")
        }
    })
    return data;
}

function resetForm() {
    $("#clientName").val("");
    $("#clientDocument").val("");
    $("#clientCellphone").val("");
    $("#numero").val("");
    $("#rua").val("");
    $("#bairro").val("");
    $("#cidade").val("");
    $("#estado").val("");
    $("#cep").val("");
    $("#taxa").val("");
}

//Funções menu de cada div de criação e visualização
function openCreationUser(type) {
    switch (type) {
        case "new":
            $("#newUsers").removeClass("out");
            $("#newUsers").removeClass("slideOff");
            $("#newUsers").addClass("slideIn");
            break;
        case "register":
            $("#newUsers").addClass("slideOff");
            resetForm();
            break;
        case "allIn":
            $("#editUser").removeClass("out");
            $("#editUser").removeClass("slideOff");
            $("#editUser").addClass("slideIn");
            break;
        case "allOut":
            $("#editUser").removeClass("slideIn");
            $("#editUser").addClass("slideOff");
            $("#editUserInfo").html("");
            $("#nomeAll").html("");
            break;
        case "edit":
            $("#editUser").removeClass("out");
            $("#editUser").removeClass("slideOff");
            $("#editUser").addClass("slideIn");
            break;
    }
}

function openItem(type) {
    switch (type) {
        case "registerItem":
            $("#registerItem").removeClass("non");
            $("#registerItem").removeClass("sh");
            $("#registerItem").addClass("sh");
            $("#collapseRegisterItem").removeClass("btn-secondary");
            $("#collapseRegisterItem").removeClass("btn-secondary-op");
            $("#collapseRegisterItem").addClass("btn-secondary");

            $("#collapseNewItems").removeClass("btn-secondary");
            $("#collapseNewItems").removeClass("btn-secondary-op");
            $("#collapseNewItems").addClass("btn-secondary-op");
            $("#newItems").removeClass("non");
            $("#newItems").removeClass("sh");
            $("#newItems").addClass("non");
            break;

        default:
            $("#registerItem").removeClass("non");
            $("#registerItem").removeClass("sh");
            $("#registerItem").addClass("non");
            $("#collapseRegisterItem").removeClass("btn-secondary");
            $("#collapseRegisterItem").removeClass("btn-secondary-op");
            $("#collapseRegisterItem").addClass("btn-secondary-op");

            $("#collapseNewItems").removeClass("btn-secondary");
            $("#collapseNewItems").removeClass("btn-secondary-op");
            $("#collapseNewItems").addClass("btn-secondary");
            $("#newItems").removeClass("non");
            $("#newItems").removeClass("sh");
            $("#newItems").addClass("sh");
            break;
    }
}

async function editUser(id) {
    let user = await communication("user", { "action": "one", "id": id });
    let address = await communication("address", { "action": "one", "id": id });

    if (user.status && address.status) {
        user = user.return;
        address = address.return;
        $("#nomeAll").html(user.nome);

        $("#editUserInfo").append(
            '<p>Dados do usuario</p>' +
            '<input class="form-control" type="text" placeholder="Nome: João, Thiago" id="nameAll" value="' + user.nome + '">' +
            '<input class="form-control" type="text" placeholder="CPF contendo somento números"id="docAll" value="' + user.cpf + '">' +
            '<input class="form-control marginBottom" type="text" placeholder="Telefone contendo somento números" id="cellAll" value="' + user.telefone + '">' +

            '<div id="newAddress" >' +
            '<p>Novo endereço</p>' +
            '<input class="form-control" type="number" placeholder="Número da rua" id="numeroAll" value="' + address.numero + '">' +
            '<input class="form-control" type="text" placeholder="Nome da rua" id="ruaAll" value="' + address.rua + '">' +
            '<input class="form-control" type="text" placeholder="Nome do bairro" id="bairroAll" value="' + address.bairro + '">' +
            '<input class="form-control" type="text" placeholder="Nome da cidade" id="cidadeAll" value="' + address.cidade + '">' +
            '<input class="form-control" type="text" placeholder="Estado" id="estadoAll" value="' + address.estado + '">' +
            '<input class="form-control" type="text" placeholder="Cep" id="cepAll" value="' + address.cep + '">' +
            '<input class="form-control marginBottom" type="number" placeholder="Taxa de entrega" ' + 'id="taxaAll" value="' + address.taxa + '">' +
            '<div class="flex">' +
            '<input type="button" value="Atualizar" class="btn btn-success halfSize" onclick="updateUser(' + id + ')">' +
            '<input type="button" value="Deletar" class="btn btn-danger halfSize" onclick="deleteUser(' + id + ')">' +
            '</div>' +
            '</div>'
        );

        openCreationUser("allIn")
    }
}

async function updateUser() {

}

//Creating functions
async function newUser() {
    let error = false;

    //Usuario
    let nome = $("#clientName").val();
    let cpf = $("#clientDocument").val();
    let telefone = $("#clientCellphone").val();

    //Endereço
    let numero = $("#numero").val();
    let rua = $("#rua").val();
    let bairro = $("#bairro").val();
    let cidade = $("#cidade").val();
    let estado = $("#estado").val();
    let cep = $("#cep").val();
    let taxa = $("#taxa").val();

    let numberValidator = new RegExp("[0-9]+");
    let letterValidator = new RegExp("/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/");

    //Usuario
    if (nome.length <= 2) error = "Nome muito curto";
    if (nome == "" && !error) error = "Nome vazio";
    if (letterValidator.exec(nome) && !error) error = "Nome deve conter apenas letras";
    if (cpf.length < 11 && !error) error = "CPF muito curto";
    if (cpf == "" && !error) error = "CPF vazio";
    if (!numberValidator.exec(cpf)) error = "CPF deve conter apenas números";
    if (telefone.length < 11 && !error) error = "Telefone muito curto";
    if (telefone == "" && !error) error = "Telefone vazio";
    if (!numberValidator.exec(telefone)) error = "Telefone deve conter apenas números";

    //Endereço      
    if (numero == "" && !error) error = "Número vazio";
    if (!numberValidator.exec(numero) && !error) error = "Número deve conter apenas números";
    if (rua.length <= 2 && !error) error = "Rua muito curto";
    if (rua == "" && !error) error = "Rua vazio";
    if (letterValidator.exec(rua) && !error) error = "Rua deve conter apenas letras";
    if (bairro.length < 4 && !error) error = "Bairro muito curto";
    if (bairro == "" && !error) error = "Bairro vazio";
    if (letterValidator.exec(bairro)) error = "Bairro deve conter apenas letras";
    if (cidade.length < 4 && !error) error = "Cidade muito curto";
    if (cidade == "" && !error) error = "Cidade vazio";
    if (letterValidator.exec(cidade)) error = "Cidade deve conter apenas letras";
    if (estado.length < 1 && !error) error = "Estado muito curto";
    if (estado == "" && !error) error = "Estado vazio";
    if (letterValidator.exec(estado)) error = "Estado deve conter apenas letras";
    if (cep.length < 7 && !error) error = "Cep muito curto";
    if (cep == "" && !error) error = "Cep vazio";
    if (letterValidator.exec(cep)) error = "Cep deve conter apenas letras";

    if (!error) {
        let infoUser = {
            "action": "new",
            "nome": nome,
            "cpf": cpf,
            "telefone": telefone
        }

        let respostaUser = await communication("user", infoUser);

        if (respostaUser.status) {
            let infoAddress = {
                "action": "new",
                "numero": numero,
                "rua": rua,
                "bairro": bairro,
                "cidade": cidade,
                "estado": estado,
                "cep": cep,
                "taxa": parseFloat(taxa.toString().replaceAll(",", ".")).toFixed(2),
                "idCliente": parseInt(respostaUser.return),
                "lat": "empty",
                "lon": "empty",
            }
            let respostaAddress = await communication("address", infoAddress);

            if (respostaAddress.status) {
                $("#all").append('<div>' +
                    '<input type="radio" class="btn-check" name="usuarios" id="' + respostaUser.return + 'usuario" autocomplete="off">' +
                    '<label class="btn fullSize marginBottom cardChoice" for="' + respostaUser.return + 'usuario">' +
                    '<div class="spaceBetween">' +
                    '<div class="nome">' + nome + '</div>' +
                    '<svg onclick="editUser(' + respostaUser.return + ')" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>' +
                    '</div>' +
                    '<div class="spaceBetween">' +
                    '<div>' + telefone + '</div>' +
                    '<div>' + cpf + '</div>' +
                    '</div>' +
                    '</label>' +
                    '</div>');

                resetForm();
            }
        }
    }

    if (error) {
        console.log("Error user: " + error);
    }
}

async function newItem() {
    let error = false;

    let nome = $("#productName").val();
    let valor = $("#productValue").val();

    let letterValidator = new RegExp("/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/");

    if (nome.length <= 2) error = "Nome muito curto";
    if (nome == "" && !error) error = "Nome vazio";
    if (letterValidator.exec(nome) && !error) error = "Nome deve conter apenas letras";
    if (valor == "" && !error) error = "Valor vazio";

    if (!error) {
        let realValor = parseFloat(valor.replaceAll(",", ".")).toFixed(2);
        let info = {
            "action": "new",
            "nome": nome,
            "valor": realValor,
        }

        let resposta = await communication("item", info);

        if (resposta.status) {
            $("#registerItem").append('<div>' +
                '<input type="radio" class="btn-check" name="items" id="' + resposta.return + 'item" autocomplete="off">' +
                '<label class="btn fullSize marginBottom cardChoice" for="' + resposta.return + 'item">' +
                '<div class="nome">' + nome + '</div>' +
                '<div class="spaceBetween">' +
                '<div></div>' +
                '<div>R$ ' + valor.replaceAll(".", ",") + '</div>' +
                '</div>' +
                '</label>' +
                '</div>');

            $("#productName").val("");
            $("#productValue").val("");
        }
    }

    if (error) {
        console.log("Error user: " + error);
    }
}

//Deleting functions
async function deleteUser(id) {
    let deletedAddress = await communication("address", {
        "action": "delete",
        "id": id
    });

    let deletedUser = await communication("user", {
        "action": "delete",
        "id": id
    });

    if (deletedUser.status) {
        $("#" + id + "usuario").parent().remove();
    }

    openCreationUser("allOut");
}

async function deleteItem(id) {
    let deleted = await communication("item", {
        "action": "delete",
        "id": id
    });

    if (deleted.status) {
        $("#" + id + "item").parent().remove();
    }
}

//Getting info functions
async function getAllClients() {
    let usuarios = await communication("user", {
        "action": "all"
    });

    if (!usuarios.status) return;

    usuarios = usuarios.return.map(function (user) {
        return '<div>' +
            '<input type="radio" class="btn-check" name="usuarios" id="' + user.id + 'usuario" autocomplete="off">' +
            '<label class="btn fullSize marginBottom cardChoice" for="' + user.id + 'usuario">' +
            '<div class="spaceBetween">' +
            '<div class="nome">' + user.nome + '</div>' +
            '<svg onclick="editUser(' + user.id + ')" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>' +
            '</div>' +
            '<div class="spaceBetween">' +
            '<div>' + user.telefone + '</div>' +
            '<div>' + user.cpf + '</div>' +
            '</div>' +
            '</label>' +
            '</div>'
    });

    usuarios.forEach((user) => {
        $("#all").append(user);
    });
}

async function getAllItems() {
    let items = await communication("item", {
        "action": "all"
    });

    if (!items.status) return;

    items = items.return.map(function (item) {
        return '<div>' +
            '<input type="radio" class="btn-check" name="items" id="' + item.id + 'item" autocomplete="off">' +
            '<label class="btn fullSize marginBottom cardChoice" for="' + item.id + 'item">' +
            '<div class="spaceBetween">' +
            '<div class="nome">' + item.nome + '</div>' +
            '<svg onclick="deleteItem(' + item.id + ')" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>' +
            '</div>' +
            '<div class="spaceBetween">' +
            '<div></div>' +
            '<div>R$ ' + item.valor.toString().replaceAll(".", ",") + '</div>' +
            '</div>' +
            '</label>' +
            '</div>'
    });

    $("#registerItem").html(items.join(""));
}


$(document).ready(function () {
    getAllClients();
    getAllItems();
})