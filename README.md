<div align="center">
  <img src="image/Demo.png" alt="Quick App Launcher Demo" width="100%">
</div>

# Quick App Launcher
**Mở ứng dụng nhanh chóng, mượt mà và cá nhân hoá tối đa trên iOS.**

Quick App Launcher là một Webclip (PWA) được thiết kế đặc biệt cho hệ sinh thái iOS, cho phép người dùng khởi chạy ứng dụng siêu tốc thông qua ứng dụng Phím tắt (Shortcuts). Với giao diện Glassmorphism tinh tế, khả năng tùy biến mạnh mẽ và kho ứng dụng tích hợp, đây là giải pháp hoàn hảo để làm mới màn hình chính của bạn.

---

## 🌟 Tính Năng Nổi Bật

* **Giao Diện Chuẩn Apple (iOS 16+):** Bố cục lưới 4x6 chuẩn xác, tự động nhận diện chế độ Sáng/Tối (Light/Dark mode) theo hệ thống.
* **Kho Ứng Dụng Thông Minh:** 
  * Tích hợp sẵn danh sách ứng dụng Offline qua tệp cấu hình JSON.
  * Hỗ trợ tìm kiếm ứng dụng Online trực tiếp từ **API Apple iTunes** với độ chính xác tuyệt đối.
* **Chế Độ Chỉnh Sửa Trang (Edit Mode):** Hiệu ứng rung icon (jiggle mode) đặc trưng của iOS. Cho phép đổi tên, xóa ứng dụng trực quan với nút "Xong" (Done) tiện lợi.
* **Cá Nhân Hoá Không Giới Hạn:**
  * Hỗ trợ đổi hình nền từ Tệp, Thư viện ảnh hoặc URL.
  * Tùy chỉnh màu nền, màu khung, độ mờ (opacity) và bo góc (border-radius).
  * Hỗ trợ hơn 15 hiệu ứng đổ bóng (Shadow) khác nhau: Bóng ngoài, Bóng chìm, Phát sáng, Neumorphism, 3D Clay,...
* **Đa Ngôn Ngữ (i18n):** Tự động phát hiện ngôn ngữ thiết bị. Hỗ trợ sẵn Tiếng Việt (`vi-VN`) và Tiếng Anh (`en-US`, `en-GB`).
* **Lưu Trữ Cục Bộ (Local Storage):** Toàn bộ cài đặt giao diện và danh sách ứng dụng (tối đa 24 app) được lưu trữ an toàn ngay trên trình duyệt của thiết bị.

---

## 📂 Cấu Trúc Thư Mục

Để dự án hoạt động trơn tru, hãy đảm bảo cấu trúc Repository của bạn như sau:

```text
Quick-App-Launcher/
│
├── index.html          # Giao diện chính của Webclip
├── style.css           # Cấu hình giao diện và Glassmorphism
├── main.js             # Logic xử lý kho ứng dụng và Phím tắt
├── theme.js            # Xử lý cá nhân hoá giao diện & lưu trữ
├── iCon.png            # Icon hiển thị ngoài màn hình chính iOS (Apple Touch Icon)
├── README.md           # Tài liệu dự án
│
├── image/              # Chứa các tài nguyên hình ảnh UI
│   ├── Demo.png        # Ảnh demo dự án
│   ├── icon_setting.png
│   ├── delete.png
│   └── slider_thumb.png
│
├── icon/               # Chứa các icon ứng dụng (Offline)
│   ├── Translate.png
│   ├── Calculator.png
│   └── ...
│
├── Language/           # Chứa các tệp đa ngôn ngữ
│   ├── vi-VN.json
│   ├── en-US.json
│   └── en-GB.json      # Fallback mặc định
│
└── System/             # Chứa dữ liệu cấu hình hệ thống
    └── appios.json     # Kho dữ liệu ứng dụng mặc định (Offline)
