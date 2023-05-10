function myFunction() {
    // Declare variables
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    thead = document.getElementsByTagName("thead");
    tr = table.getElementsByTagName("tr");
    
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
      var ans = 0;
      for (k=0; k< td.length; k++){
        tdd = td[k]
        if(tdd){
          txtValue = tdd.textContent || tdd.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            ans++;
          }
        }
      }
      if (ans > 0) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
    }
    head = document.getElementById("tableHead");
    ths = head.getElementsByTagName("th");
    let attributes = [];
    for (var i = 1; i < ths.length; i++) {
      array.push(ths[i].innerText);
    }
    
    var counts = 1;
    function addFields1(){
      let updateOriginal = document.getElementById("updateOriginal")
      // let updateNew = document.getElementById("updateNew")
      let div = document.createElement("div");
      div.setAttribute("class", "input-group")
    
      let inp1 = document.createElement("input");
      inp1.setAttribute("type", "text");
      inp1.setAttribute("class","form-control");
      inp1.setAttribute("placeholder","Attribute");
      inp1.setAttribute("name",`originalAttribute${counts}`);
      inp1.setAttribute("style","margin-bottom:20px;")
    
      let inp2 = document.createElement("input");
      inp2.setAttribute("type", "text");
      inp2.setAttribute("class","form-control");
      inp2.setAttribute("placeholder","Value");
      inp2.setAttribute("name",`originalValue${counts}`);
      inp2.setAttribute("style","margin-bottom:20px;")
    
      div.appendChild(inp1);
      div.appendChild(inp2);
    
      updateOriginal.appendChild(div);
      counts++;
    }
    
    counts = 1;
    
    function addFields2(){
      let updateOriginal = document.getElementById("updateNew")
      // let updateNew = document.getElementById("updateNew")
      let div = document.createElement("div");
      div.setAttribute("class", "input-group")
    
      let inp1 = document.createElement("input");
      inp1.setAttribute("type", "text");
      inp1.setAttribute("class","form-control");
      inp1.setAttribute("placeholder","Attribute");
      inp1.setAttribute("name",`newAttribute${counts}`);
      inp1.setAttribute("style","margin-bottom:20px;")
    
      let inp2 = document.createElement("input");
      inp2.setAttribute("type", "text");
      inp2.setAttribute("class","form-control");
      inp2.setAttribute("placeholder","New Value");
      inp2.setAttribute("name",`newValue${counts}`);
      inp2.setAttribute("style","margin-bottom:20px;")
    
      div.appendChild(inp1);
      div.appendChild(inp2);
    
      updateOriginal.appendChild(div);
      counts++;
    }
    
    function addFields3(){
      let updateOriginal = document.getElementById("deleteWhere")
      // let updateNew = document.getElementById("updateNew")
      let div = document.createElement("div");
      div.setAttribute("class", "input-group")
    
      let inp1 = document.createElement("input");
      inp1.setAttribute("type", "text");
      inp1.setAttribute("class","form-control");
      inp1.setAttribute("placeholder","Attribute");
      inp1.setAttribute("name",`deleteAttribute${counts}`);
      inp1.setAttribute("style","margin-bottom:20px;")
    
      let inp2 = document.createElement("input");
      inp2.setAttribute("type", "text");
      inp2.setAttribute("class","form-control");
      inp2.setAttribute("placeholder","New Value");
      inp2.setAttribute("name",`deleteValue${counts}`);
      inp2.setAttribute("style","margin-bottom:20px;")
    
      div.appendChild(inp1);
      div.appendChild(inp2);
    
      updateOriginal.appendChild(div);
      counts++;
    }
    function checkAttibutes(attribute){
      yes = false;
      for (i = 0; i < attributes.length; i++) 
      {
        if (i == attribute)
        {
          yes = true;
          break;
        }
      }
      if (yes == false){
        alert("Attributes Do Not Match. Kindly Check the Attributes!")
      }
    }
    function checkForm(){
      originalForm = document.getElementById("updateOriginal");
      inpGroups = originalForm.getElementsByClassName("input-group");
      inps = [];
      for (i = 0; i < inpGroups.length; i++)
      {
        inps.push(inpGroups[i][0].value);
      }
      for (i=0; i<inps.length; i++)
      {
        checkAttibutes(inps[i]);
      }
    }