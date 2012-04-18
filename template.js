var Tpl_ShowDoc=''
    +'<div class="DocHead">'
    +'<span class="Label">Title: </span><span class="Data">{{Title}}</span></br>'
    +'<span class="Label">User : </span><span class="Data">{{User}}</span></br>'
    +'<span class="Label">Tags : </span><span class="Data">{{#Tags}}{{.}} {{/Tags}}</span></br>'
    +'</div><div class="DocContent">'
    +'{{Content}}</div>'
    +'<span id="noteid" class="hidden">{{_id}}</span>' ;
    
   
var Tpl_NewDoc=''
    +'<form id="NewDoc"><div class="DocHead">'
    +'<span class="Label">Title: </span><input type = text name="Title" size=50 value=""></br>'
    +'<span class="Label">Tags : </span><input type = text name="Tags" size=50 value=""></br>'
    +'</div>'
    +'<div class="DocContent">'
    +'<textarea name="Content" cols="80" rows="30" ></textarea>'
    +'<input type = hidden name="Type" value="Note">'
	+'<input type = hidden name="Book" value="MyBook">'
	+'</div><input type="Button" onclick="submitNewDoc()" value="Save"></form>';

var Tpl_EditDoc=''
    +'<form id="NewDoc"><div class="DocHead">'
    +'<span class="Label">Title: </span><input type = text name="Title" size=50 value="{{Title}}"></br>'
    +'<span class="Label">Tags : </span><input type = text name="Tags" size=50 value="{{#Tags}}{{.}} {{/Tags}}"></br>'
    +'</div>'
    +'<div class="DocContent">'
    +'<textarea name="Content" cols="80" rows="30" >{{Content}}</textarea>'
    +'<input type = hidden name="Type" value="{{Type}}">'
	+'<input type = hidden name="Book" value="{{Book}}">'
    +'<input type = hidden name="_id" value="{{_id}}">'
    +'<input type = hidden name="_rev" value="{{_rev}}">'
	+'</div><input type="Button" onclick="submitNewDoc()" value="Save"></form>';

