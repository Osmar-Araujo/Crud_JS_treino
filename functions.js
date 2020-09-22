$(function () {
  var operation = "C"; //"C"=Criar 
  var selected_index = -1; // Índice selecionado
  var tblPersons = localStorage.getItem("tblPersons"); //Retornar os dados
  tblPersons = JSON.parse(tblPersons); //Converter a  String em Objeto
  if (tblPersons === null) // Caso não hajam dados, inicializar um array vazio.
      tblPersons = [];

  function Create() {
    //Obter os valores do form e transformando em String.
    var person = JSON.stringify({
      ID: $("#txtID").val(),
      Name: $("#txtName").val(),
      Phone: $("#txtPhone").val(),
      Email: $("#txtEmail").val()
    }); 
    //Guardar o objeto na tabela
    tblPersons.push(person);
    //Armazenar os dados no Local Storage
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons));
    alert("Os dados foram salvos com sucesso!"); //Mensagem de alerta
    return true;
  }

  function Edit() {
    // Editar o item selecionado na tabela
    tblPersons[selected_index] = JSON.stringify({
        ID: $("#txtID").val(),
        Name: $("#txtName").val(),
        Phone: $("#txtPhone").val(),
        Email: $("#txtEmail").val()
    });
    //Armazenar os dados no Local Storage
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons)); 
    alert("Os dados foram editados co sucesso!"); //Mensagem de alerta
    return true;
  }

  function Delete() {
    //Deletar o elemento selecionado na tabela
    tblPersons.splice(selected_index, 1); 
    //Atualizar os dados no Local Storage
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons)); 
    alert("Registro Deletado!"); //Mensagem de alerta
  }

  function List() {
    $("#tblList").html("");
    $("#tblList").html(
            "<thead>" +
            "<tr>" +                
            "<th>ID</th>" +
            "<th>Nome</th>" +
            "<th>Telefone</th>" +
            "<th>Email</th>" +
            "<th>Editar/Deletar</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
            ); //Apresentar a lista de registros
    for (var i in tblPersons) {
        var per = JSON.parse(tblPersons[i]);
        $("#tblList tbody").append("<tr>" +                    
                "<td>" + per.ID + "</td>" +
                "<td>" + per.Name + "</td>" +
                "<td>" + per.Phone + "</td>" +
                "<td>" + per.Email + "</td>" +                    
                "<td><img src='edit.png' alt='Edit" + i + "' class='btnEdit'/>&nbsp &nbsp<img src='delete.png' alt='Delete" + i + "' class='btnDelete'/></td>" +
                "</tr>"
                );
    } //Carregar os itens na tabela (Editar?Deletar)
  }

  $("#frmPerson").bind("submit", function () {
    if (operation === "C")
        return Create();
    else
        return Edit();
  });
  
  List();

  $(".btnEdit").bind("click", function () {
    operation = "E"; //"E" = Editar
    //Obter o identificador do item a ser editado
    selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
    // Converter de JSON para formato adequado para editar os dados
    var per = JSON.parse(tblPersons[selected_index]); 
    $("#txtID").val(per.ID);
    $("#txtName").val(per.Name);
    $("#txtPhone").val(per.Phone);
    $("#txtEmail").val(per.Email);
    $("#txtID").attr("readonly", "readonly");
    $("#txtName").focus();
  });

  $(".btnDelete").bind("click", function () {
    //Obter o identificador do item a ser eliminado
    selected_index = parseInt($(this).attr("alt").replace("Delete", "")); 
    Delete(); //Eliminar o item
    List(); //Listar novamente os itens da tabela
  });
});

