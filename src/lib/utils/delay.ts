function delay(t = 0) {
    return new Promise((resolve) => setTimeout(resolve, t))
}

export default delay
