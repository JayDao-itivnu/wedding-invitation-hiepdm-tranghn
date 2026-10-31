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
  },

  // --- 9. NGÔN NGỮ (I18N) ---
  i18n: {
    defaultLang: "vi",
    languages: {
      vi: {
        code: "vi",
        name: "Tiếng Việt",
        flag: "🇻🇳",
        // Envelope
        envelope_wedding_invitation: "WEDDING INVITATION",
        envelope_guest_name: "Trân trọng kính mời: Quý khách",
        envelope_couple: "Mạnh Hiệp & Huyền Trang",
        envelope_date: "26 . 12 . 2026 &bull; HÀ NỘI",
        envelope_btn_open: "Chạm để mở thiệp",
        envelope_audio_hint: "Giai điệu âm nhạc ngọt ngào sẽ tự động phát khi mở thiệp",
        // Hero
        hero_save_date: "Save Our Date",
        hero_guest_name: "Kính gửi: Quý khách",
        hero_title: "Lễ Thành Hôn",
        hero_couple: "Mạnh Hiệp & Huyền Trang",
        hero_date: "26 . 12 . 2026",
        hero_location: "HÀ NỘI",
        hero_scroll: "Cuộn để khám phá",
        // Story
        story_title: "Lời Ngỏ &amp; Hẹn Ước",
        story_quote: "“Tình yêu không chỉ là nhìn nhau, mà là cùng nhau nhìn về một hướng trên con đường phía trước.”",
        story_body: "Trải qua những năm tháng cùng sẻ chia ngọt bùi, từ những buổi hẹn hò dưới tán cây Hà Nội đến những ước mơ về một mái ấm sum vầy, chúng mình nhận ra rằng hạnh phúc trọn vẹn nhất là khi có nhau. Ngày hôm nay, trong sự chúc phúc của hai bên gia đình, chúng mình trân trọng gửi tới bạn lời mời chân thành nhất để cùng chứng kiến thời khắc thiêng liêng này.",
        groom_title: "Chú Rể",
        groom_name: "Đào Mạnh Hiệp",
        groom_desc: "“Chàng kỹ sư với trái tim ấm áp, yêu nghệ thuật, luôn tin vào điều kỳ diệu của định mệnh và nụ cười rạng rỡ của người con gái ấy.”",
        bride_title: "Cô Dâu",
        bride_name: "Nguyễn Huyền Trang",
        bride_desc: "“Cô gái yêu nghệ thuật, dịu dàng và tinh tế. Nơi nào có em, nơi đó ngập tràn ánh nắng và sự an yên trong tâm hồn.”",
        // Countdown
        countdown_title: "Đếm Ngược Ngày Chung Đôi",
        countdown_subtitle: "Thứ Bảy, ngày 26 tháng 12 năm 2026 (Tức ngày 18 tháng 11 năm Bính Ngọ)",
        countdown_day: "Ngày",
        countdown_hour: "Giờ",
        countdown_minute: "Phút",
        countdown_second: "Giây",
        btn_add_calendar: "Thêm vào Lịch cá nhân",
        btn_download_ics: "Tải file Apple Calendar (.ics)",
        // Video
        video_title: "Khoảnh Khắc Yêu Thương",
        video_subtitle: "Từng ánh mắt, từng nụ cười được ghi lại trọn vẹn trong thước phim kỷ niệm",
        video_caption: "“Từng khoảnh khắc bên nhau là từng viên gạch xây nên mái ấm hạnh phúc”",
        // Gallery
        gallery_title: "Album Kỷ Niệm",
        gallery_subtitle: "Chạm vào từng bức ảnh để xem kích thước lớn toàn màn hình",
        // Timeline
        timeline_title: "Lịch Trình Hôn Lễ",
        timeline_subtitle: "Trân trọng đón tiếp những người thân yêu đúng giờ để buổi lễ thêm phần trọn vẹn",
        timeline_event1_time: "09:30",
        timeline_event1_title: "Đón Tiếp Khách Mời",
        timeline_event1_desc: "Chào đón những vị khách quý, check-in chụp ảnh lưu niệm tại photobooth sang trọng cùng Cô dâu &amp; Chú rể.",
        timeline_event2_time: "10:15",
        timeline_event2_title: "Lễ Thành Hôn Trang Trọng",
        timeline_event2_desc: "Thời khắc thiêng liêng trao nhẫn cưới, cắt bánh, rót rượu mừng và trao nhau lời hẹn ước trăm năm.",
        timeline_event3_time: "10:45",
        timeline_event3_title: "Khai Tiệc Mừng Cưới",
        timeline_event3_desc: "Thưởng thức tiệc ẩm thực tinh hoa cùng lời chúc phúc từ gia đình, người thân và bạn bè thân thương.",
        timeline_event4_time: "11:30",
        timeline_event4_title: "Giao Lưu &amp; Âm Nhạc",
        timeline_event4_desc: "Cùng hòa mình vào giai điệu ngọt ngào, những trò chơi thú vị và những bức ảnh kỷ niệm khó quên.",
        dresscode_title: "Bảng Màu Trang Phục",
        dresscode_desc: "Để tạo nên những khung hình kỷ niệm hài hòa và ấm áp, gia đình rất mong quý khách lựa chọn trang phục theo bảng màu:",
        dresscode_note: "* Quý khách vui lòng tránh mặc trang phục màu trắng tinh khôi để tôn vinh bộ váy cưới của Cô dâu.",
        // Venue
        venue_title: "Địa Điểm Tổ Chức",
        venue_hall: "Sảnh Crystal (Tầng 2)",
        venue_address: "Số 2 Trần Đăng Ninh, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội",
        venue_time: "Thứ Bảy, 26/12/2026, 10:00",
        venue_parking: "Bãi đỗ xe ô tô và xe máy rộng rãi, có nhân viên hướng dẫn tận tình.",
        venue_btn_map: "Chỉ đường trên Google Maps",
        // RSVP
        rsvp_title: "Xác Nhận Tham Dự &amp; Gửi Lời Chúc",
        rsvp_desc: "Sự hiện diện của bạn là niềm hạnh phúc lớn lao của chúng mình. Xin vui lòng gửi phản hồi để gia đình chuẩn bị đón tiếp chu đáo nhất.",
        rsvp_name_label: "Họ và tên của bạn",
        rsvp_name_placeholder: "Ví dụ: Anh Nam, Bạn Trang...",
        rsvp_phone_label: "Số điện thoại liên hệ",
        rsvp_phone_placeholder: "Ví dụ: 0912 345 678",
        rsvp_attendance_label: "Bạn sẽ tham dự chứ?",
        rsvp_yes: "Chắc chắn mình sẽ tham dự",
        rsvp_no: "Rất tiếc mình bận không thể đến",
        rsvp_guests_label: "Số người tham dự",
        rsvp_guests_1: "Đi 1 mình (1 người)",
        rsvp_guests_2: "Đi cùng người thương / Bạn (2 người)",
        rsvp_guests_3: "Gia đình (3 người)",
        rsvp_guests_4: "Gia đình (4 người trở lên)",
        rsvp_side_label: "Bạn là khách của:",
        rsvp_side_groom: "Nhà Trai (Hiệp)",
        rsvp_side_bride: "Nhà Gái (Trang)",
        rsvp_message_label: "Lời chúc gửi tới Cô dâu &amp; Chú rể",
        rsvp_message_placeholder: "Gửi lời chúc phúc ngọt ngào tới Mạnh Hiệp & Huyền Trang tại đây...",
        rsvp_submit: "Gửi Xác Nhận &amp; Lời Chúc",
        guestbook_title: "Sổ Lưu Bút &amp; Lời Chúc Phúc",
        guestbook_modal_title: "Đã Gửi Thành Công",
        guestbook_modal_desc: "Cảm ơn bạn rất nhiều! Sự hiện diện và lời chúc của bạn là niềm vinh hạnh to lớn cho gia đình chúng mình.",
        guestbook_modal_close: "Đóng lại",
        // Footer
        footer_quote: "“Hẹn gặp lại bạn trong ngày hạnh phúc nhất của chúng mình!”",
        footer_date: "26 . 12 . 2026 | Trống Đồng Palace Cầu Giấy, Hà Nội",
        // Audio
        audio_title_prefix: "Bài",
        audio_of: "/",
        audio_btn_mute_on: "Tạm dừng",
        audio_btn_mute_off: "Bật nhạc"
      },
      fr: {
        code: "fr",
        name: "Tiếng Pháp",
        flag: "🇫🇷",
        // Envelope
        envelope_wedding_invitation: "INVITATION DE MARIAGE",
        envelope_guest_name: "Chèrement invité: Invité",
        envelope_couple: "Mạnh Hiệp &amp; Huyền Trang",
        envelope_date: "26 . 12 . 2026 &bull; HANOÏ",
        envelope_btn_open: "Ouvrir l'invitation",
        envelope_audio_hint: "Une mélodie douce se jouera automatiquement lors de l'ouverture",
        // Hero
        hero_save_date: "Réservez la Date",
        hero_guest_name: "Cher invité: Invité",
        hero_title: "Cérémonie de Mariage",
        hero_couple: "Mạnh Hiệp &amp; Huyền Trang",
        hero_date: "26 . 12 . 2026",
        hero_location: "HANOÏ",
        hero_scroll: "Faites défiler pour découvrir",
        // Story
        story_title: "Mot d'accueil &amp; Promesse",
        story_quote: "“L'amour ne consiste pas seulement à se regarder, mais à regarder ensemble dans la même direction sur le chemin à venir.”",
        story_body: "Après des années de partage et de douceur, des rendez-vous sous les arbres de Hanoï jusqu'au rêve d'un foyer chaleureux, nous réalisons que le bonheur suprême est d'être ensemble. Aujourd'hui, sous la bénédiction de nos deux familles, nous vous invitons sincèrement à venir témoigner de ce moment solennel.",
        groom_title: "Le Marié",
        groom_name: "Đào Mạnh Hiệp",
        groom_desc: "“Un ingénieur au cœur chaleureux, aimant l'art, croyant toujours au miracle du destin et au sourire radieux de la fille aimée.”",
        bride_title: "La Mariée",
        bride_name: "Nguyễn Huyền Trang",
        bride_desc: "“Une fille aimant l'art, douce et raffinée. Là où elle est, règnent la lumière du soleil et la paix dans l'âme.”",
        // Countdown
        countdown_title: "Compte à rebours jusqu'au Grand Jour",
        countdown_subtitle: "Samedi 26 décembre 2026 (18 novembre Année du Cheval de Feu)",
        countdown_day: "Jour",
        countdown_hour: "Heure",
        countdown_minute: "Minute",
        countdown_second: "Seconde",
        btn_add_calendar: "Ajouter au Calendrier",
        btn_download_ics: "Télécharger fichier Apple Calendar (.ics)",
        // Video
        video_title: "Moments d'Amour",
        video_subtitle: "Chaque regard, chaque sourire immortalisé dans le film souvenir",
        video_caption: "“Chaque moment passé ensemble est une brique bâtissant le foyer heureux”",
        // Gallery
        gallery_title: "Album de Souvenirs",
        gallery_subtitle: "Cliquez sur chaque photo pour voir en plein écran",
        // Timeline
        timeline_title: "Programme de la Cérémonie",
        timeline_subtitle: "Nous attendons chaleureusement nos proches à l'heure pour rendre la cérémonie encore plus parfaite",
        timeline_event1_time: "09:30",
        timeline_event1_title: "Accueil des Invités",
        timeline_event1_desc: "Bienvenue aux invités, photos souvenirs au photobooth élégant avec la Mariée et le Marié.",
        timeline_event2_time: "10:15",
        timeline_event2_title: "Cérémonie de Mariage Solennelle",
        timeline_event2_desc: "Échange d'alliances, coupe du gâteau, toast et vœux d'amour éternel.",
        timeline_event3_time: "10:45",
        timeline_event3_title: "Ouverture du Banquet de Mariage",
        timeline_event3_desc: "Dégustation de plats gastronomiques et vœux de bonheur de la famille et des amis.",
        timeline_event4_time: "11:30",
        timeline_event4_title: "Échange &amp; Musique",
        timeline_event4_desc: "Plongez dans les mélodies douces, jeux amusants et tirages au sort chanceux.",
        dresscode_title: "Code Vestimentaire Suggéré",
        dresscode_desc: "Pour créer des images souvenirs harmonieuses et chaleureuses, la famille souhaite que les invités choisissent leurs tenues selon les couleurs suivantes:",
        dresscode_note: "* Veuillez éviter de porter une robe blanche pure pour honorer la robe de mariée de la Mariée.",
        // Venue
        venue_title: "Lieu de la Cérémonie",
        venue_hall: "Salle Crystal (2ème étage)",
        venue_address: "Số 2 Trần Đăng Ninh, Phường Dịch Vọng, Quận Cầu Giấy, Hanoï",
        venue_time: "Samedi 26/12/2026, 10h00",
        venue_parking: "Grand parking pour voitures et motos, personnel d'accueil dédié.",
        venue_btn_map: "Itinéraire sur Google Maps",
        // RSVP
        rsvp_title: "Confirmation de Présence &amp; Message de Félicitations",
        rsvp_desc: "Votre présence est une grande joie pour nous. Merci de nous faire savoir pour que nous puissions vous accueillir au mieux.",
        rsvp_name_label: "Votre nom",
        rsvp_name_placeholder: "Ex: Anh Nam, Bạn Trang...",
        rsvp_phone_label: "Numéro de téléphone",
        rsvp_phone_placeholder: "Ex: 0912 345 678",
        rsvp_attendance_label: "Serez-vous présent ?",
        rsvp_yes: "Oui, je serai présent",
        rsvp_no: "Non, je suis occupé",
        rsvp_guests_label: "Nombre de personnes",
        rsvp_guests_1: "Seul (1 personne)",
        rsvp_guests_2: "En couple / Avec un ami (2 personnes)",
        rsvp_guests_3: "Famille (3 personnes)",
        rsvp_guests_4: "Famille (4 personnes et plus)",
        rsvp_side_label: "Vous êtes invité par:",
        rsvp_side_groom: "Famille du Marié (Hiệp)",
        rsvp_side_bride: "Famille de la Mariée (Trang)",
        rsvp_message_label: "Message pour la Mariée &amp; le Marié",
        rsvp_message_placeholder: "Envoyez vos vœux de bonheur à Mạnh Hiệp &amp; Huyền Trang ici...",
        rsvp_submit: "Confirmer &amp; Envoyer le Message",
        guestbook_title: "Livre d'or &amp; Messages",
        guestbook_modal_title: "Envoyé avec succès",
        guestbook_modal_desc: "Merci beaucoup ! Votre présence et vos vœux sont un grand honneur pour notre famille.",
        guestbook_modal_close: "Fermer",
        // Footer
        footer_quote: "“À bientôt au jour le plus heureux de notre vie !”",
        footer_date: "26 . 12 . 2026 | Trống Đồng Palace Cầu Giấy, Hanoï",
        // Audio
        audio_title_prefix: "Morceau",
        audio_of: "sur",
        audio_btn_mute_on: "Pause",
        audio_btn_mute_off: "Activer la musique",
        audio_alert: "Le navigateur bloque la lecture automatique. Veuillez cliquer sur 'Activer la musique' pour démarrer."
      }
    }
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
