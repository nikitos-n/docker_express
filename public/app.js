document.querySelectorAll(".price").forEach(node => {
    node.textContent = new Intl.NumberFormat('by-By', {
        style: "currency",
        currency: "BYN"
    }).format(node.textContent)
})