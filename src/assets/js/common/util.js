/* begin util */
// converts the first letter in uppercase
export function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// setup main modal view
export function setupModal(header_content,body_content="",footer_content="") 
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

export function modalH3(text,type="normal"){
    var c_h3 = document.createElement('h3');
    c_h3.innerText=text;
    if(type=="error"){
        c_h3.style.color="crimson";
    }else if(type=="success"){
        c_h3.style.color="forestgreen";
    }
    return c_h3;
}

export function modalSimpleText(text){
    var c_span = document.createElement('span');
    c_span.innerText=text;
    return c_span;
}

export function modalInputTexts(texts,inputs,default_vals){
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
/**
 * Create a table with a configurable form.
 * @param {Object} setupForm is a configuration of form
 * @author Juan Reyes <seyerman@gmail.com>
 */
function modalForm(setupForm){
    let table = document.createElement('table');
    for(const field in setupForm){
        let conf = setupForm[field]

        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        td1.innerHTML = conf["text"]
        tr.appendChild(td1)

        let formEntry = document.createElement(conf["tag"])
        let attributes = conf["attributes"]
        formEntry["name"] = field
        formEntry["id"] = field
        if(localStorage[field]!==undefined){
            formEntry["value"] = localStorage[field]
        }
        for(const name in attributes){
            formEntry[name] = attributes[name]
        }

        if(conf["children"]!==undefined && conf["childrenTag"]!==undefined){
            let childrenTag = conf["childrenTag"]
            let childrenMark = conf["childrenMark"]
            let children    = conf["children"]
            for(let i=0;i<children.length;i++){
                let childNode = document.createElement(childrenTag)
                let childAttributes = children[i]
                let mark = false
                for(const name in childAttributes){
                    childNode[name] = childAttributes[name]
                    if(!mark && localStorage[field]!==undefined && childAttributes[name]==localStorage[field]){
                        childNode[childrenMark] = true
                    }
                }
                formEntry.appendChild(childNode)
            }
        }

        let td2 = document.createElement('td');
        td2.appendChild(formEntry)
        tr.appendChild(td2)
        table.appendChild(tr)    
    }
    return table
}

export function modalCustomization(texts,inputs,default_vals){
    var table = document.createElement('table');
    for(var i=0;i<texts.length;i++){
        var tr = document.createElement('tr');
        if(i==3){
            tr.id="filetouploadtr";
            tr.style.display="none";
        }
        var td = document.createElement('td');
        td.innerHTML=texts[i];
        tr.appendChild(td);

        if(i==0){
            var input = document.createElement('input');
            input.size=48;
        }
        else if(i==3){
            var input = document.createElement('input');
            input.type="file";
        }else{
            var input = document.createElement('textarea');
            input.cols=50;
        }

        input.value=default_vals[i];
        input.id=inputs[i];
        input.name=inputs[i];
        if(i==0 || i==1 || i==4){
            input.disabled="disabled";
        }

        var td2 = document.createElement('td');
        td2.appendChild(input);
        tr.appendChild(td2);
        table.appendChild(tr);
    }
    return table;
}

export function modalButton(text,function_to_append){
    var button = document.createElement('button');
    button.innerText=text;
    button.id=text;
    button.addEventListener("click", function_to_append, false);
    return button;
}

/* end util */

