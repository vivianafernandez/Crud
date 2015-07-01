/**
 * Created by developer on 6/29/2015.
 */
        (function($){ 
//Código aquí
  operation = "A"; //"A"=Adding; "E"=Editing 
             selected_index = -1; //Index of the selected list item
              tbClients = localStorage.getItem("tbClients");//Retrieve the stored data 
             tbClients = JSON.parse(tbClients); //Converts string to object 
             if(tbClients == null) //If there is no data, initialize an empty array 
                tbClients = [];  

              List();
function Add(){ 
    var client = JSON.stringify({ 
        ID : $("#txtID").val(),
        Name : $("#txtName").val(),
        Phone : $("#txtPhone").val(), 
        Email : $("#txtEmail").val() 
        });

        console.log(client);

        tbClients.push(client);

        localStorage.setItem("tbClients", JSON.stringify(tbClients)); 

        alert("The data was saved.");
         return true;
    
    // return List();
    


} 

function List(){
    // console.log("aqui");
    var tblists = $('#tblList');
    $("#tblList").html("");
    $("#tblList").html( 
        "<thead>"+ "    <tr>"+
         "  <th></th>"+ 
         "  <th>ID</th>"+ 
         "  <th>Name</th>"+ 
         "  <th>Phone</th>"+
          " <th>Email</th>"+
          " </tr>"+ "</thead>"+ 
          "<tbody>"+ "</tbody>" ); 
    for(var i in tbClients){
     var cli = JSON.parse(tbClients[i]);
      $("#tblList tbody").append("<tr>"+ 
        "   <td><img src='img/edit.png' alt='Edit"+i+"' class='btnEdit'/><img src='img/borrar.png' alt='Delete"+i+"' class='btnDelete'/></td>" +
         "  <td>"+cli.ID+"</td>" +
          " <td>"+cli.Name+"</td>" + 
          " <td>"+cli.Phone+"</td>" +
           "    <td>"+cli.Email+"</td>" + 
           "</tr>"); 
  }
 } 
function Edit(){
     tbClients[selected_index] = JSON.stringify({ 
     ID : $("#txtID").val(), 
     Name : $("#txtName").val(), 
     Phone : $("#txtPhone").val(), 
     Email : $("#txtEmail").val() });//Alter the selected item on the table 
     localStorage.setItem("tbClients", JSON.stringify(tbClients));
    alert("The data was edited.")
    operation = "A"; //Return to default value return true; 
   
} 

function Delete(){ 
    tbClients.splice(selected_index, 1); 
    localStorage.setItem("tbClients", JSON.stringify(tbClients));
     alert("Client deleted.");
      
 } 


$("#frmCadastre").bind("submit",function(){
 if(operation == "A") 
    return Add(); 
 else 
    return Edit();  
}); 

$(".btnEdit").bind("click", function(){
 operation = "E"; 
 selected_index = parseInt($(this).attr("alt").replace("Edit", "")); 
 var cli = JSON.parse(tbClients[selected_index]); 
 $("#txtID").val(cli.ID); $("#txtName").val(cli.Name);
  $("#txtPhone").val(cli.Phone);
   $("#txtEmail").val(cli.Email);
    $("#txtID").attr("readonly","readonly"); 
    $("#txtName").focus(); 
     
}); 

$(".btnDelete").bind("click", function(){ 
    selected_index = parseInt($(this).attr("alt").replace("Delete", "")); 
    Delete(); 
    List(); 
}); 
            
})(jQuery);
            

