const ROWS = [ 8, 7, 6, 5, 4, 3, 2, 1]
const COLS = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' ]

/**
 * Renvoie la Ligne correspondante à l'index de la case
 * @param {int} index Index de la case
 * @returns {int}
 */
function getRow(index) {
	return ROWS[(Math.ceil(index / ROWS.length)) - 1]
}

/**
 * Renvoie la Colonne correspondante à l'index de la case
 * @param {int} index Index de la case
 * @returns {int}
 */
function getCol(index) {
	let col
	
	if ((index % COLS.length) == 0) {
		col = COLS[COLS.length - 1]
	} else {
		col = COLS[(index % COLS.length) - 1]
	}
	return col
}

/**
 * Renvoie le charactère suivant
 * @param string c charactère actuel
 * @returns string
 */
function nextCharacter(c) {
	return String.fromCharCode(c.charCodeAt(0) + 1)
}

/**
 * Crée le board avec ses cases
 */
function createBoard() {
	let board = document.querySelector('.board__inner')
	let oddLine = true // Lignes Impairs | 1,3,5,7
	let lineChangeCount = 1 // compteur de changement de ligne
	
	for (let i = 1; i <= 64; i++) {
		let box = document.createElement('div') // Case
		box.classList.add('box')
		box.setAttribute('data-index', i)
		box.setAttribute('data-row', getRow(i))
		box.setAttribute('data-col', getCol(i))
	
		// Ajout des cases sur les lignes impairs
		if (oddLine == true) {
			if (i % 2 == 0) { // les cases pairs sont noires
				box.classList.add('box--black')
			} else {
				box.classList.add('box--white')
			}

		// Ajout des cases sur les lignes impairs
		} else {
			if (i % 2 == 0) { // les cases pairs sont blanches
				box.classList.add('box--white')
			} else {
				box.classList.add('box--black')
			}
		}
	
		// Ajout de la case
		board.appendChild(box)
	
		lineChangeCount++

		// Changement de ligne
		if (lineChangeCount > 8) {
			oddLine = !oddLine
			lineChangeCount = 1
		}
	}
}

createBoard()