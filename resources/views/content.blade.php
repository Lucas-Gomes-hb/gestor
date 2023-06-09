@extends("layouts.app")
@section("content")

<div id="body-section" class="body-section">
    <div id="newOrder" class="modalOrder non">
        <div class="end">
            <svg onclick="openOrderScreen('out')" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
        </div>

        <div class="pad">
            <select name="User" id="userSelect" class="form-control marginBottom">
                <option value="null">Selecione o usuario para o pedido</option>
            </select>
            
            <button id="openItemsButton" class="btn btn-primary fullSize" onclick="openOrderItems()">Selecione os items do pedido</button>
            <div id="itemOptions" class="non boxOptions"></div>

            <div class="flex marginBottom marginTop">
                <input type="date" name="entregaData" id="deliveryDate" class="form-control" placeholder="Data de entrega do pedido">
                <input type="time" name="entregaHora" id="deliveryHour" class="form-control" placeholder="Hora de entrega">
            </div>

            <input onclick="addOrder()" type="button" value="Lançar pedido" class="btn btn-success fullSize">
        </div>
    </div>
    <div id="backScreen" class="backScreen non"></div>

    <div id="users" class="users">
        <div id="registerUser" class="relative registerUser">
            <div class="spaceBetween marginBottom">
                <div class="halfSize middle">
                    <p class="nome cad">Cadastrar novo usuario</p>
                </div>
                <svg class="pointer one" onclick="openCreationUser('new')" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
            </div>

            <div id="all"></div>
        </div>

        <div id="newUsers" class="out boxUser relative top newUsers">
            <div class="spaceBetween marginBottom">
                <svg class="pointer" onclick="openCreationUser('register')" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                </svg>
                <div class="halfSize middle">
                    <p class="nome">Novo usuario</p>
                </div>
            </div>

            <p>Dados do usuario</p>
            <input class="form-control" type="text" placeholder="Nome: João, Thiago" id="clientName">
            <input class="form-control" type="text" placeholder="CPF contendo somento números" id="clientDocument">
            <input class="form-control marginBottom" type="text" placeholder="Telefone contendo somento números" id="clientCellphone">
            <input type="hidden" id="clientId">

            <div id="newAddress">
                <p>Novo endereço</p>
                <input class="form-control" type="number" placeholder="Número da rua" id="numero">
                <input class="form-control" type="text" placeholder="Nome da rua" id="rua">
                <input class="form-control" type="text" placeholder="Nome do bairro" id="bairro">
                <input class="form-control" type="text" placeholder="Nome da cidade" id="cidade">
                <input class="form-control" type="text" placeholder="Estado" id="estado">
                <input class="form-control" type="text" placeholder="Cep" id="cep">
                <input class="form-control marginBottom" type="number" placeholder="Taxa de entrega" id="taxa">
                <input type="button" value="Criar" class="btn btn-success fullSize" onclick="newUser()">
            </div>
        </div>

        <div id="editUser" class="out boxUser relative top editUsers">
            <div class="spaceBetween marginBottom">
                <svg class="pointer" onclick="openCreationUser('allOut')" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                </svg>
                <div class="halfSize middle">
                    <p id="nomeAll" class="nome"></p>
                </div>

            </div>
            <div id="editUserInfo"></div>


        </div>
    </div>
    <div id="items" class="items">
        <div class="btnPanel">
            <a class="btn btn-secondary halfSize leftBtn" id="collapseRegisterItem" onclick="openItem('registerItem')">Items Registrados</a>
            <a class="btn btn-secondary-op halfSize rightBtn" id="collapseNewItems" onclick="openItem()">Criar novo item</a>
        </div>

        <div id="newItems" class="non box">
            <input class="form-control" type="text" placeholder="Nome do produto" id="productName">
            <input class="form-control" type="number" placeholder="Valor: 00,00" id="productValue">
            <input type="button" value="Criar" class="btn btn-success fullSize" onclick="newItem()">
        </div>

        <div id="registerItem" class="sh box"></div>
    </div>

    <div id="orders" class="orders">
        <button class="btn btn-success fullSize marginBottom" onclick="openOrderScreen('new')">Criar pedido</button>
        <div id="allOrders" class="scroll"></div>
    </div>

</div>

@endsection