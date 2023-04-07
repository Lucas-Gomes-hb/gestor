@extends("layouts.app")
@section("content")
    
    <div id="body-section" class="body-section">
        <div id="users" class="users">
            <a class="btn btn-primary fullSize" data-toggle="collapse" href="#newUsers" role="button" aria-expanded="false" aria-controls="newUsers" id="collapseNewUsers">Criar novo cliente</a>
            <div id="newUsers" class="collapse box">
                <input class="form-control" type="text" placeholder="Nome: João, thiago" id="clientName">
                <input class="form-control" type="text" placeholder="000.000.000-00" id="clientDocument">
                <input class="form-control" type="text" placeholder="(00)00000-0000" id="clientCellphone">
                <input type="button" value="Criar" class="btn btn-success fullSize">
            </div>
            <div id="registerUser"></div>
        </div>
        <div id="items" class="items">
            <div id="newItem">
                <input class="form-control" type="text" placeholder="Nome do produto" id="productName">
                <input class="form-control" type="text" placeholder="00,00" id="productValue">
                <input type="button" value="Criar" class="btn btn-success fullSize">
            </div>
            <div id="registerItem"></div>
        </div>
        <div id="orders" class="orders">

        </div>
    </div>

@endsection
