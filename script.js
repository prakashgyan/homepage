/* --- CONFIGURATION --- */
const languages = [
    "Welcome", "Willkommen", "ようこそ", "Hello World", 
    "print('Hi')", "console.log('Hey')", "Salut", "Hola",
    "Namaste", "Nǐ Hǎo", "Ciao", "Olá", "Zdravstvuyte", 
    "Salaam", "Annyeonghaseyo", "Hej", "Guten Tag", "Merhaba"
];

/* --- TYPEWRITER EFFECT --- */
const welcomeText = document.getElementById('welcome-text');
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function typeWriterLoop() {
    let i = 0;
    while (true) {
        let word = languages[i % languages.length];
        
        // Typing
        for (let j = 0; j <= word.length; j++) {
            welcomeText.innerText = word.substring(0, j);
            await sleep(150); // Typing speed
        }
        
        await sleep(2000); // Wait after typing

        // Deleting
        for (let j = word.length; j >= 0; j--) {
            welcomeText.innerText = word.substring(0, j);
            await sleep(100); // Deleting speed
        }
        
        await sleep(500);
        i++;
    }
}
// Start the typewriter
typeWriterLoop();


/* --- NEURAL NETWORK & VISUALIZATION --- */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
const body = document.body;

let width, height;
let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

// Structure: 3 Input (R,G,B) -> 4 Hidden -> 1 Output (Score)
class MicroNet {
    constructor() {
        // ---- hidden layer (4 neurons) ----
        this.weights1 = [
            [0.2126, 0.7152, 0.0722], // luminance
            [1.0, 0.0, 0.0],          // R passthrough
            [0.0, 1.0, 0.0],          // G passthrough
            [0.0, 0.0, 1.0]           // B passthrough
        ];
        this.biases1 = [0, 0, 0, 0];

        // ---- output layer (1 neuron) ----
        this.weights2 = [4.0, 0.0, 0.0, 0.0];
        this.bias2 = -2.0;

        // Init with zeros to prevent early render crashes
        this.activations = { 
            input: [0,0,0], 
            hidden: [0,0,0,0], 
            output: [0] 
        };
    }

    relu(x) { return Math.max(0, x); }
    sigmoid(x) { return 1 / (1 + Math.exp(-x)); }
    
    forward(r, g, b) {
        // Safety: Ensure inputs are numbers
        r = r || 0; g = g || 0; b = b || 0;
        
        this.activations.input = [r, g, b];
        
        // 1. Input -> Hidden
        this.activations.hidden = this.weights1.map((weights, i) => {
            let sum = this.biases1[i]; 
            sum += r * weights[0] + g * weights[1] + b * weights[2];
            return this.relu(sum);
        });

        // 2. Hidden -> Output
        let sum = this.bias2;
        this.weights2.forEach((w, i) => {
             sum += w * this.activations.hidden[i];
        });
        
        const score = this.sigmoid(sum);
        this.activations.output = [score];

        return this.activations.output;
    }
}

const net = new MicroNet();

/* --- RENDER LOOP --- */
function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}
window.addEventListener('resize', resize);
resize();

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function drawNet(activations, x, y, scale) {
    if (!activations || !activations.input || !activations.hidden || !activations.output) return;

    // Configuration
    const layerGap = 180 * scale; 
    const nodeGap = 70 * scale;
    
    // We have 3 layers: Input (3), Hidden (4), Output (1)
    const layers = [
        { name: 'RGB INPUT', count: 3, vals: activations.input },
        { name: 'HIDDEN', count: 4, vals: activations.hidden },
        { name: 'OUTPUT', count: 1, vals: activations.output }
    ];

    ctx.save();
    ctx.translate(x, y);
    ctx.font = `${10 * scale}px 'Fira Code'`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Calculate positions first
    const positions = layers.map((layer, lIdx) => {
        const layerX = (lIdx - 1) * layerGap; // -Gap, 0, +Gap
        return Array.from({length: layer.count}).map((_, nIdx) => {
            const layerHeight = (layer.count - 1) * nodeGap;
            const nodeY = (nIdx * nodeGap) - (layerHeight / 2);
            // Safety: Ensure val is a number
            let val = layer.vals[nIdx];
            if (val === undefined || isNaN(val)) val = 0;
            return { x: layerX, y: nodeY, val: val };
        });
    });

    // Draw Connections
    for (let l = 0; l < layers.length - 1; l++) {
        const currentLayer = positions[l];
        const nextLayer = positions[l+1];
        
        currentLayer.forEach(src => {
            nextLayer.forEach(dst => {
                ctx.beginPath();
                ctx.moveTo(src.x, src.y);
                ctx.lineTo(dst.x, dst.y);
                // Simple opacity based on source activation
                ctx.strokeStyle = `rgba(255,255,255,${src.val * 0.4})`;
                ctx.lineWidth = 1 * scale;
                ctx.stroke();
            });
        });
    }

    // Draw Nodes & Labels
    positions.forEach((layerNodes, lIdx) => {
        layerNodes.forEach((node) => {
            // Node Circle
            ctx.beginPath();
            ctx.arc(node.x, node.y, 22 * scale, 0, Math.PI * 2);
            const b = Math.floor(node.val * 255);
            ctx.fillStyle = `rgb(${b},${b},${b})`;
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2 * scale;
            ctx.stroke();

            // Value Text
            ctx.fillStyle = node.val > 0.5 ? '#111' : '#fff';
            ctx.fillText(node.val.toFixed(2), node.x, node.y);
        });

        // Layer Label
        ctx.fillStyle = '#fff';
        const topNode = layerNodes[0];
        ctx.fillText(layers[lIdx].name, topNode.x, topNode.y - 45 * scale);
    });

    ctx.restore();
}

function animate() {
    // 0. Safety check for dimensions
    if (!width || !height) {
        requestAnimationFrame(animate); 
        return;
    }

    // 1. Calculate Background Color based on Mouse
    // Map mouse X to Red/Green, Y to Blue roughly
    let r = Math.floor((mouse.x / width) * 255);
    let g = Math.floor((mouse.y / height) * 255);
    let b = Math.floor(Math.sin(Date.now() * 0.0002) * 127 + 128); // Pulsing Blue (Slow)
    
    // Safety clamp 0-255
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));

    // 2. Fill Background
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillRect(0,0,width,height);
    
    // 3. Run Neural Net Prediction
    // Normalize 0-1
    let outputs = net.forward(r/255, g/255, b/255); // returns [score]
    let score = outputs[0];
    
    // 4. Update UI based on prediction
    // score > 0.5 means "black", otherwise "white"
    if (score > 0.5) {
        body.style.color = '#111'; // Black Text
    } else {
        body.style.color = '#eee'; // White Text
    }

    // 5. Draw the Mini-Brain
    // Responsive Positioning to avoid text overlap
    let netX, netY, netScale;
    
    // Check orientation
    const isPortrait = height > width;
    
    if (!isPortrait && width > 1000) {
        // Desktop Landscape: Right side, large
        netX = width * 0.75;
        netY = height / 2;
        netScale = 1.3;
    } else if (!isPortrait && width > 600) {
        // Tablet Landscape: Slightly smaller, still right
        netX = width * 0.70;
        netY = height / 2;
        netScale = 1.0;
    } else {
        // Portrait / Mobile: Center bottom
        netX = width / 2;
        // Snap to bottom quarter, but closer to center (70% instead of 75%)
        netY = height * 0.70;
        // Scale down to fit width
        netScale = Math.min(width, height) / 800; 
        if(netScale < 0.5) netScale = 0.5; // Min size
    }

    drawNet(net.activations, netX, netY, netScale);

    requestAnimationFrame(animate);
}

animate();