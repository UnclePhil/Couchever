  $db = $.couch.db("couchever");  
  
  function refreshNoteList() {  
   $("ul#NoteList").empty();  
   $db.view("couchever/allnotes", {  
    success: function(data) {  
      for (r in data.rows) {
       v= data.rows[r].value
       docid = v._id;
       doctit = v.Title;
       html = '<li><a href="" value="'+docid+'">' +doctit+ '</a></li>';  
       $("ul#NoteList").append(html);
      }
      $("#NoteList li a").click( function(e) { 
            e.preventDefault; 
            showNote($(this).attr('value'));
            return false;  
        });

     } ,
     error: function(status) {
     alert("Cannot retrieve Notes");
     },
     reduce: false 
   });  
  }  
  
  function refreshTagList() {  
   $("ul#TagList").empty();  
   $db.view("couchever/tags", { 
	success: function(data) {  
      for (r in data.rows) {
       v= data.rows[r]
       docid = v.key;
       doctnbr = v.value;
       html = '<li><a href="#" value="'+docid+'">'+docid+'</a></li>';  
       $("ul#TagList").append(html);
      }
      $("#TagList li a").click( function(e) { 
            e.preventDefault; 
            //showNote($(this).attr('value'));
            return false;  
        });

     } ,
     error: function(status) {
     alert("Cannot retrieve Tags");
     },
	 group: true 
   });  
  }  
  
  function setDefaultActions() {
      $("#BtAddNote").click( function(e) { 
            e.preventDefault; 
            NewNote();
            return false;  
        });
      $("#BtEditNote").click( function(e) { 
            e.preventDefault; 
            EditNote($("span#noteid").text());
            return false;  
        });
      $("#BtDelNote").click( function(e) { 
            e.preventDefault; 
            DelNote($("span#noteid").text());
            return false;  
        });

  }
  
  function init() {
    setDefaultActions();
    refreshTagList();	
    refreshNoteList();
  }
  
  
  function setmsg(msg){
   $("span#msg").empty();
   $("span#msg").append(msg);  
  }
  
  function showNote(searchid) {  
   $("div#ct").empty();  
   $db.openDoc(searchid, {  
     success: function(data) {
       html = Mustache.to_html(Tpl_ShowDoc, data);
       $("div#ct").append(html);  
     } ,
     error: function(status) {
         setmsg("ERROR: Cannot retrieve Document");
     }
   });  
  }  

  function submitNewDoc(){
	 var formData = form2js('NewDoc', '.', true,
				function(node)
				{
					if (node.name && node.name =="Tags")
					{
						return { name: node.name, value: node.value.split(" ") };
					}
				});
     $db.saveDoc(formData, {
        success: function(data) {
            setmsg("Document saved");
        	 $("div#ct").empty(); 
        	 refreshTagList();
        	 refreshNoteList();        
        } ,
        error: function(status) {
           setmsg("ERROR: Cannot retrieve Document");
        }
      });  
  }


  function NewNote() {  
    $("div#ct").empty();  
    data=[];
    html = Mustache.to_html(Tpl_NewDoc, data);
    $("div#ct").append(html); 
  }  
  
  function EditNote(searchid) {  
   $("div#ct").empty();  
   $db.openDoc(searchid, {  
     success: function(data) {
       html = Mustache.to_html(Tpl_EditDoc, data);
       $("div#ct").append(html);  
     } ,
     error: function(status) {
         setmsg("ERROR: Cannot retrieve Document");
     }
   });   
  }

  function DelNote(searchid) {
      if (confirm("Delete this note ?")) { 
        alert("Delete this note?"); 
		$db.openDoc(searchid, {  
			success: function(data) {
			  $db.removeDoc(data, {  
					success: function() {
							$("div#ct").empty(); 
							setmsg("Document removed");
							refreshTagList();
							refreshNoteList();
					} ,
					error: function(status) {
						setmsg("ERROR: Cannot remove Document");
					}
			   });  
			} ,
			error: function(status) {
			setmsg("ERROR: Cannot retrieve Document");
			}
		});  
	}  
  }

 

  
  
