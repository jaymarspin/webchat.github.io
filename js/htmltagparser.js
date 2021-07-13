async function selectTagParser(toArray,index){
    
    var html = `<select id='select-${index}'>`

    var split = toArray.split(",")
    var optionBuilder = ""
    await _.forEach(split,data =>{
        let value = data.trim()
        optionBuilder += `<option value='${value}'>${data}</option>`
    })
   html += optionBuilder
   html += "</select>"
    await setTimeout(() =>{
        //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))

        $("#cx-chat-index-"+index+ " .cx-message-text").html(null)
        $("#cx-chat-index-"+index+ " .cx-message-text").html(html);
       },40)

       return `#select-${index}`
}

async function selectTagSender(data){
    $(() =>{
        setTimeout(() =>{
         
         $(`body ${data}`).change(() =>{
          
              
             $(`#cx_input`).val($(`body ${data}`).val())
             setTimeout(() =>{
                 $(`#cx_input`).focus()
                 $(".cx-send").trigger("click")
             },50)
         })
        },80)
     })
}




