Projeto de Gestor/PDV:

Acabei deixando todos os arquivos para o funcionamento da plataforma no git, deixando o .gitignore vazio, por isso basta apenas clonar a aplicação na pasta "htdocs" do XAMPP.

Por conta de dificudades com a instalação do docker junto as laravel, acabei usando o XAMPP para criar e executar o projeto, por isso para fazer com que ele funcione é necessario ter o XAMPP 8.1.12 no computador e o projeto dentro da pasta htdocs dele.

Com relação ao servidor usei o mysql que o XAMPP fornece, para que seja criado todas as tabelas basta entrar na pasta da aplicação dentro do htdocs do XAMPP, e via terminal usar o comando "php artisan migrate" e esperando o sistema lhe perguntar se quer criar a database "gestor", aceitando é para o banco de dados estar 100% instalado. 
Caso aconteça algum erro com o comando ou na instalação deixarei na pasta "servidor" um arquivo com o database usado na criação tendo apenas que importa-lo.

No demais acredito que o processo dentro da aplicação seja intuitiva.