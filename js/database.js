var counts = 0
function addFields(){
    let modal_body=document.getElementsByClassName("modal-body")[0];
    // console.log(document.getElementById("parameter1").value);
    let div1 = document.createElement("div");
    div1.setAttribute("class","mb-3");
    let inp = document.createElement("input");
    inp.setAttribute("type", "text");
    inp.setAttribute("class", "form-control"); 
    inp.setAttribute("name", `param${counts}`);
    div1.appendChild(inp);
    modal_body.appendChild(div1);
    counts++;
}