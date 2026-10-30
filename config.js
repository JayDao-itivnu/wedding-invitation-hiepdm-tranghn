/**
 * ==============================================================================
 * WEDDING INVITATION CONFIGURATION
 * Website Thiệp Cưới Online Phong Cách Apple Scrollytelling
 * Tone màu: Warm Beige & Burgundy (Be ấm - Đỏ đô sang trọng)
 * ==============================================================================
 */

const WEDDING_CONFIG = {
  // --- 1. THÔNG TIN CÔ DÂU & CHÚ RỂ ---
  couple: {
    groom: {
      name: "Mạnh Hiệp",
      fullName: "Đào Mạnh Hiệp",
      role: "Chú rể",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      parents: "Ông Đào Văn Nam & Bà Nguyễn Thị Mai",
      story: "Chàng kỹ sư công nghệ với trái tim ấm áp, luôn tin vào điều kỳ diệu của định mệnh và nụ cười rạng rỡ của người con gái ấy."
    },
    bride: {
      name: "Huyền Trang",
      fullName: "Nguyễn Huyền Trang",
      role: "Cô dâu",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      parents: "Ông Nguyễn Văn Hùng & Bà Lê Thị Lan",
      story: "Cô gái yêu nghệ thuật, dịu dàng và tinh tế. Nơi nào có em, nơi đó ngập tràn ánh nắng và sự an yên trong tâm hồn."
    },
    monogram: "H & T",
    logo: "logo-cuoi-H-T-tach-nen-2048px.svg",
    quote: "Tình yêu không chỉ là nhìn nhau, mà là cùng nhau nhìn về một hướng trên con đường phía trước."
  },

  // --- 2. THỜI GIAN & ĐỊA ĐIỂM TỔ CHỨC ---
  event: {
    // Ngày giờ chính thức (Định dạng YYYY-MM-DDTHH:mm:ss cho countdown chính xác)
    dateTimeStr: "26/12/2026 - 10:00",
    solarDate: "2026-12-26T10:00:00+07:00",
    lunarDate: "Ngày 18 tháng 11 năm Bính Ngọ",
    
    venue: {
      name: "Trống Đồng Palace Cầu Giấy",
      hall: "Sảnh Crystal (Tầng 2)",
      address: "Số 2 Trần Đăng Ninh, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội",
      // Link điều hướng trực tiếp trên Google Maps
      mapsNavigationUrl: "https://maps.app.goo.gl/2Jkdq6iVro3x8sPJ6",
      // Iframe nhúng bản đồ trực tiếp trên website (đã căn chỉnh vị trí Trống Đồng Palace Cầu Giấy)
      mapsEmbedIframeUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8638558814324!2d105.7909383758717!3d21.03813298061358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab37482f3c73%3A0xe541743916212e3e!2zVHLhu5FuZyDEkOG7k25nIFBhbGFjZSBD4bqndSBHaeG6pXk!5e0!3m2!1svi!2s!4v1709280000000!5m2!1svi!2s"
    },

    // Lịch trình buổi tiệc (Timeline)
    timeline: [
      {
        time: "09:30",
        title: "Đón Tiếp Khách Mời",
        desc: "Chào đón những vị khách quý, check-in chụp ảnh lưu niệm tại photobooth sang trọng cùng Cô dâu & Chú rể.",
        icon: "camera"
      },
      {
        time: "10:15",
        title: "Lễ Thành Hôn Trang Trọng",
        desc: "Thời khắc thiêng liêng trao nhẫn cưới, cắt bánh, rót rượu mừng và trao nhau lời hẹn ước trăm năm.",
        icon: "ring"
      },
      {
        time: "10:45",
        title: "Khai Tiệc Mừng Cưới",
        desc: "Thưởng thức tiệc ẩm thực tinh hoa cùng lời chúc phúc từ gia đình, người thân và bạn bè.",
        icon: "champagne"
      },
      {
        time: "11:30",
        title: "Giao Lưu & Âm Nhạc",
        desc: "Cùng hòa mình vào giai điệu ngọt ngào, những trò chơi thú vị và bốc thăm may mắn.",
        icon: "music"
      }
    ],

    // Gợi ý trang phục (Dresscode)
    dresscode: {
      description: "Để tạo nên những khung hình kỷ niệm hài hòa và ấm áp, gia đình rất mong quý khách lựa chọn trang phục theo bảng màu:",
      palette: [
        { name: "Be Kem (Cream Beige)", color: "#F5EFE6", border: "#C5A059" },
        { name: "Đỏ Đô (Burgundy)", color: "#721121", border: "#C5A059" },
        { name: "Vàng Champagne", color: "#C5A059", border: "#F9F6F0" },
        { name: "Nâu Ấm (Warm Amber)", color: "#5E0B15", border: "#C5A059" },
        { name: "Đen Sang Trọng", color: "#1C1917", border: "#A8A29E" }
      ],
      note: "Quý khách vui lòng tránh mặc trang phục màu trắng tinh khôi để tôn vinh bộ váy cưới của Cô dâu."
    }
  },

  // --- 3. BẢNG MÀU THIẾT KẾ (DESIGN SYSTEM) ---
  colors: {
    primaryBg: "#F9F6F0",        // Kem Be sáng ấm (giấy mỹ thuật)
    secondaryBg: "#EBE3D5",      // Be đậm / Champagne nhạt
    burgundyDeep: "#4A0E17",     // Đỏ Đô chuyển nền cao trào
    burgundyPrimary: "#721121",  // Đỏ Đô chủ đạo
    burgundyAccent: "#800020",   // Đỏ Đô điểm nhấn
    champagneGold: "#C5A059",    // Vàng Champagne sang trọng
    textDark: "#2B090E",         // Đỏ rượu cực trầm / Xám ấm
    textLight: "#F9F6F0"         // Kem sáng trên nền Đỏ Đô
  },

  // --- 4. NHẠC NỀN (PLAYLIST TỪ THƯ MỤC audio/) ---
  audio: {
    autoplayOnOpen: true,   // Bật khi mở phong bì (sau user gesture)
    loopPlaylist: true,     // Hết danh sách quay lại bài đầu
    basePath: "audio/",    // Thư mục chứa file mp3 (relative đến domain/server)
    playlist: [
      {
        title: "A Million Dreams",
        artist: "Instrumental Cover",
        file: "a-million-dreams.mp3"
      },
      {
        title: "All of Me",
        artist: "Violin & Guitar Cover",
        file: "all-of-me.mp3"
      },
      {
        title: "Em Ellata - Đoàn kết",
        artist: "Happy Ending",
        file: "em-ellata-doan-ket.mp3"
      },
      {
        title: "golden hour",
        artist: "Piano & Cello - Brooklyn Duo",
        file: "golden-hour.mp3"
      },
      {
        title: "Rewrite The Stars",
        artist: "Violin Cover - Daniel Jang",
        file: "rewrite-the-stars.mp3"
      },
      {
        title: "Until I Found You",
        artist: "Violin Cover - Stephen Sanchez",
        file: "until-i-found-you.mp3"
      }
    ],
    fallbackSrc: "/audio/until-i-found-you.mp3"
  },

  // --- 5. SHORT VIDEO PRE-WEDDING ---
  // Hỗ trợ 2 chế độ: "youtube" hoặc "html5"
  video: {
    type: "youtube", // "youtube" hoặc "html5"
    // Link YouTube Shorts / Unlisted (Chế độ tự động nhúng iframe responsive chuẩn 16:9 hoặc 9:16)
    youtubeId: "dQw4w9WgXcQ", // ID youtube video hoặc video kỷ niệm cưới mẫu
    youtubeUrl: "https://www.youtube.com/embed/Z1BCujX3pw8?autoplay=0&mute=1&controls=1&rel=0&loop=1",
    // Nếu dùng type: "html5", truyền link mp4 trực tiếp:
    html5Src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80",
    caption: "Từng khoảnh khắc bên nhau là từng viên gạch xây nên mái ấm hạnh phúc"
  },

  // --- 6. ALBUM ẢNH CƯỚI (PHOTO GALLERY & BENTO GRID) ---
  // Bạn có thể điền link Google Drive chia sẻ (ví dụ: https://drive.google.com/file/d/1abc.../view),
  // hoặc chỉ cần điền File ID Google Drive, hoặc link ảnh trực tiếp (Unsplash/Imgur/Cloudinary).
  // Hệ thống sẽ tự động chuyển đổi sang link hiển thị tối ưu nhất.
  gallery: [
    {
      id: 1,
      title: "Khoảnh khắc đầu tiên",
      subtitle: "Nụ cười ngày chung đôi",
      // Có thể thay bằng link Google Drive: "https://drive.google.com/file/d/1Xyz.../view"
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      aspect: "tall", // tall (dọc), wide (ngang), square (vuông)
      desc: "Tràng Tiền, Hà Nội - Mùa thu 2025"
    },
    {
      id: 2,
      title: "Lời hẹn ước",
      subtitle: "Ánh mắt trao nhau",
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
      aspect: "wide",
      desc: "Hoàng hôn bên bờ biển"
    },
    {
      id: 3,
      title: "Vòng tay ấm",
      subtitle: "Bình yên là khi có anh",
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
      aspect: "square",
      desc: "Studio Secret Garden"
    },
    {
      id: 4,
      title: "Ngày hạnh phúc",
      subtitle: "Cùng em đi đến cuối con đường",
      src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80",
      aspect: "tall",
      desc: "Nhà Thờ Lớn Hà Nội"
    },
    {
      id: 5,
      title: "Nâng ly chúc mừng",
      subtitle: "Những nụ cười ngập tràn niềm vui",
      src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
      aspect: "square",
      desc: "Đà Lạt mù sương"
    },
    {
      id: 6,
      title: "Mãi mãi bên nhau",
      subtitle: "Khởi đầu của một chương mới",
      src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1200&q=80",
      aspect: "wide",
      desc: "Trọn vẹn yêu thương"
    }
  ],

  // --- 7. CẤU HÌNH FORM RSVP & GOOGLE SHEETS ---
  rsvp: {
    // Nếu chưa có Google Apps Script Web App URL, hệ thống tự động chạy Mock Mode:
    // Hiện loading mượt mà, bắn pháo giấy Đỏ Đô - Vàng Kim và lưu trực tiếp vào Guestbook trên giao diện.
    // Khi có URL, điền vào đây: "https://script.google.com/macros/s/AKfycbx.../exec"
    googleScriptUrl: "", 
    mockMode: true, // true: cho phép chạy thử nghiệm ngay cả khi chưa gắn Google Script
    defaultGuestName: "Quý khách",
    successMessage: "Cảm ơn bạn rất nhiều! Sự hiện diện của bạn là niềm vinh hạnh to lớn cho gia đình chúng mình.",
    // Danh sách lời chúc mẫu ban đầu hiển thị trên Tường lời chúc
    initialWishes: [
      {
        name: "Nguyễn Tuấn Anh",
        side: "Nhà Trai",
        time: "Hôm qua lúc 19:45",
        content: "Chúc hai bạn trăm năm hạnh phúc, đầu bạc răng long, sớm đón thiên thần nhỏ nhé! Nhất định mình sẽ có mặt sớm để nâng ly chúc mừng Hiệp!"
      },
      {
        name: "Lê Phương Thảo",
        side: "Nhà Gái",
        time: "Hôm nay lúc 08:30",
        content: "Cô dâu xinh đẹp nhất quả đất! Chúc Trang và anh Hiệp luôn ngập tràn tiếng cười và thấu hiểu nhau trên chặng đường mới nhé!"
      },
      {
        name: "Trần Minh Quân",
        side: "Bạn Thân",
        time: "Hôm nay lúc 09:15",
        content: "Mừng ngày trọng đại của đôi bạn trẻ! Chúc cho tình yêu của hai bạn mãi nồng nàn và bền chặt như ngày đầu!"
      }
    ]
  },

  // --- 8. SEO & OPEN GRAPH (METADATA) ---
  seo: {
    title: "Lễ Thành Hôn: Mạnh Hiệp & Huyền Trang | 26.12.2026",
    description: "Trân trọng kính mời quý khách tới tham dự Lễ thành hôn của Mạnh Hiệp & Huyền Trang tại Trống Đồng Palace Cầu Giấy vào ngày 26/12/2026.",
    shareImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    themeColor: "#721121"
  }
};

/**
 * ==============================================================================
 * GOOGLE DRIVE IMAGE HELPER FUNCTION
 * Chuyển đổi mọi link Google Drive (link share, thumbnail, uc, hoặc bare ID)
 * sang direct link CDN của Google với cơ chế fallback Unsplash dự phòng.
 * ==============================================================================
 */
function parseGoogleDriveUrl(urlOrId, fallbackUrl = "") {
  if (!urlOrId || typeof urlOrId !== "string") {
    return fallbackUrl || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80";
  }

  const trimmed = urlOrId.trim();

  // Nếu đã là link web trực tiếp thông thường (Unsplash, Cloudinary, Imgur, local path)
  if (!trimmed.includes("drive.google.com") && !trimmed.includes("docs.google.com")) {
    // Kiểm tra xem có phải là Bare File ID của Google Drive không (chuỗi ký tự 25-45 ký tự không chứa / hoặc .)
    const isBareGoogleId = /^[a-zA-Z0-9_-]{25,50}$/.test(trimmed);
    if (!isBareGoogleId) {
      return trimmed;
    }
  }

  let fileId = "";

  // 1. Dạng /file/d/FILE_ID/...
  const matchFileD = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (matchFileD && matchFileD[1]) {
    fileId = matchFileD[1];
  }

  // 2. Dạng ?id=FILE_ID hoặc &id=FILE_ID
  if (!fileId) {
    const matchIdParam = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (matchIdParam && matchIdParam[1]) {
      fileId = matchIdParam[1];
    }
  }

  // 3. Dạng bare ID
  if (!fileId && /^[a-zA-Z0-9_-]{25,50}$/.test(trimmed)) {
    fileId = trimmed;
  }

  if (fileId) {
    // Dùng lh3.googleusercontent.com/d/FILE_ID - chuẩn nhất, tải nhanh, không bị chặn cookie
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  return trimmed || fallbackUrl;
}

// Export cho cả môi trường Browser (window) và Node.js test environment
if (typeof window !== "undefined") {
  window.WEDDING_CONFIG = WEDDING_CONFIG;
  window.parseGoogleDriveUrl = parseGoogleDriveUrl;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { WEDDING_CONFIG, parseGoogleDriveUrl };
}
