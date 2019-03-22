/* begin util */
// converts the first letter in uppercase
function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// setup main modal view
function setupModal(header_content,body_content="",footer_content="") 
{
    var main_modal=document.getElementById('main_modal');
    var main_modal_header=document.getElementById('main_modal_header');
    var main_modal_body=document.getElementById('main_modal_body');
    var main_modal_footer=document.getElementById('main_modal_footer');
    main_modal_header.innerHTML="";
    main_modal_body.innerHTML="";
    main_modal_footer.innerHTML="";
    main_modal.style.display="inline-table";

    main_modal_header.appendChild(header_content);
    if(body_content!=""){main_modal_body.appendChild(body_content);}
    if(footer_content!=""){main_modal_footer.appendChild(footer_content);}
}

function modalH3(text,type="normal"){
    var c_h3 = document.createElement('h3');
    c_h3.innerText=text;
    if(type=="error"){
        c_h3.style.color="crimson";
    }else if(type=="success"){
        c_h3.style.color="forestgreen";
    }
    return c_h3;
}

function modalSimpleText(text){
    var c_span = document.createElement('span');
    c_span.innerText=text;
    return c_span;
}

function modalInputTexts(texts,inputs,default_vals){
    var table = document.createElement('table');
    for(var i=0;i<texts.length;i++){
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.innerHTML=texts[i];
        tr.appendChild(td);
        
        var input = document.createElement('input');
        input.value=default_vals[i];
        input.type="text";
        input.id=inputs[i];
        input.size=40;
        input.name=inputs[i];
        var td2 = document.createElement('td');
        td2.appendChild(input);
        tr.appendChild(td2);
        table.appendChild(tr);
    }
    return table;
}

function modalAreaTexts(texts,inputs,default_vals){
    var table = document.createElement('table');
    for(var i=0;i<texts.length;i++){
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.innerHTML=texts[i];
        tr.appendChild(td);
        
        var input = document.createElement('textarea');
        input.value=default_vals[i];
        input.rows=5;
        input.cols=50;
        input.id=inputs[i];
        input.name=inputs[i];
        var td2 = document.createElement('td');
        td2.appendChild(input);
        tr.appendChild(td2);
        table.appendChild(tr);
    }
    return table;
}

function modalSelect(text,inputName,default_vals, options){
    var table = document.createElement('table');
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.innerHTML=text;
    tr.appendChild(td);
    
    var input = document.createElement('select');
    input.id=inputName;
    input.name=inputName;

    for(var i=0;i<options.length;i++){
        var option = document.createElement('option');
        option.value = options[i].value;
        option.innerHTML = options[i].name;
        input.appendChild(option);
    }

    var td2 = document.createElement('td');
    td2.appendChild(input);
    tr.appendChild(td2);
    table.appendChild(tr);
    return table;
}

function modalButton(text,function_to_append){
    var button = document.createElement('button');
    button.innerText=text;
    button.addEventListener("click", function_to_append, false);
    return button;
}

/* end util */

