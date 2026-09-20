// --- ĐA NGÔN NGỮ (i18n) ---
async function loadTranslations() {
    const lang = navigator.language.startsWith('vi') ? 'vi-VN' : 'en-US'; // Tự động phát hiện
    try {
        const response = await fetch(`${lang}.json`);
        const translations = await response.json();
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[key]) {
                el.textContent = translations[key];
            }
        });
    } catch (e) {
        console.log('Fall back to default text', e);
    }
}

// --- RENDER APP TỪ JSON ---
async function loadApps() {
    const grid = document.getElementById('app-grid');
    try {
        const res = await fetch('System/appios.json');
        const apps = await res.json();

        for (const [bundleId, appData] of Object.entries(apps)) {
            const btn = document.createElement('button');
            btn.className = 'app-item';
            btn.onclick = () => launchApp(bundleId);

            const icon = document.createElement('img');
            icon.src = appData.icon; // VD: systemapp/Translate.png
            icon.alt = appData.Name;
            // Xử lý lỗi load ảnh hiển thị placeholder
            icon.onerror = () => { icon.src = 'image/placeholder_icon.png'; };

            const title = document.createElement('span');
            title.textContent = appData.Name;

            btn.appendChild(icon);
            btn.appendChild(title);
            grid.appendChild(btn);
        }
    } catch (error) {
        console.error("Lỗi tải appios.json", error);
    }
}

// --- GỌI SHORTCUT MỞ APP ---
function launchApp(bundleId) {
    // Chuyển bundleId thành text input cho Shortcut 'Open App Launcher'
    const shortcutUrl = `shortcuts://run-shortcut?name=Open%20App%20Launcher&input=text&text=${encodeURIComponent(bundleId)}`;
    window.location.href = shortcutUrl;
}

// --- TÌM KIẾM APP BÊN THỨ 3 (APPLE iTUNES API) ---
// Sếp có thể nối hàm này vào một UI tìm kiếm sau này.
async function fetchThirdPartyApp(query) {
    try {
        const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=software&limit=5`);
        const data = await res.json();
        return data.results.map(app => ({
            bundleId: app.bundleId,
            name: app.trackName,
            icon: app.artworkUrl100 // Lấy chính xác icon 100x100bb
        }));
    } catch (err) {
        console.error("Lỗi truy vấn iTunes", err);
    }
}

// --- ĐIỀU KHIỂN MODAL ---
function toggleModal(id, show) {
    const modal = document.getElementById(id);
    if (show) modal.classList.remove('hidden');
    else modal.classList.add('hidden');
}

document.getElementById('btn-setting').onclick = () => toggleModal('setting-modal', true);
document.getElementById('btn-close-setting').onclick = () => toggleModal('setting-modal', false);

document.getElementById('btn-info').onclick = () => {
    toggleModal('setting-modal', false);
    toggleModal('info-modal', true);
};
document.getElementById('btn-close-info').onclick = () => toggleModal('info-modal', false);

document.getElementById('btn-about').onclick = () => {
    toggleModal('info-modal', false);
    toggleModal('about-popup', true);
};
document.getElementById('btn-close-about').onclick = () => toggleModal('about-popup', false);

// Init
document.addEventListener('DOMContentLoaded', () => {
    loadTranslations();
    loadApps();
});