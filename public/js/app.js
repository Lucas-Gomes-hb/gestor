//Comunicatio with server API
async function communication(action,info){
    let data = "";
    await $.ajax({
        url:"http://localhost/gestor/public/API/",
        method:"POST",
        dataType:"JSON",
        data:{
            "action":action,
            "info":info
        },
        success:(dataServer)=>{
            data = dataServer;
        },
        error:()=>{
            console.log("Connection problem")
        }
    })
    return data;
}

function resetForm(){
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
function openCreationUser(type){
    switch(type){
        case "new":
            $("#registerUser").addClass("slideOff");
            $("#newUsers").removeClass("out");
            $("#newUsers").removeClass("slideOff");
            $("#newUsers").addClass("slideIn");
            break;
        case "register":
            $("#newUsers").addClass("slideOff");
            $("#registerUser").removeClass("out");
            $("#registerUser").removeClass("slideOff");
            $("#registerUser").addClass("slideIn");
            resetForm();
            break;
    }
}

$("#collapseNewItems").on("click", () => {
        $("#registerItem").removeClass("non");
        $("#registerItem").removeClass("sh");
        $("#registerItem").addClass("non");
        $("#collapseRegisterItem").removeClass("btn-primary");
        $("#collapseRegisterItem").removeClass("btn-primary-op");
        $("#collapseRegisterItem").addClass("btn-primary-op");

        $("#collapseNewItems").removeClass("btn-primary");
        $("#collapseNewItems").removeClass("btn-primary-op");
        $("#collapseNewItems").addClass("btn-primary");
        $("#newItems").removeClass("non");
        $("#newItems").removeClass("sh");
        $("#newItems").addClass("sh");
});

$("#collapseRegisterItem").on("click", () => {
    $("#registerItem").removeClass("non");
        $("#registerItem").removeClass("sh");
        $("#registerItem").addClass("sh");
        $("#collapseRegisterItem").removeClass("btn-primary");
        $("#collapseRegisterItem").removeClass("btn-primary-op");
        $("#collapseRegisterItem").addClass("btn-primary");

        $("#collapseNewItems").removeClass("btn-primary");
        $("#collapseNewItems").removeClass("btn-primary-op");
        $("#collapseNewItems").addClass("btn-primary-op");
        $("#newItems").removeClass("non");
        $("#newItems").removeClass("sh");
        $("#newItems").addClass("non");
});

$("#collapseNewAddresses").on("click", () => {

    $("#registerAddress").removeClass("non");
        $("#registerAddress").removeClass("sh");
        $("#registerAddress").addClass("non");
        $("#collapseRegisterAddress").removeClass("btn-primary");
        $("#collapseRegisterAddress").removeClass("btn-primary-op");
        $("#collapseRegisterAddress").addClass("btn-primary-op");

        $("#collapseNewAddresses").removeClass("btn-primary");
        $("#collapseNewAddresses").removeClass("btn-primary-op");
        $("#collapseNewAddresses").addClass("btn-primary");
        $("#newAddress").removeClass("non");
        $("#newAddress").removeClass("sh");
        $("#newAddress").addClass("sh");
});

$("#collapseRegisterAddress").on("click", () => {

    $("#registerAddress").removeClass("non");
        $("#registerAddress").removeClass("sh");
        $("#registerAddress").addClass("sh");
        $("#collapseRegisterAddress").removeClass("btn-primary");
        $("#collapseRegisterAddress").removeClass("btn-primary-op");
        $("#collapseRegisterAddress").addClass("btn-primary");

        $("#collapseNewAddresses").removeClass("btn-primary");
        $("#collapseNewAddresses").removeClass("btn-primary-op");
        $("#collapseNewAddresses").addClass("btn-primary-op");
        $("#newAddress").removeClass("non");
        $("#newAddress").removeClass("sh");
        $("#newAddress").addClass("non");
});

//Creating functions
async function newUser(){
    let error = false;

    let nome = $("#clientName").val();
    let cpf = $("#clientDocument").val();
    let telefone = $("#clientCellphone").val();

    let numberValidator = new RegExp("[0-9]+");
    let letterValidator = new RegExp("/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/");

    if(nome.length <= 2) error = "Nome muito curto";
    if(nome == "" && !error) error = "Nome vazio";
    if(letterValidator.exec(nome) && !error) error = "Nome deve conter apenas letras";
    if(cpf.length < 11 && !error) error = "CPF muito curto";
    if(cpf == "" && !error) error = "CPF vazio";
    if(!numberValidator.exec(cpf))error = "CPF deve conter apenas números";
    if(telefone.length < 11 && !error) error = "Telefone muito curto";
    if(telefone == "" && !error) error = "Telefone vazio";
    if(!numberValidator.exec(telefone)) error = "Telefone deve conter apenas números";

    if(!error){ 
        let info ={
            "action":"new",
            "nome":nome,
            "cpf":cpf,
            "telefone":telefone
        }

        let resposta = await communication("user",info);

        if(resposta.status){
            $("#clientId").val(resposta.return);
            $("#clientName").attr("disabled","");
            $("#clientDocument").attr("disabled","");
            $("#clientCellphone").attr("disabled","");

            $("#nextStepUser").addClass("non");

            $("#newAddress").removeClass("non");
        }
    }

    if(error){
        console.log("Error user: " +error);
    }
}

async function newAddress(){
    let error = false;

    let numero = $("#numero").val();
    let rua = $("#rua").val();
    let bairro = $("#bairro").val();
    let cidade = $("#cidade").val();
    let estado = $("#estado").val();
    let cep = $("#cep").val();

    let numberValidator = new RegExp("[0-9]+");
    let letterValidator = new RegExp("/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/");

    if(numero.length <= 2) error = "Número muito curto";
    if(numero == "" && !error) error = "Número vazio";
    if(!numberValidator.exec(numero) && !error) error = "Número deve conter apenas números";
    if(rua.length <= 2 && !error) error = "Rua muito curto";
    if(rua == "" && !error) error = "Rua vazio";
    if(letterValidator.exec(rua) && !error) error = "Rua deve conter apenas letras";
    if(bairro.length < 11 && !error) error = "Bairro muito curto";
    if(bairro == "" && !error) error = "Bairro vazio";
    if(letterValidator.exec(bairro))error = "Bairro deve conter apenas letras";
    if(cidade.length < 11 && !error) error = "Cidade muito curto";
    if(cidade == "" && !error) error = "Cidade vazio";
    if(letterValidator.exec(cidade)) error = "Cidade deve conter apenas letras";
    if(estado.length < 11 && !error) error = "Estado muito curto";
    if(estado == "" && !error) error = "Estado vazio";
    if(letterValidator.exec(estado)) error = "Estado deve conter apenas letras";
    if(cep.length < 11 && !error) error = "Cep muito curto";
    if(cep == "" && !error) error = "Cep vazio";
    if(letterValidator.exec(cep)) error = "Cep deve conter apenas letras";

    if(!error){ 
        let info ={
            "action":"new",
            "nome":nome,
            "cpf":cpf,
            "telefone":telefone
        }

        let resposta = await communication("address",info);

        if(resposta.status){
            // $("#registerUser").append('<div>'+
            // '<input type="radio" class="btn-check" name="usuarios" id="'+resposta.return+'usuario" autocomplete="off">'+
            // '<label class="btn fullSize marginBottom cardChoice" for="'+resposta.return+'usuario">'+
            // '<div class="spaceBetween">'+
            //     '<div class="nome">'+nome+'</div>'+
            //     '<svg onclick="editUser('+user.id+')" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>'+
            // '</div>'+
            // '<div class="spaceBetween">'+
            //     '<div>'+telefone+'</div>'+
            //     '<div>'+cpf+'</div>'+
            // '</div>'+
            // '</label>'+
            // '</div>');

            // $("#clientName").val("");
            // $("#clientDocument").val("");
            // $("#clientCellphone").val("");
        }
    }

    if(error){
        console.log("Error user: " +error);
    }
}

async function newItem(){
    let error = false;

    let nome = $("#productName").val();
    let valor = $("#productValue").val();

    let letterValidator = new RegExp("/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/");

    if(nome.length <= 2) error = "Nome muito curto";
    if(nome == "" && !error) error = "Nome vazio";
    if(letterValidator.exec(nome) && !error) error = "Nome deve conter apenas letras";
    if(valor == "" && !error) error = "Valor vazio";

    if(!error){ 
        let realValor = parseFloat(valor.replaceAll(",",".")).toFixed(2);
        let info ={
            "action":"new",
            "nome":nome,
            "valor":realValor,
        }

        let resposta = await communication("item",info);

        if(resposta.status){
            $("#registerItem").append('<div>'+
            '<input type="radio" class="btn-check" name="items" id="'+resposta.return+'item" autocomplete="off">'+
            '<label class="btn fullSize marginBottom cardChoice" for="'+resposta.return+'item">'+
            '<div class="nome">'+nome+'</div>'+
            '<div class="spaceBetween">'+
                '<div></div>'+
                '<div>R$ '+valor+'</div>'+
            '</div>'+
            '</label>'+
            '</div>');

            $("#productName").val("");
            $("#productValue").val("");
        }
    }

    if(error){
        console.log("Error user: " +error);
    }
}

//Deleting functions
async function deleteUser(id){
    let deleted = await communication("user",{
        "action": "delete",
        "id":id
    });

    if(deleted.status){
        $("#" + id + "usuario").parent().remove();
    }
}

async function deleteItem(id){
    let deleted = await communication("item",{
        "action": "delete",
        "id":id
    });

    if(deleted.status){
        $("#" + id + "item").parent().remove();
    }
}

async function deleteAddress(id){
    let deleted = await communication("address",{
        "action": "delete",
        "id":id
    });

    if(deleted.status){
        $("#" + id + "address").parent().remove();
    }
}

//Getting info functions
async function getAllClients(){
    let usuarios = await communication("user",{
        "action":"all"
    });

    if(!usuarios.status) return;

    usuarios = usuarios.return.map(function(user) {
        return '<div>'+
            '<input type="radio" class="btn-check" name="usuarios" id="'+user.id+'usuario" autocomplete="off">'+
            '<label class="btn fullSize marginBottom cardChoice" for="'+user.id+'usuario">'+
            '<div class="spaceBetween">'+
                '<div class="nome">'+user.nome+'</div>'+
                '<svg onclick="editUser('+user.id+')" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>'+    
            '</div>'+
            '<div class="spaceBetween">'+
                '<div>'+user.telefone+'</div>'+
                '<div>'+user.cpf+'</div>'+
            '</div>'+
            '</label>'+
            '</div>'
    });

    usuarios.forEach((user)=>{
        $("#registerUser").append(user);
    });
}

async function getAllItems(){
    let items = await communication("item",{
        "action":"all"
    });

    if(!items.status) return;

    items = items.return.map(function(item) {
        return '<div>'+
            '<input type="radio" class="btn-check" name="items" id="'+item.id+'item" autocomplete="off">'+
            '<label class="btn fullSize marginBottom cardChoice" for="'+item.id+'item">'+
            '<div class="spaceBetween">'+
                '<div class="nome">'+item.nome+'</div>'+
                '<svg onclick="deleteItem('+item.id+')" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>'+    
            '</div>'+
            '<div class="spaceBetween">'+
                '<div></div>'+
                '<div>R$ '+item.valor.toString().replaceAll(".",",")+'</div>'+
            '</div>'+
            '</label>'+
            '</div>'
    });

    $("#registerItem").html(items.join(""));
}

async function getAllAddresses(){
    let addresses = await communication("address",{
        "action":"all"
    });

    if(!addresses.status) return;

    addresses = addresses.return.map(function(address) {
        return '<div>'+
            '<input type="radio" class="btn-check" name="addresses" id="'+address.id+'address" autocomplete="off">'+
            '<label class="btn fullSize marginBottom cardChoice" for="'+address.id+'address">'+
            '<div class="spaceBetween">'+
                '<div class="nome">'+address.formated+'</div>'+
                '<svg onclick="deleteUser('+address.id+')" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>'+    
            '</div>'+
            '<div class="spaceBetween">'+
                '<div>'+address.cep+'</div>'+
                '<div></div>'+
            '</div>'+
            '</label>'+
            '</div>'
    });

    $("#registerAddress").html(addresses.join(""));
}

$(document).ready(function(){
    getAllClients();
    getAllItems();
})