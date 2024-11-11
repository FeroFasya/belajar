// Dark mode toggle
document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelectorAll('.img-hover img').forEach(img => {
        img.classList.toggle('dark-img');
    });
});

// Form validation
document.getElementById('contactForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (name && email && message) {
        alert('Message sent successfully!');
    } else {
        alert('Please fill out all fields.');
    }
});


// Drawing board setup and variables
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const rect = canvas.getBoundingClientRect();

let drawing = false;
let currentTool = 'pencil';
let color = '#000000';
let lineWidth = 2;
let startX, startY;

// Tool Change
document.getElementById('tool').addEventListener('change', function () {
    currentTool = this.value;
    updateToolSettings();
});

document.getElementById('colorPicker').addEventListener('input', function () {
    color = this.value;
    ctx.strokeStyle = color;
});

document.getElementById('clearCanvas').addEventListener('click', clearCanvas);

// Mouse Event listeners
canvas.addEventListener('mousedown', startDrawing); // Mouse button down
canvas.addEventListener('mousemove', draw); // Mouse move
canvas.addEventListener('mouseup', stopDrawing); // Mouse button up
canvas.addEventListener('mouseleave', stopDrawing); // Mouse leaves canvas

// Touch event listeners (untuk layar sentuh di HP)
canvas.addEventListener('touchstart', startDrawingTouch);
canvas.addEventListener('touchmove', drawTouch);
canvas.addEventListener('touchend', stopDrawingTouch);
canvas.addEventListener('touchcancel', stopDrawingTouch);

// Function untuk update tool (pensil, pulpen, penghapus)
function updateToolSettings() {
    if (currentTool === 'pencil') {
        ctx.lineWidth = 2;
    } else if (currentTool === 'pen') {
        ctx.lineWidth = 4;
    } else if (currentTool === 'eraser') {
        ctx.lineWidth = 10;
        ctx.strokeStyle = '#fff'; // Warna putih untuk penghapus
    } else if (currentTool === 'brush') {
        ctx.lineWidth = 10;  // Kuas, lebih besar
    } else {
        ctx.lineWidth = 2;
    }
}

// Mulai menggambar (Mouse)
function startDrawing(e) {
    e.preventDefault();
    drawing = true;
    ctx.beginPath();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.moveTo(x, y);
    startX = x;
    startY = y;
}

// Menggambar di canvas (Mouse)
function draw(e) {
    if (!drawing) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (currentTool === 'line') {
        clearCanvas();
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(x, y);
        ctx.stroke();
    } else if (currentTool === 'rectangle') {
        clearCanvas();
        ctx.beginPath();
        ctx.rect(startX, startY, x - startX, y - startY);
        ctx.stroke();
    } else if (currentTool === 'circle') {
        clearCanvas();
        ctx.beginPath();
        const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.stroke();
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

// Menghentikan menggambar (Mouse)
function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}

// Menggambar pada layar sentuh (HP)
function startDrawingTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    drawing = true;
    ctx.beginPath();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    ctx.moveTo(x, y);
    startX = x;
    startY = y;
}

function drawTouch(e) {
    if (!drawing) return;
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    if (currentTool === 'line') {
        clearCanvas();
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(x, y);
        ctx.stroke();
    } else if (currentTool === 'rectangle') {
        clearCanvas();
        ctx.beginPath();
        ctx.rect(startX, startY, x - startX, y - startY);
        ctx.stroke();
    } else if (currentTool === 'circle') {
        clearCanvas();
        ctx.beginPath();
        const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.stroke();
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function stopDrawingTouch() {
    drawing = false;
    ctx.beginPath();
}

// Membersihkan canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
