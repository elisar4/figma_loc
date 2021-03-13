window.onmessage = async event => {
    const message = event.data.pluginMessage
    const out = window.document.getElementById("out")
    out.textContent = message.debug
    console.log(message)
}