window._genesys || (window._genesys = {}), window._genesys.widgets || (window._genesys.widgets = {}), window._genesys.widgets.extensions || (window._genesys.widgets.extensions = {});
var Common = window._genesys.widgets.Common;
function CreateRichMessageElement(e, t, s) {
    if (!s.type) throw "Missing Message Type";
    switch (s.type) {
        case "Structured":
            if (!s.contentType) throw "Missing Message Content Type";
            if ((s.content || (s.content = []), !Array.isArray(s.content))) throw "Expected Array for Message Content";
            if (s.content.length < 1) return;
            switch (s.contentType) {
                case "quick-replies": {
                    let n = CreateQuickRepliesElement(e, t, s);
                    return AppendChild("cx-chat-index-" + t, n), AppendReaderTranscript(n), (Transcript().scrollTop = 99999999), s.text;
                }
                case "generic": {
                    let n = s.content.length > 1 ? CreateCarouselElement(e, t, s, CreateGenericTemplateElement) : CreateGenericTemplateElement(e, t, s.content[0]);
                    return AppendChild("cx-chat-index-" + t, n, { richMessage: !0, removeText: !0, moveTime: !0 }), AppendReaderTranscript(n), (Transcript().scrollTop = 99999999), "ã€€";
                }
                case "list-vertical": {
                    let n = s.content.length > 1 ? CreateCarouselElement(e, t, s, CreateListVerticalTemplateElement) : CreateListVerticalTemplateElement(e, t, s.content[0]);
                    return AppendChild("cx-chat-index-" + t, n, { richMessage: !0, removeText: !0, moveTime: !0 }), AppendReaderTranscript(n), (Transcript().scrollTop = 99999999), "ã€€";
                }
                case "single-selection-list": {
                    let n = s.content.length > 1 ? CreateCarouselElement(e, t, s, CreateSingleSelectionListTemplateElement) : CreateSingleSelectionListTemplateElement(e, t, s.content[0]);
                    return AppendChild("cx-chat-index-" + t, n, { richMessage: !0, removeText: !0, moveTime: !0 }), AppendReaderTranscript(n), (Transcript().scrollTop = 99999999), "ã€€";
                }
                default:
                    throw "Unsupported Message Content Type: " + s.contentType;
            }
            break;
        default:
            throw "Unsupported Message type: " + s.type;
    }
}
function CreateQuickRepliesElement(e, t, s) {
    Log(`Message: ${t}, Creating Quick Replies`);
    let n = CreateElement({ type: "div", classes: "cx-quick-replies cx-rich-media" });
    return (
        s.content
            .sort((e, t) => e.id - t.id)
            .forEach((s) => {
                switch (s.type) {
                    case "quick-reply": {
                        Log(`Message: ${t}, Adding Quick Reply id ${s.id} ${s.action} action`);
                        let i = CreateElement({
                            type: "div",
                            classes: "cx-quick-reply cx-component",
                            attributes: { rmid: s.id, "reply-text": s.text, "style-group": "1", actions: "" },
                            parent: n,
                            onclick: async function (t) {
                                return await QuickReplySubmit(t, e);
                            },
                        });
                        switch (s.action) {
                            case "message":
                                CreateElement({ type: "div", attributes: { "style-group": "2" }, text: s.text, parent: i });
                                break;
                            default:
                                console.warn(`Message: ${t}, Unsupported action: ${s.action}, ignoring`);
                        }
                        break;
                    }
                    default:
                        console.warn(`Message: ${t}, Unsupported content type: ${s.type}, ignoring`);
                }
            }),
        n
    );
}
async function QuickReplySubmit(e, t) {
    let s = (e = e || window.event).target.parentElement,
        n = s.parentElement,
        i = n.parentElement;
    try {
        await t.command("WebChatService.sendMessage", { parentMessageId: i.id.split("-").pop(), message: s.getAttribute("reply-text") });
    } catch (e) {
        console.error("Failed to Send Message", e);
    }
    n.remove(), (Transcript().scrollTop = 99999999);
}
function CreateCarouselElement(e, t, s, n) {
    Log(`Message: ${t}, Creating Carousel`);
    let i = CreateElement({ type: "div", classes: "cx-carousel", attributes: { "arial-label": "carousel" } }),
        a = CreateElement({ type: "div", classes: "cx-carousel-container", parent: i });
    return (
        s.content.forEach((i, r) => {
            CreateElement({
                type: "div",
                classes: `cx-slide ${0 === r ? "active" : ""} ${1 === r ? "next" : ""}`,
                attributes: { id: `cx-slide-${t}-${r}`, role: "region", "aria-label": `slide ${r + 1} out of ${s.content.length}` },
                parent: a,
                children: [n(e, t, i)],
            });
        }),
        CreateElement({ type: "div", styles: { clear: "both" }, parent: i }),
        CreateElement({
            type: "button",
            classes: "cx-next",
            attributes: { id: "cx-next-" + t, title: "Next", "arial-label": "Next", slides: a.id },
            styles: { display: DisplayAttribute(s.content.length > 1) },
            parent: i,
            onclick: CarouselNextSlide,
        }),
        CreateElement({
            type: "button",
            classes: "cx-previous",
            attributes: { id: "cx-previous-" + t, title: "Previous", "arial-label": "Previous", slides: a.id },
            styles: { display: DisplayAttribute(!1) },
            parent: i,
            onclick: CarouselPreviousSlide,
        }),
        i
    );
}
function CarouselNextSlide(e) {
    let t = (e = e || window.event).target.parentElement,
        s = e.target,
        n = t.querySelector(".cx-previous"),
        i = [...t.querySelector(".cx-carousel-container").children].find((e) => e.classList.contains("active"));
    i &&
        (i.previousElementSibling && i.previousElementSibling.classList.remove("prev"),
        i.nextElementSibling &&
            (i.classList.add("prev"),
            i.classList.remove("active", "next", "cx-animate-next", "cx-animate-prev"),
            i.setAttribute("tabindex", ""),
            i.nextElementSibling.classList.add("active", "cx-animate-next"),
            i.nextElementSibling.classList.remove("next"),
            i.nextElementSibling.setAttribute("tabindex", "0"),
            i.nextElementSibling.focus(),
            i.nextElementSibling.nextElementSibling ? i.nextElementSibling.nextElementSibling.classList.add("next") : (s.style.display = "none"),
            (n.style.display = "block")));
}
function CarouselPreviousSlide(e) {
    let t = (e = e || window.event).target.parentElement,
        s = t.querySelector(".cx-next"),
        n = e.target,
        i = [...t.querySelector(".cx-carousel-container").children].find((e) => e.classList.contains("active"));
    i &&
        (i.nextElementSibling && i.nextElementSibling.classList.remove("next"),
        i.previousElementSibling &&
            (i.classList.remove("active", "prev", "cx-animate-prev", "cx-animate-next"),
            i.classList.add("next"),
            i.setAttribute("tabindex", ""),
            i.previousElementSibling.classList.add("active", "cx-animate-prev"),
            i.previousElementSibling.classList.remove("prev"),
            i.previousElementSibling.setAttribute("tabindex", "0"),
            i.previousElementSibling.focus(),
            i.previousElementSibling.previousElementSibling ? i.previousElementSibling.previousElementSibling.classList.add("prev") : (n.style.display = "none"),
            (s.style.display = "block")));
}
function CreateGenericTemplateElement(e, t, s) {
    if (((s.components = s.components || []), (s.actions = Object.assign({ url: "javascript:;", urlTarget: "_blank" }, s.actions)), !Array.isArray(s.components))) throw `Message ${t}: Expected Array for Content's components`;
    Log(`Message: ${t}, Creating Generic Template`);
    let n = CreateElement({ type: "div", classes: "cx-rich-media" }),
        i = CreateElement({ type: "div", classes: "cx-structure cx-generic cx-media cx-var-4", attributes: { rmid: s.id, "style-group": "1" }, parent: n }),
        a = CreateElement({
            type: "div",
            classes: "cx-top-hald",
            attributes: { "style-group": "1" },
            parent: i,
            children: [
                CreateElement({
                    type: "div",
                    classes: "cx-cta-link",
                    attributes: { name: "image", rmid: "", href: s.actions.url, target: s.actions.urlTarget, actions: "" },
                    children: [
                        CreateElement({ type: "img", classes: "cx-main-image", attributes: { src: s.image }, styles: { display: DisplayAttribute(s.image && !s.video) } }),
                        CreateElement({ type: "video", attributes: { src: s.video, poster: s.image, controls: !0 }, styles: { display: DisplayAttribute(s.video) } }),
                    ],
                }),
            ],
        }),
        r = CreateElement({
            type: "div",
            attributes: { "style-group": "1" },
            parent: a,
            children: [
                CreateElement({
                    type: "div",
                    classes: "cx-cta-link",
                    attributes: { name: "title", rmid: "", href: "javascript:;", target: "_blank", actions: "" },
                    children: [
                        CreateElement({ type: "h1", attributes: { "style-group": "3" }, styles: { display: DisplayAttribute(s.title) }, text: s.title }),
                        CreateElement({
                            type: "div",
                            classes: "cx-cta-link",
                            attributes: { name: "desc", href: "javascript:;", target: "_blank" },
                            children: [CreateElement({ type: "h2", classes: "cx-markdown", attributes: { "style-group": "3" }, styles: { display: DisplayAttribute(s.desc) }, text: `<p>${s.desc || ""}</p>` })],
                        }),
                        CreateElement({ type: "div", classes: "cx-spacer", styles: { display: DisplayAttribute(!1) } }),
                    ],
                }),
            ],
        }),
        l = CreateElement({ type: "div", classes: "cx-components", styles: { display: DisplayAttribute(s.components.length > 0) }, parent: r });
    return (
        s.components
            .sort((e, t) => e.id - t.id)
            .forEach((s, n) => {
                switch ((Log(`Message ${t}: Adding Component ${n}`, s), s.type)) {
                    case "button":
                        (s.actions = Object.assign({ url: "javascript:;", urlTarget: "_blank" }, s.actions)),
                            CreateElement({
                                type: "div",
                                classes: "cx-component cx-cta-link cx-clickable",
                                attributes: { name: "button", rmid: n, href: s.actions.url, target: s.actions.urlTarget, actions: "" },
                                parent: l,
                                children: [
                                    CreateElement({
                                        type: "button",
                                        classes: "cx-button cx-clickable",
                                        attributes: { name: "button", rmid: s.id, title: s.title, "style-group": "1", actions: "" },
                                        text: s.text,
                                        onclick: async function (n) {
                                             
                                            return await ActionsExecute(n, e, t, s.actions);
                                        },
                                    }),
                                ],
                            });
                        break;
                    default:
                        console.warn(`Message ${t}: Unsupported Component Type: ${s.type}, ignored`);
                }
            }),
        n
    );
}
function CreateListVerticalTemplateElement(e, t, s) {
    if (((s.components = s.components || []), !Array.isArray(s.components))) throw `Message ${t}: Expected Array for Content's components`;
    Log(`Message: ${t}, Creating List Vertical Template`);
    let n = CreateElement({ type: "div", classes: "cx-rich-media" }),
        i = CreateElement({
            type: "div",
            classes: "cx-structure cx-list",
            attributes: { rmid: s.id, "style-group": "1" },
            parent: n,
            children: [
                CreateElement({ type: "h1", attributes: { "style-group": "3" }, styles: { display: DisplayAttribute(s.title) }, text: s.title }),
                CreateElement({ type: "h2", classes: "cx-markdown", attributes: { "style-group": "3" }, styles: { display: DisplayAttribute(s.desc) }, text: `<p>${s.desc || ""}</p>` }),
            ],
        }),
        a = CreateElement({ type: "div", classes: "cx-components", styles: { display: DisplayAttribute(s.components.length > 0) }, parent: i });
    return (
        s.components
            .sort((e, t) => e.id - t.id)
            .forEach((s, n) => {
                switch ((Log(`Message ${t}: Adding Component ${n}`, s), s.type)) {
                    case "list-item":
                        (s.actions = Object.assign({ url: "javascript:;", urlTarget: "_blank" }, s.actions)),
                            CreateElement({
                                type: "div",
                                classes: "cx-list-item cx-cta-link cx-component cx-clickable",
                                attributes: { id: `rm-list-item-${t}-${s.id}`, name: "button", rmid: s.id, href: s.actions.url, target: s.actions.urlTarget, "style-group": "2", actions: "" },
                                onclick: async function (n) {
                                    return await ActionsExecute(n, e, t, s.actions);
                                },
                                parent: a,
                                children: [
                                    CreateElement({ type: "div", classes: "cx-media cx-cta-link", children: [CreateElement({ type: "img", attributes: { src: s.image }, styles: { display: DisplayAttribute(s.image) } })] }),
                                    CreateElement({
                                        type: "div",
                                        classes: "cx-text cx-cta-link",
                                        styles: { display: DisplayAttribute(!0) },
                                        children: [
                                            CreateElement({ type: "h3", attributes: { "style-group": "3" }, styles: { display: DisplayAttribute(s.title) }, text: s.title }),
                                            CreateElement({ type: "p", classes: "cx-markdown", attributes: { "style-group": "3" }, styles: { display: DisplayAttribute(s.desc) }, text: `<p>${s.desc || ""}</p>` }),
                                        ],
                                    }),
                                ],
                            });
                        break;
                    default:
                        console.warn(`Message ${t}: Unsupported Component Type: ${s.type}, ignored`);
                }
            }),
        n
    );
}
function CreateSingleSelectionListTemplateElement(e, t, s) {
    if (((s.components = s.components || []), !Array.isArray(s.components))) throw `Message ${t}: Expected Array for Content's components`;
    Log(`Message: ${t}, Creating List Vertical Template`);
    let n = CreateElement({ type: "div", classes: "cx-rich-media" }),
        i = CreateElement({
            type: "div",
            classes: "cx-structure cx-list cx-single-select",
            attributes: { rmid: s.id, "style-group": "1" },
            parent: n,
            children: [
                CreateElement({ type: "h1", attributes: { "style-group": "3" }, styles: { display: DisplayAttribute(s.title) }, text: s.title }),
                CreateElement({ type: "h2", classes: "cx-markdown", attributes: { "style-group": "3" }, styles: { display: DisplayAttribute(s.desc) }, text: `<p>${s.desc || ""}</p>` }),
            ],
        }),
        a = CreateElement({ type: "div", classes: "cx-components", styles: { display: DisplayAttribute(s.components.length > 0) }, parent: i });
    return (
        s.components
            .sort((e, t) => e.id - t.id)
            .forEach((n, i) => {
                switch ((Log(`Message ${t}: Adding Component ${i}`, n), n.type)) {
                    case "list-item":
                        (n.actions = Object.assign({ url: "javascript:;", urlTarget: "_blank" }, n.actions)),
                            CreateElement({
                                type: "div",
                                classes: "cx-list-item cx-cta-link cx-component cx-clickable",
                                attributes: { id: `rm-list-item-${t}-${n.id}`, name: "button", rmid: n.id, href: n.actions.url, target: n.actions.urlTarget, "style-group": "2", actions: "" },
                                onclick: async function (s) {
                                    return await ActionsExecute(s, e, t, n.actions);
                                },
                                parent: a,
                                children: [
                                    CreateElement({
                                        type: "div",
                                        classes: "cx-selectors",
                                        children: [
                                            CreateElement({
                                                type: "label",
                                                attributes: { htmlFor: `cx-checkbox-${t}-${s.id}-${n.id}` },
                                                children: [CreateElement({ type: "input", attributes: { type: "checkbox", id: `cx-checkbox-${t}-${s.id}-${n.id}` } })],
                                            }),
                                            CreateElement({
                                                type: "label",
                                                attributes: { htmlFor: `cx-radio-${t}-${s.id}-${n.id}` },
                                                children: [CreateElement({ type: "input", attributes: { type: "radio", id: `cx-radio-${t}-${s.id}-${n.id}` } })],
                                            }),
                                        ],
                                    }),
                                    CreateElement({ type: "div", classes: "cx-media cx-cta-link", children: [CreateElement({ type: "img", attributes: { src: n.image }, styles: { display: DisplayAttribute(n.image) } })] }),
                                    CreateElement({
                                        type: "div",
                                        classes: "cx-text cx-cta-link",
                                        styles: { display: DisplayAttribute(!0) },
                                        children: [
                                            CreateElement({ type: "h3", attributes: { "style-group": "3" }, styles: { display: DisplayAttribute(n.title) }, text: n.title }),
                                            CreateElement({ type: "p", classes: "cx-markdown", attributes: { "style-group": "3" }, styles: { display: DisplayAttribute(n.desc) }, text: `<p>${n.desc || ""}</p>` }),
                                        ],
                                    }),
                                ],
                            });
                        break;
                    default:
                        console.warn(`Message ${t}: Unsupported Component Type: ${n.type}, ignored`);
                }
            }),
        CreateElement({
            type: "button",
            classes: "cx-button cx-submit",
            attributes: { name: "button", title: s.submitLabel, rmid: s.id, "style-group": "1", href: "javascript:;", target: "_blank", actions: "", "arial-label": s.arialSubmitLabel },
            styles: { display: DisplayAttribute(!1) },
            parent: i,
            onclick: async function (n) {
                return await ActionsExecute(n, e, t, s.actions);
            },
        }),
        n
    );
}
async function ActionsExecute(e, t, s, n) {
    
    try {
        if ((Log("Actions Submit", n), n.textback))
            try {
                // await t.command("WebChatService.sendMessage", { parentMessageId: s, message: n.textback });
            } catch (e) {
                console.error("Failed to send message", e);
            }
        if (n.commandName)
            try {
                // await t.command(n.commandName, n.commandOptions || {});
            } catch (e) {
                console.error("Failed to execute command " + n.commandName, e);
            }
        n.url && "javascript:;" != n.url && (n.urlTarget && "_self" !== n.urlTarget ? window.open(n.url, n.urlTarget) : (window.location.href = n.url));
    } catch (e) {
        console.error("Failed to Parse Actions", value, e);
    }
}
function DisplayAttribute(e) {
    return e ? "block" : "none";
}
function CreateElement({ type: e, classes: t = "", text: s = "", attributes: n = {}, styles: i = {}, onclick: a = null, parent: r = null, children: l = [] }) {
    let c = document.createElement(e);
    for (var o in (t && (c.className = t), n)) Object.prototype.hasOwnProperty.call(n, o) && c.setAttribute(o, n[o]);
    for (var p in i) Object.prototype.hasOwnProperty.call(i, p) && (c.style[p] = i[p]);
    return s && (c.innerHTML = s), a && (c.onclick = a), r && r.appendChild(c), l.forEach((e) => c.appendChild(e)), c;
}
function AppendChild(e, t, s = {}) {
    setTimeout(function () {
        let n = document.getElementById(e),
            i = n.querySelector(".cx-time") || document.CreateElement("div");
        if ((s.richMessage && n.classList.add("cx-rich-message"), (t.style.display = "none"), s.removeText)) {
            Log("Removing text");
            let e = n.querySelector(".cx-avatar") || decodeURIComponent.CreateElement("div"),
                t = n.querySelector(".cx-name") || decodeURIComponent.CreateElement("div");
            Log("Moving Avatar ", e, " and name", t),
                n.querySelector(".cx-avatar-wrapper").remove(),
                n.querySelector(".cx-bubble").remove(),
                n.querySelector(".cx-bubble-arrow").remove(),
                n.appendChild(e),
                n.appendChild(t),
                (t.style.width = "unset"),
                (t.style.padding = "2px 0px 0px 6px");
        }
        s.moveTime ? (i.remove(), n.appendChild(t), n.appendChild(i)) : n.appendChild(t), (t.style.display = "block"), (Transcript().scrollTop = 99999999);
    }, 50);
}
function Transcript() {
    let e = document.getElementsByClassName("cx-transcript");
    return e.length > 0 ? e[0] : CreateElement("div", "cx-transcript");
}
function AppendTranscript(e) {
    document.querySelector(".cx-webchat .cx-transcript") && readerTranscript.append(celement);
}
function AppendReaderTranscript(e) {
    let t = document.querySelector(".cx-webchat .cx-common-screen-reader.cx-screen-reader-transcript");
    t && t.appendChild(e.cloneNode(!0));
}
function Log(...e) {
   // console.log("%cRichMessage", "color:#6495ed; font-weight:bold;", ...e);
}
function Error(...e) {
    console.error(...e);
}
window._genesys.widgets.extensions.RichMessage = function (e, t, s) {
    var n = t.registerPlugin("RichMessage");
    n.registerCommand("version", function (e) {
        return Log("Version: 1.0.2"), e.deferred.resolve("1.0.2");
    }),
        n.command("WebChatService.registerPreProcessor", {
            preprocessor: (e) => {
                if ((Log("Analyzing: ", e), s ? s.log("Via Common... Analyzing ", e) : Log("Common Log is not available"), "Message" === e.type)) {
                    if (!e.text) return e;
                    let t = e.text.trim();
                    if ((t.startsWith("![{") && (t = t.substring(2, t.lastIndexOf("]("))), t.startsWith("{"))) {
                        Array.from(document.querySelectorAll(".cx-message.cx-agent-typing.cx-them")).forEach((e) => e.remove()), Array.from(document.querySelectorAll(".cx-quick-replies")).forEach((e) => e.remove());
                        try {
                            let s = JSON.parse(t);
                            Log("Found Rich Message: ", s), (e.text = CreateRichMessageElement(n, e.index, s));
                        } catch (s) {
                            return Error("Invalid JSON: ", t, "Error: ", s), e;
                        }
                    }
                }
            },
        }),
        n.republish("ready"),
        n.ready();
};
