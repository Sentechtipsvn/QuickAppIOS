const shadowTemplates = [
    { id: 'inset', nameKey: 'shadow_inset', name: 'Bóng Chìm', template: 'inset {x}px {y}px {b}px {s}px {c}' },
    { id: 'outer', nameKey: 'shadow_outer', name: 'Bóng Ngoài', template: '{x}px {y}px {b}px {s}px {c}' },
    { id: 'soft', nameKey: 'shadow_soft', name: 'Mờ Diện Rộng', template: '{x}px {y}px {b}px {s}px {c}' },
    { id: 'hard', nameKey: 'shadow_hard', name: 'Nổi Khối 3D', template: '{x}px {y}px {b}px {s}px {c}' },
    { id: 'glow', nameKey: 'shadow_glow', name: 'Phát Sáng', template: '0px 0px {b}px {s}px {c}' },
    { id: 'bottom', nameKey: 'shadow_bottom', name: 'Bóng Dưới (Apple)', template: '0px {y}px {b}px {s}px {c}' },
    { id: 'floating', nameKey: 'shadow_floating', name: 'Nổi Bay', template: '0px {b}px {b}px calc(-1 * {s}px) {c}' },
    { id: 'pressed', nameKey: 'shadow_pressed', name: 'Ấn Xuống', template: 'inset 0px {y}px {b}px {s}px {c}' },
    { id: 'pop', nameKey: 'shadow_pop', name: 'Pop Bubble', template: '0px {y}px 0px 0px {c}' },
    { id: 'double', nameKey: 'shadow_double', name: 'Viền Kép', template: '{x}px {y}px {b}px {s}px {c}, inset calc(-1 * {x}px) calc(-1 * {y}px) {b}px 0px rgba(255,255,255,0.15)' },
    { id: 'neumorph', nameKey: 'shadow_neumorph', name: 'Neumorphism Nổi', template: 'calc(-1 * {x}px) calc(-1 * {y}px) {b}px rgba(255,255,255,0.4), {x}px {y}px {b}px {c}' },
    { id: 'neuro_in', nameKey: 'shadow_neuro_in', name: 'Neumorphism Chìm', template: 'inset calc(-1 * {x}px) calc(-1 * {y}px) {b}px rgba(255,255,255,0.4), inset {x}px {y}px {b}px {c}' },
    { id: 'neon', nameKey: 'shadow_neon', name: 'Neon RGB', template: '0px 0px {b}px {c}, 0px 0px {b}px {c}, 0px 0px {b}px {c}' },
    { id: 'long', nameKey: 'shadow_long', name: 'Bóng Dài Retro', template: '{x}px {y}px 0px 0px {c}' },
    { id: 'crisp', nameKey: 'shadow_crisp', name: 'Sắc Nét Nhẹ', template: '0px 1px 2px 0px {c}' },
    { id: 'ripple', nameKey: 'shadow_ripple', name: 'Sóng Nước', template: '0px {y}px {b}px {s}px {c}, 0px {y}px {b}px {s}px {c}' },
    { id: 'clay', nameKey: 'shadow_clay', name: 'Đất Sét 3D', template: 'inset 0px calc(-1 * {y}px) {b}px rgba(255,255,255,0.3), inset 0px {y}px {b}px rgba(0,0,0,0.2), 0px {y}px {b}px {c}' }
];

const root = document.documentElement;

// Khởi tạo Setting Selector
const shadowSelect = document.getElementById('select-shadow-type');
shadowTemplates.forEach(t => {
    let opt = document.createElement('option');
    opt.value = t.id;
    opt.textContent = t.name; // Sẽ được i18n đè lên ở main.js
    opt.dataset.i18n = t.nameKey;
    shadowSelect.appendChild(opt);
});

// Hàm tạo chuỗi bóng CSS hoàn chỉnh
function generateShadowString() {
    const id = shadowSelect.value;
    const x = document.getElementById('slider-shadow-x').value;
    const y = document.getElementById('slider-shadow-y').value;
    const b = document.getElementById('slider-shadow-b').value;
    const s = document.getElementById('slider-shadow-s').value;
    const c = document.getElementById('color-shadow').value;

    const templateObj = shadowTemplates.find(t => t.id === id);
    if (!templateObj) return '';
    
    return templateObj.template
        .replace(/{x}/g, x)
        .replace(/{y}/g, y)
        .replace(/{b}/g, b)
        .replace(/{s}/g, s)
        .replace(/{c}/g, c);
}

// Cập nhật lên biến CSS
function updateTheme() {
    const bgUrl = document.getElementById('input-bg-image').value;
    if (bgUrl) root.style.setProperty('--bg-image', `url(${bgUrl})`);
    else root.style.setProperty('--bg-image', 'none');

    root.style.setProperty('--bg-color', document.getElementById('color-bg').value);
    root.style.setProperty('--container-color', document.getElementById('color-container').value);
    
    const shadowStr = generateShadowString();
    root.style.setProperty('--shadow-value', shadowStr);

    saveSettings();
}

// Lưu / Tải cài đặt từ LocalStorage
function saveSettings() {
    const config = {
        bgUrl: document.getElementById('input-bg-image').value,
        bgColor: document.getElementById('color-bg').value,
        containerColor: document.getElementById('color-container').value,
        shadowType: shadowSelect.value,
        shadowX: document.getElementById('slider-shadow-x').value,
        shadowY: document.getElementById('slider-shadow-y').value,
        shadowB: document.getElementById('slider-shadow-b').value,
        shadowS: document.getElementById('slider-shadow-s').value,
        shadowColor: document.getElementById('color-shadow').value
    };
    localStorage.setItem('qal_config', JSON.stringify(config));
}

function loadSettings() {
    const saved = JSON.parse(localStorage.getItem('qal_config'));
    if (saved) {
        document.getElementById('input-bg-image').value = saved.bgUrl || '';
        document.getElementById('color-bg').value = saved.bgColor || (window.matchMedia('(prefers-color-scheme: light)').matches ? '#f2f2f7' : '#000000');
        document.getElementById('color-container').value = saved.containerColor || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.15)');
        document.getElementById('select-shadow-type').value = saved.shadowType || 'outer';
        document.getElementById('slider-shadow-x').value = saved.shadowX || 0;
        document.getElementById('slider-shadow-y').value = saved.shadowY || 10;
        document.getElementById('slider-shadow-b').value = saved.shadowB || 20;
        document.getElementById('slider-shadow-s').value = saved.shadowS || 0;
        document.getElementById('color-shadow').value = saved.shadowColor || 'rgba(0,0,0,0.5)';
        updateTheme();
    }
}

// Lắng nghe sự thay đổi của các thanh trượt và color picker
document.querySelectorAll('.modal-body input, .modal-body select').forEach(el => {
    el.addEventListener('input', updateTheme);
});

document.addEventListener('DOMContentLoaded', loadSettings);