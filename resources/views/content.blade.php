@extends("layouts.app")
@section("content")

    <div id="body-section" class="body-section">
        <div id="users" class="users">
            <input type="text" placeholder="Nome: João, thiago" id="clientName">
            <input type="text" placeholder="000.000.000-00" id="clientDocument">
            <input type="text" placeholder="(00)00000-0000" id="clientCellphone">
            <input type="button" value="Criar">
        </div>
        <div id="items"></div>
        <div id="orders"></div>
    </div>

@endsection
