async function selectTagParser(toArray,index){
    
    var html = `<select id='select-${index}'>`

    var split = toArray.split(",")
    var optionBuilder = ""
    await _.forEach(split,data =>{
        optionBuilder += `<option>${data}</option>`
    })
   html += optionBuilder
   html += "</select>"
    await setTimeout(() =>{
        //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))

        $("#cx-chat-index-"+index+ " .cx-message-text").html(null)
        $("#cx-chat-index-"+index+ " .cx-message-text").html(html);
       },40)
}


