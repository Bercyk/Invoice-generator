const lightModeEl = document.getElementById("light-mode-el")
const themeLink = document.getElementById("theme-link")
const washCarBtnEl = document.getElementById("wash-car-btn")
const mowLawnBtnEl = document.getElementById("mow-lawn-btn")
const pullWeedsBtnEl = document.getElementById("pull-weeds-btn")
const sendBtn = document.getElementById("send-btn")

const taskListEl = document.getElementById("task-list-el")
const taskPriceEl = document.getElementById("task-price-el")
const totalAmountEl = document.getElementById("total-amount-el")

let services = []

let isWashCarOnList = false
let isMowLawnOnList = false
let isPullWeedsOnList = false

lightModeEl.addEventListener("click",function(){
    if(themeLink.getAttribute("href") === "style/dark-theme.css"){
        themeLink.href = "style/light-theme.css"
    }
    else{
        themeLink.href = "style/dark-theme.css"
    }
})

washCarBtnEl.addEventListener("click", function() {

    if(!isWashCarOnList) {
        let washCar = createService()
        washCar.service.innerText = "Wash Car"
        washCar.deleteService.id = "wash-car-el"
        washCar.price.innerText = 10
        services.push(washCar)       
        renderServices()
        isWashCarOnList = true
    }
})
//TODO: dasdasdsa

mowLawnBtnEl.addEventListener("click", function() {

    if(!isMowLawnOnList) {
        let mowLawn = createService()
        mowLawn.service.innerText = "Mow Lawn"
        mowLawn.deleteService.id = "mow-lawn-el"
        mowLawn.price.innerText = 20
        services.push(mowLawn)       
        renderServices()
        isMowLawnOnList = true
    }
})

pullWeedsBtnEl.addEventListener("click", function() {

    if(!isPullWeedsOnList) {
        let pullWeeds = createService()
        pullWeeds.service.innerText = "Pull Weeds"
        pullWeeds.deleteService.id = "pull-weeds-el"
        pullWeeds.price.innerText = 30
        services.push(pullWeeds)       
        renderServices()
        isPullWeedsOnList = true
    }
})

function renderServices() {

    taskListEl.textContent = ""
    taskPriceEl.textContent = ""
    if(services){
        for(let i = 0; i < services.length; i++) {
            let renderService = services[i].service
            let renderRemove = services[i].deleteService
            let renderPriceDiv = services[i].priceEl
            let renderTextHighlight = services[i].textHighlight
            let renderPrice = services[i].price

            renderService.append(renderRemove)
            taskListEl.append(renderService)
            renderPriceDiv.append(renderTextHighlight)
            renderPriceDiv.append(renderPrice)
            taskPriceEl.append(renderPriceDiv)
        }
        totalAmountEl.innerText = `$${totalCost()}`
    }    
}

function createService() {
    let serviceElement = {
        service: document.createElement("div"),
        deleteService: document.createElement("span"),
        priceEl: document.createElement("div"),
        textHighlight: document.createElement("span"),
        price: document.createElement("div")
    }

    serviceElement.service.className = "item"
    serviceElement.deleteService.className = "remove"
    serviceElement.deleteService.innerText = "Remove"
    serviceElement.deleteService.setAttribute("onclick", "deleteService(this)")
    serviceElement.priceEl.className = "item price"
    serviceElement.textHighlight.className = "gray-text"
    serviceElement.textHighlight.innerText = "$"
    serviceElement.price.className = "value"

    return serviceElement
}

sendBtn.addEventListener("click", function(){
    services.length = 0;
    renderServices()
    resetFlags()
})

function resetFlags() {
    isPullWeedsOnList = false
    isMowLawnOnList = false
    isWashCarOnList = false
}

function totalCost() {
    let sum = 0
    for(let i = 0; i < services.length; i++){
        sum += parseInt(services[i].price.innerText)
    }
    return sum
}

function deleteService(removeId) {

    let removeIndex = null;

    switch(removeId.id){
        case "wash-car-el":
            removeIndex = services.findIndex(e => e.deleteService.id === removeId.id);
            services.splice(removeIndex,1)
            renderServices()
            isWashCarOnList = false 
            break

        case "mow-lawn-el":
            removeIndex = services.findIndex(e => e.deleteService.id === removeId.id);
            services.splice(removeIndex,1)
            renderServices()
            isMowLawnOnList = false 
            break

        case "pull-weeds-el":
            removeIndex = services.findIndex(e => e.deleteService.id === removeId.id);
            services.splice(removeIndex,1)
            renderServices()
            isPullWeedsOnList = false
            break
    }
}
