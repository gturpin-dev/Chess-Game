// Active le theme au chargement de la page
(function() {
	let theme = localStorage.getItem("theme") || "";
	if (theme !== "") {
		$('body').attr('data-theme', theme)
	}
})();

const ROWS = [ 8, 7, 6, 5, 4, 3, 2, 1]
const COLS = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' ]

/**
 * Nom court des pièces
 */
const EXCERPT_PIECES = {
	'pawn'  : 'p',
	'knight': 'n',
	'bishop': 'b',
	'rook'  : 'r',
	'queen' : 'q',
	'king'  : 'k',
}

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
		let tile = document.createElement('div') // Case
		tile.classList.add('tile')
		tile.setAttribute('data-index', i)
		tile.setAttribute('data-row', getRow(i))
		tile.setAttribute('data-col', getCol(i))
		tile.setAttribute('data-piece', '')
	
		// Ajout des cases sur les lignes impairs
		if (oddLine == true) {
			if (i % 2 == 0) { // les cases pairs sont noires
				tile.classList.add('tile--dark')
			} else {
				tile.classList.add('tile--light')
			}

		// Ajout des cases sur les lignes impairs
		} else {
			if (i % 2 == 0) { // les cases pairs sont blanches
				tile.classList.add('tile--light')
			} else {
				tile.classList.add('tile--dark')
			}
		}
	
		// Ajout de la case
		board.appendChild(tile)
	
		lineChangeCount++

		// Changement de ligne
		if (lineChangeCount > 8) {
			oddLine = !oddLine
			lineChangeCount = 1
		}
	}
}

/// Theme switcher
/// ============================
function changeTheme() {
	let currentTheme = $('body').attr('data-theme')
	let targetTheme = $(this).attr('data-theme')

	if (currentTheme !== targetTheme) {
		$('body').attr('data-theme', targetTheme)
		localStorage.setItem("theme", targetTheme)
	}
}
$(document).on('click', '.theme', changeTheme)


/**
 * Constructeur de pièce
 * @param {*} type Nom de la pièce | {knight, rook, bishop, pawn, queen, king}
 * @param {*} col Colonne dans laquelle se trouve la pièce
 * @param {*} row Ligne dans laquelle se trouve la pièce
 * @param {*} team Couleur de la pièce | {black, white}
 */
function Piece(type, col, row, team) {
	this.getDisplayName = () => {
		return EXCERPT_PIECES[this.type]
	}
	this.getImageName = () => {
		let path = '/assets/images/'
		let img_name = path + this.team.substr(0, 1).toLowerCase() + this.getDisplayName() + '.png'
		return img_name
	}
	this.draw = () => {
		let $tile = $(".tile[data-row=" + this.row + "][data-col=" + this.col + "]")
		$tile.css('backgroundImage', "url('" + this.imageName + "')")
		$tile.css('backgroundSize', '60px')
		$tile.css('backgroundRepeat', 'no-repeat')
		$tile.css('backgroundPosition', 'center center')

		$tile.attr('data-piece', this.id)
	}
	this.type = type
	this.id = this.getDisplayName() + col + row
	this.row = row
	this.col = col
	this.coord = col + row
	this.team = team
	this.imageName = this.getImageName()
	this.pattern = ''
}

function createPieces() {
	/// Create white pawns
	/// ============================
	let pawn_a_2 = new Piece('pawn', 'a', 2, 'white')
	pawn_a_2.draw()
	let pawn_b_2 = new Piece('pawn', 'b', 2, 'white')
	pawn_b_2.draw()
	let pawn_c_2 = new Piece('pawn', 'c', 2, 'white')
	pawn_c_2.draw()
	let pawn_d_2 = new Piece('pawn', 'd', 2, 'white')
	pawn_d_2.draw()
	let pawn_e_2 = new Piece('pawn', 'e', 2, 'white')
	pawn_e_2.draw()
	let pawn_f_2 = new Piece('pawn', 'f', 2, 'white')
	pawn_f_2.draw()
	let pawn_g_2 = new Piece('pawn', 'g', 2, 'white')
	pawn_g_2.draw()
	let pawn_h_2 = new Piece('pawn', 'h', 2, 'white')
	pawn_h_2.draw()

	/// Create Black pawns
	/// ============================
	let pawn_a_7 = new Piece('pawn', 'a', 7, 'black')
	pawn_a_7.draw()
	let pawn_b_7 = new Piece('pawn', 'b', 7, 'black')
	pawn_b_7.draw()
	let pawn_c_7 = new Piece('pawn', 'c', 7, 'black')
	pawn_c_7.draw()
	let pawn_d_7 = new Piece('pawn', 'd', 7, 'black')
	pawn_d_7.draw()
	let pawn_e_7 = new Piece('pawn', 'e', 7, 'black')
	pawn_e_7.draw()
	let pawn_f_7 = new Piece('pawn', 'f', 7, 'black')
	pawn_f_7.draw()
	let pawn_g_7 = new Piece('pawn', 'g', 7, 'black')
	pawn_g_7.draw()
	let pawn_h_7 = new Piece('pawn', 'h', 7, 'black')
	pawn_h_7.draw()

	/// Create White knights
	/// ============================
	let knight_b_1 = new Piece('knight', 'b', 1, 'white')
	knight_b_1.draw()
	let knight_g_1 = new Piece('knight', 'g', 1, 'white')
	knight_g_1.draw()

	/// Create Black knights
	/// ============================
	let knight_b_8 = new Piece('knight', 'b', 8, 'black')
	knight_b_8.draw()
	let knight_g_8 = new Piece('knight', 'g', 8, 'black')
	knight_g_8.draw()

	/// Create White rooks
	/// ============================
	let rook_a_1 = new Piece('rook', 'a', 1, 'white')
	rook_a_1.draw()
	let rook_h_1 = new Piece('rook', 'h', 1, 'white')
	rook_h_1.draw()

	/// Create Black rooks
	/// ============================
	let rook_a_8 = new Piece('rook', 'a', 8, 'black')
	rook_a_8.draw()
	let rook_h_8 = new Piece('rook', 'h', 8, 'black')
	rook_h_8.draw()

	/// Create White bishops
	/// ============================
	let bishop_c_1 = new Piece('bishop', 'c', 1, 'white')
	bishop_c_1.draw()
	let bishop_f_1 = new Piece('bishop', 'f', 1, 'white')
	bishop_f_1.draw()

	/// Create Black bishops
	/// ============================
	let bishop_c_8 = new Piece('bishop', 'c', 8, 'black')
	bishop_c_8.draw()
	let bishop_f_8 = new Piece('bishop', 'f', 8, 'black')
	bishop_f_8.draw()

	/// Create white Queen
	/// ============================
	let queen_d_1 = new Piece('queen', 'd', 1, 'white')
	queen_d_1.draw()

	/// Create white Queen
	/// ============================
	let queen_d_8 = new Piece('queen', 'd', 8, 'black')
	queen_d_8.draw()

	/// Create white King
	/// ============================
	let king_e_1 = new Piece('king', 'e', 1, 'white')
	king_e_1.draw()

	/// Create white King
	/// ============================
	let king_e_8 = new Piece('king', 'e', 8, 'black')
	king_e_8.draw()
}

/// Appels
/// ============================
createBoard()
createPieces()