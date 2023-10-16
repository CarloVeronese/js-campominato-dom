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
    const scoreBoardDOMElement = document.querySelector('.score-board')
    scoreBoardDOMElement.classList.add('display')
    const scoreDOMElement = document.getElementById('score')
    for(let i = 0; i < cellsArray.length; i++){
        const currentCell = cellsArray[i]
        currentCell.addEventListener('click', function(){
            if(!currentCell.classList.contains('cell-clicked')){
                if(minesArray.includes((i + 1))){
                    clickMine(currentCell, i)
                    gameOver(false)
                    showMines(cellsArray, minesArray)
                }
                else{ 
                    score ++
                    scoreDOMElement.innerHTML = score
                    clickCell(currentCell, i)
                    console.log('Current score: ' + score)
                    if(score == scoreToWin) gameOver(true)
                }
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

function clickMine(currentCell){
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

function gameOver(result){
    if(result) console.log('you win!')
    else console.log('you lose!')
}

function showMines(cellsArray, minesArray){
    for(let i = 0; i < minesArray.length; i++){
        currentMinePosition = minesArray[i]
        if(!cellsArray[currentMinePosition - 1].classList.contains('mine-clicked')){
            cellsArray[currentMinePosition - 1].classList.add('mine-clicked')
        }
    }
}