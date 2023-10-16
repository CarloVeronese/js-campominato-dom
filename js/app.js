const gridDOMElement = document.querySelector('.row')

const playDOMElement = document.querySelector('.play-btn')

playDOMElement.addEventListener('click',function(){
    const difficultyLevel = document.getElementById('difficulty-level').value
    emptyGrid()
    const cellsNumber = chooseLevel(difficultyLevel) 
    createGrid(cellsNumber)
    const cellsArray = document.querySelectorAll('.cell')
    const minesArray = (generateArrayRandomNumbers(1, cellsNumber, 16))
    console.log(minesArray)
    let score = 0
    const scoreToWin = cellsNumber - 16
    for(let i = 0; i < cellsArray.length; i++){
        const currentCell = cellsArray[i]
        currentCell.addEventListener('click', function(){
            if(!currentCell.classList.contains('cell-clicked')){
                if(minesArray.includes((i + 1))){
                    clickMine(currentCell, i)
                }
                else clickCell(currentCell, i)
            }
        })        
    }
})

function chooseLevel(num){
    if(num == 1) return 100
    else if (num == 2) return 81
    else if (num == 3) return 49
}

function clickCell(currentCell, cellPosition){
    console.log('You clicked the cell number: ' + (cellPosition + 1))
    currentCell.classList.add('cell-clicked')
}

function clickMine(currentCell, cellPosition){
    console.log('You looooose')
    currentCell.classList.add('mine-clicked')
}

function emptyGrid(){
    gridDOMElement.innerHTML = ''
}

function createGrid(dim){
    for(let i = 0; i < dim; i++){
        const cellElement = `<div class="cell cell-${dim}">${i+1}</div>`
        gridDOMElement.innerHTML += cellElement
    }
}

function generateRandomNumberBetween(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateArrayRandomNumbers(min, max, dim){
    const numbersArray = []
    do{
        const newNumber = generateRandomNumberBetween(min, max)
        if(!numbersArray.includes(newNumber)){
            numbersArray.push(newNumber)
        }
    }while(numbersArray.length < dim)
    return numbersArray
}