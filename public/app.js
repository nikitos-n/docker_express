document.querySelectorAll(".price").forEach(node => {
    console.log(node)
    node.textContent = new Intl.NumberFormat('by-By', {
        currency: "BYN",
        style: "currency"
    }).format(node.textContent)
})