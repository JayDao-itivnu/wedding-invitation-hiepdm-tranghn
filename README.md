# 💍 WEBSITE THIỆP CƯỚI ONLINE (APPLE SCROLLYTELLING STYLE)
> **Dành riêng cho:** Mạnh Hiệp & Huyền Trang  
> **Phong cách thiết kế:** Minimalist Editorial kết hợp Apple Scrollytelling  
> **Bảng màu chủ đạo:** Warm Beige & Burgundy (Kem Be ấm `#F9F6F0` & Đỏ Đô sang trọng `#721121` - `#4A0E17`, Vàng Champagne `#C5A059`)  
> **Nền tảng triển khai:** GitHub Pages (miễn phí trọn đời, tải nhanh, không chứa quảng cáo)

---

## 🌟 TÍNH NĂNG NỔI BẬT

1. **Màn hình chờ Mở Thiệp (Splash Screen / Wax Seal Envelope):** Mô phỏng phong bì Đỏ Đô ép kim sang trọng với con dấu sáp 3D chữ lồng `H & T`. Tự động đọc tham số URL `?to=...` để chào đón đích danh khách mời, click để mở thiệp mượt mà, bắn pháo giấy tone Đỏ - Vàng kim và tự động phát nhạc nền.
2. **Apple Scrollytelling & Lenis Smooth Scroll:** Trải nghiệm cuộn trang mượt mà như xem trang sản phẩm của Apple, chữ và ảnh trôi vào nhẹ nhàng theo nhịp cuộn.
3. **Hiệu ứng đổi màu nền mượt mà (Burgundy Transition):** Khi cuộn tới phần Video kỷ niệm, toàn bộ website tự động chuyển từ màu Be sáng sang Đỏ Đô trầm (`#4A0E17`) và phóng to khung video (Scale-up on scroll).
4. **Đếm ngược & Thêm vào Lịch (Add to Calendar):** Thẻ đếm ngược Glassmorphism kèm nút tạo nhanh sự kiện trên Google Calendar và tải file `.ics` cho Apple Calendar (iPhone/Mac).
5. **Thư viện ảnh Bento Grid & Lightbox:** Lưới ảnh bo góc tinh tế chuẩn Apple, hỗ trợ xem phóng to ảnh toàn màn hình với hiệu ứng mờ nền.
6. **Timeline Hôn Lễ & Gợi ý Dresscode:** Lịch trình với đường kẻ dọc màu Đỏ Đô sáng dần theo tiến độ cuộn chuột kèm các mẫu màu trang phục gợi ý cho khách mời.
7. **Bản đồ Trống Đồng Palace Cầu Giấy (Chống Scroll-Jacking):** Tích hợp lớp bảo vệ cảm ứng thông minh giúp thao tác vuốt cuộn trên điện thoại không bị kẹt vào iframe bản đồ, kèm nút "Chỉ đường ngay" mở app Google Maps.
8. **Form RSVP & Sổ Lưu Bút Trực Tiếp (Guestbook):** Khách gửi phản hồi và lời chúc lưu thẳng vào Google Sheets qua Google Apps Script (tự động chạy Mock Mode nếu chưa gắn link).
9. **SEO & Chia sẻ Zalo/Messenger:** Tối ưu hóa thẻ Open Graph preview hình ảnh và tiêu đề đẹp mắt khi gửi qua Zalo, Messenger, iMessage.

---

## 📁 CẤU TRÚC THƯ MỤC

```text
wedding-invitation/
├── index.html                  # Giao diện chính 10 sections hoàn chỉnh
├── config.js                   # Toàn bộ cấu hình thông tin, ngày giờ, ảnh, nhạc, map, apps script
├── styles.css                  # Thiết kế giao diện, con dấu sáp 3D, hiệu ứng kính mờ Glassmorphism
├── app.js                      # Logic Scrollytelling, Lenis, GSAP, Confetti, Calendar, RSVP
├── README.md                   # Hướng dẫn chi tiết từng bước (bạn đang đọc)
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions tự động deploy lên GitHub Pages
└── test/
    └── verify.js               # Script tự động kiểm tra QA (Zero Errors, Contrast, Drive URLs)
```

---

## 🛠 HƯỚNG DẪN 1: CÁCH LẤY ID ẢNH TỪ GOOGLE DRIVE VÀ GẮN VÀO `config.js`

Hệ thống đã tích hợp sẵn hàm tự động chuyển đổi thông minh `parseGoogleDriveUrl()`. Bạn có thể dùng trực tiếp link chia sẻ Google Drive hoặc ID file ảnh mà không lo bị chặn quyền xem.

### Bước 1: Tải ảnh lên Google Drive & Chia sẻ công khai
1. Vào [Google Drive](https://drive.google.com/), tạo thư mục (ví dụ `Anh-Cuoi-Hiep-Trang`) và tải các bức ảnh cưới chất lượng cao lên.
2. Chuột phải vào ảnh (hoặc thư mục ảnh) ➔ Chọn **Chia sẻ (Share)** ➔ **Chia sẻ (Share)**.
3. Tại mục **Quyền truy cập chung (General access)**, đổi từ *Hạn chế (Restricted)* thành **Bất kỳ ai có đường liên kết (Anyone with the link)** với vai trò *Người xem (Viewer)*.
4. Bấm **Sao chép đường liên kết (Copy link)**.

### Bước 2: Lấy File ID hoặc Dán thẳng link vào `config.js`
Đường link sao chép từ Google Drive thường có dạng:
```text
https://drive.google.com/file/d/1aB2c3D4e5F6g7H8i9J0kL/view?usp=sharing
```
Trong đó, chuỗi `1aB2c3D4e5F6g7H8i9J0kL` nằm giữa `/d/` và `/view` chính là **File ID**.

Mở file `config.js`, tìm mục `gallery` và bạn có thể dán theo 1 trong 3 cách đều hoạt động 100%:
```javascript
// Cách 1: Dán toàn bộ link chia sẻ Google Drive
src: "https://drive.google.com/file/d/1aB2c3D4e5F6g7H8i9J0kL/view?usp=sharing",

// Cách 2: Chỉ cần dán File ID
src: "1aB2c3D4e5F6g7H8i9J0kL",

// Cách 3: Dùng link ảnh trực tiếp từ Unsplash / Imgur / Cloudinary / file cục bộ
src: "https://images.unsplash.com/photo-...",
```
> **Cơ chế an toàn (Fallback):** Nếu link Google Drive gặp sự cố mạng hoặc quên bật quyền công khai, hệ thống sẽ tự động hiển thị ảnh mẫu nghệ thuật dự phòng thay vì hiện ô ảnh bị vỡ.

---

## 📊 HƯỚNG DẪN 2: TẠO GOOGLE SHEETS & GOOGLE APPS SCRIPT ĐỂ NHẬN DỮ LIỆU RSVP

Để toàn bộ lời chúc và danh sách khách mời gửi từ form RSVP tự động lưu vào Google Sheets của bạn:

### Bước 1: Tạo bảng tính Google Sheets
1. Vào [Google Sheets](https://sheets.new) tạo một bảng tính mới, đặt tên ví dụ: `Danh Sách Khách Mời - Cưới Mạnh Hiệp Huyền Trang`.
2. Ở dòng đầu tiên (Header Row), đặt tên các cột:
   - Cột A: `Thời Gian`
   - Cột B: `Họ Và Tên`
   - Cột C: `Số Điện Thoại`
   - Cột D: `Tham Dự`
   - Cột E: `Số Người`
   - Cột F: `Khách Phía`
   - Cột G: `Lời Chúc`

### Bước 2: Mở Trình biên tập Google Apps Script
1. Trên thanh menu Google Sheets, bấm vào **Tiện ích mở rộng (Extensions)** ➔ Chọn **Apps Script**.
2. Xóa toàn bộ mã mặc định trong file `Code.gs` và dán đoạn mã sau vào:

```javascript
/**
 * GOOGLE APPS SCRIPT NHẬN DỮ LIỆU RSVP CHO THIỆP CƯỚI
 * Mạnh Hiệp & Huyền Trang
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Ghi dữ liệu vào dòng tiếp theo của bảng tính
    sheet.appendRow([
      new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
      data.name || "",
      data.phone || "",
      data.attendance || "",
      data.guestsCount || "1",
      data.side || "",
      data.message || ""
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Đã lưu thành công" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Hàm hỗ trợ kiểm tra trạng thái hoạt động của Script
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "active", message: "Wedding RSVP API is online" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### Bước 3: Triển khai Web App (Deploy)
1. Ở góc trên bên phải màn hình Apps Script, bấm nút **Triển khai (Deploy)** ➔ Chọn **Quản lý bản triển khai mới (New deployment)**.
2. Bấm vào biểu tượng bánh răng ⚙️ bên cạnh "Chọn loại", chọn **Ứng dụng web (Web app)**.
3. Cấu hình các trường:
   - **Mô tả (Description):** `Wedding RSVP API v1`
   - **Thực thi dưới dạng (Execute as):** `Tôi (Your Google Account)`
   - **Ai có quyền truy cập (Who has access):** **Bất kỳ ai (Anyone)** *(Rất quan trọng! Phải chọn Bất kỳ ai để khách mời gửi form mà không cần đăng nhập tài khoản Google)*.
4. Bấm **Triển khai (Deploy)**. Nếu Google hỏi cấp quyền (Authorize Access), chọn tài khoản của bạn ➔ Bấm **Nâng cao (Advanced)** ➔ Chọn **Đi tới dự án (Go to project - unsafe)** ➔ Bấm **Cho phép (Allow)**.
5. Sao chép đường dẫn **URL ứng dụng web (Web app URL)** (có dạng: `https://script.google.com/macros/s/AKfycb.../exec`).

### Bước 4: Gắn URL vào `config.js`
Mở file `config.js`, tìm mục `rsvp` và dán URL vào:
```javascript
rsvp: {
  googleScriptUrl: "https://script.google.com/macros/s/AKfycb.../exec",
  mockMode: false, // Đổi thành false để gửi trực tiếp vào Google Sheets
  ...
}
```
> **Chế độ Mock Mode:** Nếu để `mockMode: true` hoặc để trống `googleScriptUrl`, hệ thống sẽ tự động kích hoạt chế độ giả lập: mô phỏng gửi dữ liệu trong 650ms, bắn pháo giấy chúc mừng và thêm ngay lời chúc lên màn hình để bạn kiểm tra thử giao diện.

---

## 🚀 HƯỚNG DẪN 3: ĐẨY CODE LÊN GITHUB & BẬT GITHUB PAGES (GITHUB.IO)

### Cách 1: Triển khai nhanh nhất (Khuyên dùng)
1. Tạo một repository mới trên GitHub (ví dụ: `wedding-invitation` hoặc `wedding`). Chọn chế độ **Public**.
2. Đẩy toàn bộ mã nguồn trong thư mục này lên branch `main` của repository:
   ```bash
   cd wedding-invitation
   git init
   git add .
   git commit -m "feat: Wedding invitation website for Manh Hiep & Huyen Trang"
   git branch -M main
   git remote add origin https://github.com/<tai-khoan-github-cua-ban>/wedding-invitation.git
   git push -u origin main
   ```
3. Truy cập vào trang Repository trên GitHub:
   - Chọn tab **Settings** (Cài đặt) ➔ Chọn mục **Pages** ở menu bên trái.
   - Tại mục **Build and deployment** ➔ **Source**: Chọn **Deploy from a branch**.
   - Tại mục **Branch**: Chọn `main` và thư mục `/ (root)` ➔ Bấm **Save**.
4. Chờ 1 - 2 phút, GitHub sẽ cấp cho bạn đường link website miễn phí có dạng:
   👉 **`https://<tai-khoan-github-cua-ban>.github.io/wedding-invitation/`**

### Cách 2: Triển khai qua GitHub Actions (Đã có sẵn file workflow)
- File `.github/workflows/deploy.yml` đã được tạo sẵn trong dự án.
- Trong mục **Settings** ➔ **Pages** của GitHub:
  - Tại **Build and deployment** ➔ **Source**: Bạn chỉ cần chọn **GitHub Actions**.
  - Mỗi khi bạn commit thay đổi vào branch `main`, hệ thống sẽ tự động build và deploy lên website trong chưa đầy 30 giây!

---

## 💌 HƯỚNG DẪN 4: TẠO ĐƯỜNG LINK CÁ NHÂN HÓA GỬI CHO TỪNG BẠN BÈ

Hệ thống hỗ trợ tham số `?to=...` trên URL. Bạn chỉ cần thêm tên khách mời vào sau link website:

| Người nhận | Link gửi đi | Kết quả hiển thị trên thiệp |
| :--- | :--- | :--- |
| **Bạn Hiền** | `https://your-site.github.io/?to=Bạn+Hiền` | "Trân trọng kính mời: Bạn Hiền" |
| **Anh Nam** | `https://your-site.github.io/?to=Anh+Nam` | "Trân trọng kính mời: Anh Nam" |
| **Gia đình Bác Hải**| `https://your-site.github.io/?to=Gia+đình+Bác+Hải` | "Trân trọng kính mời: Gia đình Bác Hải" |
| **Khách chung** | `https://your-site.github.io/` | "Trân trọng kính mời: Quý khách" |

> Tên khách mời từ link sẽ tự động được điền sẵn vào ô **"Họ và tên của bạn"** trong form RSVP giúp khách mời không phải nhập lại.

---

## 🎨 HƯỚNG DẪN 5: TÙY CHỈNH THÔNG TIN TRONG `config.js`

Mọi nội dung trên website đều tập trung tại file `config.js`, bạn không cần biết code cũng có thể sửa đổi dễ dàng:
- **Tên cô dâu, chú rể, ba mẹ hai bên:** Mục `couple.groom` và `couple.bride`.
- **Ngày giờ hôn lễ:** Mục `event.dateTimeStr` và `event.solarDate`.
- **Địa điểm & Tọa độ:** Mục `event.venue`.
- **Video Pre-wedding:** Mục `video` (hỗ trợ cả YouTube Shorts/Unlisted hoặc video MP4 thẻ `<video playsinline>`).
- **Nhạc nền:** Mục `audio.src` (thay link MP3 bạn thích).
- **Lịch trình (Timeline):** Mục `event.timeline`.

Chúc hai bạn **Mạnh Hiệp & Huyền Trang** có một ngày trọng đại thật trọn vẹn, ngập tràn hạnh phúc và đong đầy yêu thương! 🥂💍✨
