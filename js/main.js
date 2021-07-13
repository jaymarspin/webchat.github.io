

/**********************************************************************/


if (!window._genesys)window._genesys = {}
if (!window._genesys.widgets) window._genesys.widgets = {}
if (!window._genesys.widgets.extensions) window._genesys.widgets.extensions = {}



  window._genesys = {
    "widgets": {
        "main": {
          "theme": "dark",
      },
      "webchat": {
        "transport": {
          "type": "purecloud-v2-sockets",
          "dataURL": "https://api.mypurecloud.ie",
          "deploymentKey": "e21e711d-d051-48b3-9444-3154c218a218",
          "orgGuid": "773b0fee-6e0d-4de1-8500-d798e2eb4a57",
          "interactionData": {
            "routing": {
              "targetType": "QUEUE",
              "targetAddress": "Test",
              "priority": 2
            }
          }
        },
      }
    }
  };




let plugin = CXBus.registerPlugin('TestExtension')


plugin.subscribe('WebChatService.messageReceived', function (e) {
    console.log('Chat messageReceived', e);
        console.log(e)

    for (var i = 0; i < e.data.messages.length; i++){
      var messages = e.data.messages[i].text;
              console.log(e.data.messages[i])


            switch (messages) {


                case 'May I have your name please?':
               
// e.data.messages[i].text  = `{ 

//     "type": "Structured",
//     "text": "May I have your name please?,
//     "contentType": "quick-replies",
//     "content": [

//         {
//         	"id": "1", "type": "quick-reply", "action": "message","text": "Sounds Good."},
//         {"id": "2", "type": "quick-reply", "action": "message","text": "No, sorry."},
//         {"id": "3", "type": "quick-reply", "action": "message","text": "What else?"}
//     ]
//      }`   

//                           let f = JSON.parse(e.data.messages[i].text);
//                           e.data.messages[i].text = CreateRichMessageElement(plugin, e.data.messages[i].index, f)           
                break;


                    case 'Make a Claim Check Claim Status':

                          e.data.messages[i].text  = `{ 
                                "type": "Structured",
                                "text": "Make a Claim",
                                "contentType": "generic",
                                "content": [
                            
                                    {
                             
                                        "components": [
                             
                                            {
                                                "id": "0",
                                                "type": "button",
                                                "text": "Make a Claim",
                                                "title": "Make a Claim",
                                                "actions": {
                                                    "textback": "Make a Claim"
                                                }
                                            },

                                            {
                                                "id": "1",
                                                "type": "button",
                                                "text": "Check Claim Status",
                                                "title": "Check Claim Status",
                                                "actions": {
                                                    "textback": "Check Claim Status"
                                                }
                                            }
     
                                        ]
                                    }
                                ]
                          }`

                          let a = JSON.parse(e.data.messages[i].text);
                          e.data.messages[i].text = CreateRichMessageElement(plugin, e.data.messages[i].index, a)
  
                break;

                    case 'Phone Number , Email Address, Name , Contract Number':

                            e.data.messages[i].text = `{ 
                                "type": "Structured",
                                "text": "Phone Number , Email Address, Name , Contract Number",
                                "contentType": "generic",
                                "content": [
                            
                                    {
                             
                                        "components": [
                             
                                            {
                                                "id": "0",
                                                "type": "button",
                                                "text": "Phone Number",
                                                "title": "Phone Number",
                                                "actions": {
                                                    "textback": "Phone Number"
                                                }
                                            },

                                             {
                                                "id": "1",
                                                "type": "button",
                                                "text": "Email Address",
                                                "title": "Email Address",
                                                "actions": {
                                                    "textback": "Email Address"
                                                }
                                            },

                                             {
                                                "id": "2",
                                                "type": "button",
                                                "text": "Name",
                                                "title": "Name",
                                                "actions": {
                                                    "textback": "Name"
                                                }
                                            },
                                             {
                                                "id": "3",
                                                "type": "button",
                                                "text": "Contract Number",
                                                "title": "Contract Number",
                                                "actions": {
                                                    "textback": "Contract Number"
                                                }
                                            }
                                        ]
                                    }
                                ]
                          }`


                          let b = JSON.parse(e.data.messages[i].text);
                          e.data.messages[i].text = CreateRichMessageElement(plugin, e.data.messages[i].index, b)
                 break; 

                        case 'Confirm , Modify':

                          e.data.messages[i].text  = `{ 
                                "type": "Structured",
                                "text": "Confirm , Modify",
                                "contentType": "generic",
                                "content": [
                            
                                    {
                             
                                        "components": [
                             
                                            {
                                                "id": "0",
                                                "type": "button",
                                                "text": "Confirm",
                                                "title": "Confirm",
                                                "actions": {
                                                    "textback": "Confirm"
                                                }
                                            },

                                            {
                                                "id": "1",
                                                "type": "button",
                                                "text": "Modify",
                                                "title": "Modify",
                                                "actions": {
                                                    "textback": "Modify"
                                                }
                                            }
     
                                        ]
                                    }
                                ]
                          }`



                         let c = JSON.parse(e.data.messages[i].text);
                          e.data.messages[i].text = CreateRichMessageElement(plugin, e.data.messages[i].index, c)
  
                break;

                     case 'Appliances , Electricals , Plumbing , Heating and Air ,Indoor and Outdoor , None of These':


                            e.data.messages[i].text = `{ 
                                "type": "Structured",
                                "text": "Appliances , Electricals , Plumbing , Heating and Air ,Indoor and Outdoor , None of These",
                                "contentType": "generic",
                                "content": [
                            
                                    {
                             
                                        "components": [
                             
                                            {
                                                "id": "0",
                                                "type": "button",
                                                "text": "Appliances",
                                                "title": "Appliances",
                                                "actions": {
                                                    "textback": "Appliances"
                                                }
                                            },

                                             {
                                                "id": "1",
                                                "type": "button",
                                                "text": "Electricals",
                                                "title": "Electricals",
                                                "actions": {
                                                    "textback": "Electricals"
                                                }
                                            },

                                             {
                                                "id": "2",
                                                "type": "button",
                                                "text": "Plumbing",
                                                "title": "Plumbing",
                                                "actions": {
                                                    "textback": "Plumbing"
                                                }
                                            },
                                             {
                                                "id": "3",
                                                "type": "button",
                                                "text": "Heating and Air",
                                                "title": "Heating and Air",
                                                "actions": {
                                                    "textback": "Heating and Air"
                                                }
                                            },
                                             {
                                                "id": "4",
                                                "type": "button",
                                                "text": "Indoor and Outdoor",
                                                "title": "Indoor and Outdoor",
                                                "actions": {
                                                    "textback": "Indoor and Outdoor"
                                                }
                                            },
                                              {
                                                "id": "5",
                                                "type": "button",
                                                "text": "None of These",
                                                "title": "None of These",
                                                "actions": {
                                                    "textback": "None of These"
                                                }
                                            }

                                        ]
                                    }
                                ]
                          }`

                         let d = JSON.parse(e.data.messages[i].text);
                          e.data.messages[i].text = CreateRichMessageElement(plugin, e.data.messages[i].index, d)
                break;

                case 
                `Refrigerator , Dryer , Washer , Garbage Disposer , Range/Oven/Stove , Others , Goback`:
                e.data.messages[i].text = `dont erase me`
                
                
                //convert to select option tag
                selectTagParser(messages,e.data.messages[i].index).then(data =>{
                
                    selectTagSender(data)
                     
                })
              break;

    }

  }


});
// async function selectTagParser(toArray,index){
    
//     var html = `<select id='select-${index}'>`

//     var split = toArray.split(",")
//     var optionBuilder = ""
//     await _.forEach(split,data =>{
//         optionBuilder += `<option>${data}</option>`
//     })
//    html += optionBuilder
//    html += "</select>"
//     await setTimeout(() =>{
//         //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))

//         $("#cx-chat-index-"+index+ " .cx-message-text").html(null)
//         $("#cx-chat-index-"+index+ " .cx-message-text").html(html);
//        },40)
// }

plugin.subscribe('WebChatService.ready', function(e){

});



plugin.subscribe('WebChatService.started', function (e) {
    //console.log('Chat started', e);
  });


 
plugin.subscribe('WebChatService.sendMessage', function (e) {
    console.log('Chat sendMessage', e);
  });


/***********************************************************************************************************************************************/

/*******************************************************************************************************************/

var customPlugin = CXBus.registerPlugin('Custom');


 function getAdvancedConfig() {
    return {
      "form": {
        "autoSubmit": false,
        "firstname": "Cora",
        "lastname": "de Groot",
        "email": "bermisaf@ej.mw",
        "subject": ""
      },
      "formJSON": {
    "wrapper":"<table></table>",
    "inputs":[
        {
            "id":"cx_webchat_form_firstname",
            "name":"firstname",
            "type":"text",
            "maxlength":"100",
            "placeholder":"@i18n:webchat.ChatFormPlaceholderFirstName",
            "label":"@i18n:webchat.ChatFormFirstName",
            "value":"John"
        },
        {
            "id":"cx_webchat_form_lastname",
            "name":"lastname",
            "type":"text",
            "maxlength":"100",
            "placeholder":"@i18n:webchat.ChatFormPlaceholderLastName",
            "label":"@i18n:webchat.ChatFormLastName",
            "value":"Smith"
        },
        {
            "id":"cx_webchat_form_email",
            "name":"email",
            "type":"text",
            "maxlength":"100",
            "placeholder":"@i18n:webchat.ChatFormPlaceholderEmail",
            "label":"Email",
            "value":"john.smith@company.com"
        },
        {
            "id":"cx_webchat_form_phonenumber",
            "name":"phonenumber",
            "type":"text",
            "maxlength":"100",
            "placeholder":"Phone Number",
            "label":"Phone Number",
            "value":"9256328346"
        },
        {
            "id":"cx_webchat_form_enquirytype",
            "name":"enquirytype",
            "type":"select",
            "label":"Enquiry Type",
            "options":[
                {
                    "text":"Account",
                    "group":true
                },
                {
                    "text":"Sales",
                    "value":"Sales",
                    "selected":true
                },
                {
                    "text":"Credit Card",
                    "value":"credit card"
                },
                {
                    "text":"General",
                    "group":true
                },
                {
                    "text":"Warranty",
                    "value":"warranty"
                },
                {
                    "text":"Return policy",
                    "value":"returns"
                }
            ]
        }
    ]
      }
   
    };
  }





