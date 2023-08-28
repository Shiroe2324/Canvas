/**
 * @type {HTMLCanvasElement} 
 */
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");  // Contexto de dibujo 2D del canvas

// Propiedades del cuadrado
const squareSize = 50;
let x = canvas.width / 2 - squareSize / 2;  // Posición inicial horizontal del cuadrado
let y = canvas.height / 2 - squareSize / 2;  // Posición inicial vertical del cuadrado
let dx = 2;  // Cambio horizontal por fotograma
let dy = 2;  // Cambio vertical por fotograma

// Contadores de rebotes
let leftRebounds = 0;
let rightRebounds = 0;
let topRebounds = 0;
let bottomRebounds = 0;

// Dibuja el cuadrado y muestra los rebotes
function drawSquare() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Limpia el canvas
    ctx.beginPath();
    ctx.rect(x, y, squareSize, squareSize);  // Dibuja el cuadrado
    ctx.fillStyle = "#0095DD";  // Color del cuadrado
    ctx.fill();  // Rellena el cuadrado con el color
    ctx.closePath();
    displayRebounds();  // Muestra los contadores de rebotes
}

// Actualiza la posición del cuadrado y verifica colisiones con los bordes
function updatePosition() {
    x += dx;  // Actualiza posición horizontal
    y += dy;  // Actualiza posición vertical

    // Rebotar en las paredes horizontales
    if (x + squareSize > canvas.width || x < 0) {
        dx = -dx;
        if (x < 0) leftRebounds++;  // Si rebota en la pared izquierda
        else rightRebounds++;       // Si rebota en la pared derecha
    }

    // Rebotar en las paredes verticales
    if (y + squareSize > canvas.height || y < 0) {
        dy = -dy;
        if (y < 0) topRebounds++;   // Si rebota en la parte superior
        else bottomRebounds++;      // Si rebota en la parte inferior
    }
}

// Muestra los contadores de rebotes en el canvas
function displayRebounds() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#333";
    ctx.fillText("Rebotes izquierda: " + leftRebounds, 10, 20);
    ctx.fillText("Rebotes derecha: " + rightRebounds, 10, 40);
    ctx.fillText("Rebotes arriba: " + topRebounds, 10, 60);
    ctx.fillText("Rebotes abajo: " + bottomRebounds, 10, 80);
}

// Actualiza los contadores de velocidad en la página
function updateSpeedCounters() {
    const horizontalSpeedElem = document.getElementById("horizontalSpeed");
    const verticalSpeedElem = document.getElementById("verticalSpeed");

    horizontalSpeedElem.textContent = "Velocidad horizontal: " + Math.abs(dx);
    verticalSpeedElem.textContent = "Velocidad vertical: " + Math.abs(dy);
}

// Función principal del juego
function gameLoop() {
    drawSquare();  // Dibuja el cuadrado
    updatePosition();  // Actualiza la posición del cuadrado
    updateSpeedCounters();  // Actualiza los contadores de velocidad
    requestAnimationFrame(gameLoop); // Solicita el siguiente fotograma
}

gameLoop(); // Comienza el bucle del juego

// Funciones para controlar la velocidad horizontal del cuadrado
function increaseHorizontalSpeed() {
    if (dx < 0) {
        dx--;
    } else {
        dx++;
    }
}

function decreaseHorizontalSpeed() {
    if (dx !== 0 && dx < 0) {
        dx++;
    } else if (dx !== 0) {
        dx--;
    }
}

// Funciones para controlar la velocidad vertical del cuadrado
function increaseVerticalSpeed() {
    if (dy < 0) {
        dy--;
    } else {
        dy++;
    }
}

function decreaseVerticalSpeed() {
    if (dy !== 0 && dy < 0) {
        dy++;
    } else if (dy !== 0) {
        dy--;
    }
}
