const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

let width, height, nodes, connections;

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initNodes();
}

function initNodes() {
    const nodeCount = Math.floor(width * height / 10000);
    nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25
    }));
    connections = [];
}

function drawNodes() {
    ctx.fillStyle = 'rgba(0, 100, 200, 0.5)';
    nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();
    });
}

function updateNodes() {
    nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
    });
}

function drawConnections() {
    ctx.strokeStyle = 'rgba(0, 100, 200, 0.1)';
    connections.forEach(conn => {
        ctx.beginPath();
        ctx.moveTo(conn.a.x, conn.a.y);
        ctx.lineTo(conn.b.x, conn.b.y);
        ctx.stroke();
    });
}

function updateConnections() {
    connections = [];
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                connections.push({ a: nodes[i], b: nodes[j] });
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    updateNodes();
    updateConnections();
    drawConnections();
    drawNodes();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animate();
