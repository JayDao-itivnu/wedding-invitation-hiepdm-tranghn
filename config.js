/**
 * ==============================================================================
 * WEDDING INVITATION CONFIGURATION
 * Website Thiệp Cưới Online Phong Cách Apple Scrollytelling
 * Tone màu: Warm Beige & Burgundy (Be ấm - Đỏ đô sang trọng)
 * Internationalization: Multilingual 5 Languages
 * (Tiếng Việt 🇻🇳, Français 🇫🇷, English 🇬🇧, 한국어 🇰🇷, Español 🇪🇸)
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
      parents: "Ông Đào Mạnh Hiển & Bà Nguyễn Thị Hà",
      story: "Chàng kỹ sư công nghệ với trái tim ấm áp, luôn tin vào điều kỳ diệu của định mệnh và nụ cười rạng rỡ của người con gái ấy."
    },
    bride: {
      name: "Huyền Trang",
      fullName: "Nguyễn Huyền Trang",
      role: "Cô dâu",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      parents: "Ông Nguyễn Mạnh Hòa & Bà Nguyễn Thu Huyền",
      story: "Cô gái yêu nghệ thuật, dịu dàng và tinh tế. Nơi nào có em, nơi đó ngập tràn ánh nắng và sự an yên trong tâm hồn."
    },
    monogram: "H & T",
    logo: "logo-cuoi-H-T-tach-nen-2048px.svg",
    quote: "Tình yêu không chỉ là nhìn nhau, mà là cùng nhau nhìn về một hướng trên con đường phía trước."
  },

  // --- 2. THỜI GIAN & ĐỊA ĐIỂM TỔ CHỨC ---
  event: {
    dateTimeStr: "26/12/2026 - 10:00",
    solarDate: "2026-12-26T10:00:00+07:00",
    lunarDate: "Ngày 18 tháng 11 năm Bính Ngọ",
    
    venue: {
      name: "Trống Đồng Palace Cầu Giấy",
      hall: "Sảnh Crystal (Tầng 2)",
      address: "Số 72 Trần Đăng Ninh, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội",
      mapsNavigationUrl: "https://maps.app.goo.gl/2Jkdq6iVro3x8sPJ6",
      mapsEmbedIframeUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8638558814324!2d105.7909383758717!3d21.03813298061358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab37482f3c73%3A0xe541743916212e3e!2zVHLhu5FuZyDEkOG7k25nIFBhbGFjZSBD4bqndSBHaeG6pXk!5e0!3m2!1svi!2s!4v1709280000000!5m2!1svi!2s"
    },

    timeline: [
      {
        time: "10:00",
        title: "Đón Tiếp Khách Mời",
        desc: "Chào đón những vị khách quý, check-in chụp ảnh lưu niệm tại photobooth sang trọng cùng Cô dâu & Chú rể.",
        icon: "camera"
      },
      {
        time: "10:30",
        title: "Lễ Thành Hôn Trang Trọng",
        desc: "Thời khắc thiêng liêng trao nhẫn cưới, cắt bánh, rót rượu mừng và trao nhau lời hẹn ước trăm năm.",
        icon: "ring"
      },
      {
        time: "11:00",
        title: "Khai Tiệc Mừng Cưới",
        desc: "Thưởng thức tiệc ẩm thực tinh hoa cùng lời chúc phúc từ gia đình, người thân và bạn bè.",
        icon: "champagne"
      },
      {
        time: "11:45",
        title: "Giao Lưu & Âm Nhạc",
        desc: "Cùng hòa mình vào giai điệu ngọt ngào, những trò chơi thú vị và bốc thăm may mắn.",
        icon: "music"
      }
    ],

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

  // --- 3. BẢNG MÀU THIẾT KẾ ---
  colors: {
    primaryBg: "#F9F6F0",
    secondaryBg: "#EBE3D5",
    burgundyDeep: "#4A0E17",
    burgundyPrimary: "#721121",
    burgundyAccent: "#800020",
    champagneGold: "#C5A059",
    textDark: "#2B090E",
    textLight: "#F9F6F0"
  },

  // --- 4. NHẠC NỀN ---
  audio: {
    autoplayOnOpen: true,
    loopPlaylist: true,
    basePath: "audio/",
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
  video: {
    type: "youtube",
    youtubeId: "Z1BCujX3pw8",
    youtubeUrl: "https://www.youtube.com/embed/Z1BCujX3pw8?autoplay=0&mute=1&controls=1&rel=0&loop=1",
    html5Src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80",
    caption: "Từng khoảnh khắc bên nhau là từng viên gạch xây nên mái ấm hạnh phúc"
  },

  // --- 6. ALBUM ẢNH CƯỚI (PHOTO GALLERY & BENTO GRID) ---
  gallery: [
    {
      id: 1,
      title: "Khoảnh khắc đầu tiên",
      title_fr: "Premier Regard",
      title_en: "First Glance",
      title_ko: "첫 눈에 반한 순간",
      title_es: "Primera Mirada",
      subtitle: "Nụ cười ngày chung đôi",
      subtitle_fr: "Le sourire du destin",
      subtitle_en: "A destined smile",
      subtitle_ko: "운명 같은 미소",
      subtitle_es: "La sonrisa del destino",
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      aspect: "tall",
      desc: "Tràng Tiền, Hà Nội - Mùa thu 2025",
      desc_fr: "Tràng Tiền, Hanoï - Automne 2025",
      desc_en: "Trang Tien, Hanoi - Autumn 2025",
      desc_ko: "하노이 Trang Tien - 2025 가을",
      desc_es: "Tràng Tiền, Hanói - Otoño 2025"
    },
    {
      id: 2,
      title: "Lời hẹn ước",
      title_fr: "La Promesse",
      title_en: "The Promise",
      title_ko: "영원의 약속",
      title_es: "La Promesa",
      subtitle: "Ánh mắt trao nhau",
      subtitle_fr: "Regards complices",
      subtitle_en: "Gazing into your eyes",
      subtitle_ko: "마주보는 시선",
      subtitle_es: "Miradas cómplices",
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
      aspect: "wide",
      desc: "Hoàng hôn bên bờ biển",
      desc_fr: "Coucher de soleil au bord de mer",
      desc_en: "Sunset by the sea",
      desc_ko: "해질녘 바닷가에서",
      desc_es: "Atardecer junto al mar"
    },
    {
      id: 3,
      title: "Vòng tay ấm",
      title_fr: "Douce Étreinte",
      title_en: "Warm Embrace",
      title_ko: "따스한 포옹",
      title_es: "Cálido Abrazo",
      subtitle: "Bình yên là khi có anh",
      subtitle_fr: "La sérénité à tes côtés",
      subtitle_en: "Peace when with you",
      subtitle_ko: "그대와 함께하는 평온",
      subtitle_es: "Paz a tu lado",
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
      aspect: "square",
      desc: "Studio Secret Garden",
      desc_fr: "Studio Secret Garden",
      desc_en: "Secret Garden Studio",
      desc_ko: "시크릿 가든 스튜디오",
      desc_es: "Estudio Secret Garden"
    },
    {
      id: 4,
      title: "Ngày hạnh phúc",
      title_fr: "Jour de Bonheur",
      title_en: "Day of Joy",
      title_ko: "행복한 날",
      title_es: "Día de Dicha",
      subtitle: "Cùng em đi đến cuối con đường",
      subtitle_fr: "Vers un avenir partagé",
      subtitle_en: "Walking together forever",
      subtitle_ko: "평생을 함께 걸어갈 길",
      subtitle_es: "Juntos hasta el fin del camino",
      src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80",
      aspect: "tall",
      desc: "Nhà Thờ Lớn Hà Nội",
      desc_fr: "Cathédrale de Hanoï",
      desc_en: "Hanoi Cathedral",
      desc_ko: "하노이 대성당",
      desc_es: "Catedral de Hanói"
    },
    {
      id: 5,
      title: "Nâng ly chúc mừng",
      title_fr: "Portons un Toast",
      title_en: "Cheers to Love",
      title_ko: "축배를 들며",
      title_es: "Brindis de Amor",
      subtitle: "Những nụ cười ngập tràn niềm vui",
      subtitle_fr: "Éclats de rire et joie pure",
      subtitle_en: "Laughter filled with joy",
      subtitle_ko: "웃음 가득한 기쁨",
      subtitle_es: "Risas llenas de alegría",
      src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
      aspect: "square",
      desc: "Đà Lạt mù sương",
      desc_fr: "Đà Lạt dans la brume",
      desc_en: "Misty Da Lat",
      desc_ko: "안개 낀 달랏",
      desc_es: "Đà Lạt en la niebla"
    },
    {
      id: 6,
      title: "Mãi mãi bên nhau",
      title_fr: "Pour Toujours",
      title_en: "Forever Together",
      title_ko: "영원히 함께",
      title_es: "Juntos por Siempre",
      subtitle: "Khởi đầu của một chương mới",
      subtitle_fr: "L'aube d'un nouveau chapitre",
      subtitle_en: "Beginning of a new chapter",
      subtitle_ko: "새로운 시작의 장",
      subtitle_es: "Comienzo de un nuevo capítulo",
      src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1200&q=80",
      aspect: "wide",
      desc: "Trọn vẹn yêu thương",
      desc_fr: "Un amour éternel",
      desc_en: "Endless love",
      desc_ko: "완전한 사랑",
      desc_es: "Amor eterno"
    }
  ],

  // --- 7. CẤU HÌNH FORM RSVP & GOOGLE SHEETS ---
  rsvp: {
    googleScriptUrl: "", 
    mockMode: true,
    defaultGuestName: "Quý khách",
    successMessage: "Cảm ơn bạn rất nhiều! Sự hiện diện của bạn là niềm vinh hạnh to lớn cho gia đình chúng mình.",
    successMessage_fr: "Merci beaucoup ! Votre présence et vos vœux sont un grand honneur pour nos familles.",
    successMessage_en: "Thank you so much! Your presence and warm wishes are a great honor for our families.",
    successMessage_ko: "진심으로 감사드립니다! 참석과 따뜻한 축하의 말씀은 저희 양가에 큰 영광과 기쁨입니다.",
    successMessage_es: "¡Muchas gracias! Tu presencia y tus hermosos deseos son un inmenso honor para nuestras familias.",
    initialWishes: [
      {
        name: "Nguyễn Tuấn Anh",
        side: "Nhà Trai",
        side_fr: "Famille du Marié",
        side_en: "Groom's Friend",
        side_ko: "신랑 친구",
        side_es: "Amigo del Novio",
        time: "Hôm qua lúc 19:45",
        time_fr: "Hier à 19:45",
        time_en: "Yesterday at 7:45 PM",
        time_ko: "어제 오후 7:45",
        time_es: "Ayer a las 19:45",
        content: "Chúc hai bạn trăm năm hạnh phúc, đầu bạc răng long, sớm đón thiên thần nhỏ nhé! Nhất định mình sẽ có mặt sớm để nâng ly chúc mừng Hiệp!",
        content_fr: "Tous mes vœux de bonheur infini à vous deux ! Que votre amour dure toute une vie. Je serai là tôt pour porter un toast avec vous !",
        content_en: "Wishing both of you a lifetime of joy, everlasting love, and many blessings ahead! I will definitely arrive early to raise a glass with Hiep!",
        content_ko: "두 사람의 결혼을 진심으로 축하해! 백년해로하고 예쁜 천사도 곧 맞이하길 바라. 일찍 가서 축배 들게!",
        content_es: "¡Les deseo una vida entera de felicidad y amor incondicional! ¡Llegaré temprano para brindar con Hiệp!"
      },
      {
        name: "Lê Phương Thảo",
        side: "Nhà Gái",
        side_fr: "Famille de la Mariée",
        side_en: "Bride's Friend",
        side_ko: "신부 친구",
        side_es: "Amiga de la Novia",
        time: "Hôm nay lúc 08:30",
        time_fr: "Aujourd'hui à 08:30",
        time_en: "Today at 8:30 AM",
        time_ko: "오늘 오전 8:30",
        time_es: "Hoy a las 08:30",
        content: "Cô dâu xinh đẹp nhất quả đất! Chúc Trang và anh Hiệp luôn ngập tràn tiếng cười và thấu hiểu nhau trên chặng đường mới nhé!",
        content_fr: "La plus belle des mariées ! Que Trang et Hiệp partagent toujours des rires complices et une harmonie parfaite dans ce nouveau chapitre !",
        content_en: "The most gorgeous bride ever! Wishing Trang and Hiep endless laughter, harmony, and happiness on this wonderful journey!",
        content_ko: "세상에서 제일 아름다운 신부 Trang! 오빠와 함께 늘 웃음꽃만 가득하고 서로 깊이 아껴주는 가정이 되길 응원해!",
        content_es: "¡La novia más hermosa del mundo! ¡Que Trang y Hiệp estén siempre llenos de sonrisas y complicidad en esta nueva etapa!"
      },
      {
        name: "Trần Minh Quân",
        side: "Bạn Thân",
        side_fr: "Ami Proche",
        side_en: "Close Friend",
        side_ko: "절친",
        side_es: "Amigo Cercano",
        time: "Hôm nay lúc 09:15",
        time_fr: "Aujourd'hui à 09:15",
        time_en: "Today at 9:15 AM",
        time_ko: "오늘 오전 9:15",
        time_es: "Hoy a las 09:15",
        content: "Mừng ngày trọng đại của đôi bạn trẻ! Chúc cho tình yêu của hai bạn mãi nồng nàn và bền chặt như ngày đầu!",
        content_fr: "Félicitations pour votre grand jour ! Que votre amour demeure aussi vibrant et passionné qu'au premier jour !",
        content_en: "Congratulations on your big day! May your love remain as warm and unbreakable as the very first day!",
        content_ko: "두 청춘의 뜻깊은 날을 진심으로 축하한다! 첫 만남처럼 언제나 뜨겁고 변함없이 사랑하길 바랄게!",
        content_es: "¡Muchas felicidades en su gran día! ¡Que su amor siga siendo tan apasionado y sólido como el primer día!"
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
        envelope_screen_aria: "Màn hình mở thiệp",
        envelope_tag: "Thiệp hồng thân thương",
        envelope_guest_name: "Trân trọng kính mời: Quý khách",
        envelope_guest_prefix: "Trân trọng kính mời: ",
        envelope_guest_default: "Quý khách",
        envelope_seal_title: "Chạm để mở thiệp",
        envelope_couple: "Mạnh Hiệp & Huyền Trang",
        envelope_date: "26 . 12 . 2026 &bull; HÀ NỘI",
        envelope_btn_open: "Chạm để mở thiệp",
        envelope_audio_hint: "Giai điệu âm nhạc ngọt ngào sẽ tự động phát khi mở thiệp",
        // Audio Floating Bar
        audio_bar_title: "Điều khiển nhạc nền",
        audio_bar_aria: "Điều khiển nhạc nền",
        audio_prev_aria: "Bài trước",
        audio_next_aria: "Bài tiếp theo",
        audio_play_pause_aria: "Play / Tạm dừng",
        audio_title_prefix: "Bài",
        audio_of: "/",
        audio_btn_mute_on: "Tạm dừng",
        audio_btn_mute_off: "Bật nhạc",
        audio_playing_status: "Đang phát",
        audio_default_title: "Nhạc nền",
        audio_alert: "Trình duyệt chặn phát tự động. Vui lòng bấm nút 'Bật nhạc' để kích hoạt.",
        // Hero
        hero_save_date: "Save Our Date",
        hero_guest_name: "Kính gửi: Quý khách",
        hero_guest_prefix: "Kính gửi: ",
        hero_guest_default: "Quý khách",
        hero_title: "Lễ Thành Hôn",
        hero_couple: "Mạnh Hiệp & Huyền Trang",
        hero_date: "26 . 12 . 2026",
        hero_location: "HÀ NỘI",
        hero_scroll: "Cuộn để khám phá",
        hero_logo_alt: "Logo cưới Mạnh Hiệp & Huyền Trang",
        // Story
        story_title: "Lời Ngỏ &amp; Hẹn Ước",
        story_quote: "“Tình yêu không chỉ là nhìn nhau, mà là cùng nhau nhìn về một hướng trên con đường phía trước.”",
        story_body: "Trải qua những năm tháng cùng sẻ chia ngọt bùi, từ những buổi hẹn hò dưới tán cây Hà Nội đến những ước mơ về một mái ấm sum vầy, chúng mình nhận ra rằng hạnh phúc trọn vẹn nhất là khi có nhau. Ngày hôm nay, trong sự chúc phúc của hai bên gia đình, chúng mình trân trọng gửi tới bạn lời mời chân thành nhất để cùng chứng kiến thời khắc thiêng liêng này.",
        groom_title: "Chú Rể",
        groom_name: "Đào Mạnh Hiệp",
        groom_parents: "Con ông: Đào Mạnh Hiển &amp; Bà: Nguyễn Thị Hà",
        groom_img_alt: "Chú rể Mạnh Hiệp",
        groom_desc: "“Chàng kỹ sư với trái tim ấm áp, yêu nghệ thuật, luôn tin vào điều kỳ diệu của định mệnh và nụ cười rạng rỡ của người con gái ấy.”",
        bride_title: "Cô Dâu",
        bride_name: "Nguyễn Huyền Trang",
        bride_parents: "Con ông: Nguyễn Mạnh Hòa &amp; Bà: Nguyễn Thu Huyền",
        bride_img_alt: "Cô dâu Huyền Trang",
        bride_desc: "“Cô gái yêu nghệ thuật, dịu dàng và tinh tế. Nơi nào có em, nơi đó ngập tràn ánh nắng và sự an yên trong tâm hồn.”",
        // Countdown
        countdown_title: "Đếm Ngược Ngày Chung Đôi",
        countdown_subtitle: "Tiệc thành hôn của chúng mình sẽ được tổ chức vào",
        countdown_date_lunar: "Thứ Bảy, ngày 26 tháng 12 năm 2026 (Tức ngày 18 tháng 11 năm Bính Ngọ)",
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
        gallery_title: "Album ảnh cưới",
        gallery_heading: "Những khoảnh khắc ngọt ngào",
        gallery_subtitle: "Chạm vào từng bức ảnh để xem kích thước lớn toàn màn hình",
        gallery_modal_aria: "Xem ảnh toàn màn hình",
        gallery_close_aria: "Đóng cửa sổ ảnh",
        gallery_prev_aria: "Ảnh trước",
        gallery_next_aria: "Ảnh tiếp theo",
        // Timeline
        timeline_title: "Lịch Trình Hôn Lễ",
        timeline_heading: "Thời Gian &amp; Hoạt động",
        timeline_subtitle: "Trân trọng đón tiếp những người thân yêu đúng giờ để buổi lễ thêm phần trọn vẹn",
        timeline_event1_time: "10:00",
        timeline_event1_title: "Đón Tiếp Khách Mời",
        timeline_event1_desc: "Chào đón những vị khách quý, check-in chụp ảnh lưu niệm tại photobooth sang trọng cùng Cô dâu &amp; Chú rể.",
        timeline_event2_time: "10:30",
        timeline_event2_title: "Lễ Thành Hôn Trang Trọng",
        timeline_event2_desc: "Thời khắc thiêng liêng trao nhẫn cưới, cắt bánh, rót rượu mừng và trao nhau lời hẹn ước trăm năm.",
        timeline_event3_time: "11:00",
        timeline_event3_title: "Khai Tiệc Mừng Cưới",
        timeline_event3_desc: "Thưởng thức tiệc ẩm thực tinh hoa cùng lời chúc phúc từ gia đình, người thân và bạn bè thân thương.",
        timeline_event4_time: "11:45",
        timeline_event4_title: "Giao Lưu &amp; Âm Nhạc",
        timeline_event4_desc: "Cùng hòa mình vào giai điệu ngọt ngào, những trò chơi thú vị và những bức ảnh kỷ niệm khó quên.",
        dresscode_title: "Bảng Màu Trang Phục",
        dresscode_desc: "Để tạo nên những khung hình kỷ niệm hài hòa và ấm áp, gia đình rất mong quý khách lựa chọn trang phục theo bảng màu:",
        dresscode_note: "* Quý khách vui lòng tránh mặc trang phục màu trắng tinh khôi để tôn vinh bộ váy cưới của Cô dâu.",
        // Venue
        venue_title: "Địa Điểm Tổ Chức",
        venue_badge: "Trung Tâm Tiệc Cưới",
        venue_name: "Trống Đồng Palace Cầu Giấy",
        venue_hall: "Sảnh Crystal (Tầng 2)",
        venue_label_address: "Địa chỉ:",
        venue_address: "Số 72 Trần Đăng Ninh, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội",
        venue_label_time: "Thời gian:",
        venue_time: "10:00 - Thứ Bảy, 26/12/2026",
        venue_parking: "Bãi đỗ xe ô tô và xe máy rộng rãi, có nhân viên hướng dẫn tận tình.",
        venue_btn_map: "Chỉ đường trên Google Maps",
        venue_map_iframe_title: "Bản đồ Trống Đồng Palace Cầu Giấy",
        venue_map_touch: "Chạm để tương tác bản đồ",
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
        rsvp_submitting: "Đang gửi...",
        rsvp_alert_name: "Vui lòng nhập họ và tên của bạn!",
        rsvp_alert_error: "Có lỗi nhỏ khi gửi phản hồi, nhưng lời chúc của bạn đã được ghi nhận trên giao diện. Cảm ơn bạn!",
        guestbook_title: "Sổ Lưu Bút &amp; Lời Chúc Phúc",
        guestbook_modal_title: "Đã Gửi Thành Công",
        guestbook_modal_desc: "Cảm ơn bạn rất nhiều! Sự hiện diện và lời chúc của bạn là niềm vinh hạnh to lớn cho gia đình chúng mình.",
        guestbook_modal_close: "Đóng lại",
        guestbook_just_now: "Vừa xong",
        // Footer
        footer_quote: "“Hẹn gặp lại bạn trong ngày hạnh phúc nhất của chúng mình!”",
        footer_date: "26 . 12 . 2026 | Trống Đồng Palace Cầu Giấy, Hà Nội",
        // SEO
        seo_title: "Lễ Thành Hôn: Mạnh Hiệp & Huyền Trang | 26.12.2026",
        seo_description: "Trân trọng kính mời quý khách tới tham dự Lễ thành hôn của Mạnh Hiệp & Huyền Trang tại Trống Đồng Palace Cầu Giấy vào ngày 26/12/2026."
      },
      fr: {
        code: "fr",
        name: "Français",
        flag: "🇫🇷",
        // Envelope
        envelope_screen_aria: "Écran d'ouverture du faire-part",
        envelope_tag: "Faire-part de mariage",
        envelope_guest_name: "Chèrement invité(e) : Invité d'honneur",
        envelope_guest_prefix: "Chèrement invité(e) : ",
        envelope_guest_default: "Invité d'honneur",
        envelope_seal_title: "Touchez pour ouvrir l'invitation",
        envelope_couple: "Mạnh Hiệp &amp; Huyền Trang",
        envelope_date: "26 . 12 . 2026 &bull; HANOÏ",
        envelope_btn_open: "Ouvrir l'invitation",
        envelope_audio_hint: "Une mélodie douce se jouera automatiquement lors de l'ouverture",
        // Audio Floating Bar
        audio_bar_title: "Contrôle de la musique",
        audio_bar_aria: "Contrôle de la musique",
        audio_prev_aria: "Morceau précédent",
        audio_next_aria: "Morceau suivant",
        audio_play_pause_aria: "Lecture / Pause",
        audio_title_prefix: "Morceau",
        audio_of: "sur",
        audio_btn_mute_on: "Pause",
        audio_btn_mute_off: "Activer la musique",
        audio_playing_status: "En lecture",
        audio_default_title: "Musique d'ambiance",
        audio_alert: "Le navigateur bloque la lecture automatique. Veuillez cliquer sur 'Activer la musique' pour démarrer.",
        // Hero
        hero_save_date: "Réservez la Date",
        hero_guest_name: "Cher(e) invité(e) : Invité d'honneur",
        hero_guest_prefix: "Cher(e) invité(e) : ",
        hero_guest_default: "Invité d'honneur",
        hero_title: "Cérémonie de Mariage",
        hero_couple: "Mạnh Hiệp &amp; Huyền Trang",
        hero_date: "26 . 12 . 2026",
        hero_location: "HANOÏ",
        hero_scroll: "Faites défiler pour découvrir",
        hero_logo_alt: "Monogramme de mariage Mạnh Hiệp & Huyền Trang",
        // Story
        story_title: "Mot d'accueil &amp; Promesse",
        story_quote: "“L'amour ne consiste pas seulement à se regarder, mais à regarder ensemble dans la même direction sur le chemin à venir.”",
        story_body: "Après des années de partage et de douceur, des rendez-vous sous les arbres de Hanoï jusqu'au rêve d'un foyer chaleureux, nous réalisons que le bonheur suprême est d'être ensemble. Aujourd'hui, sous la bénédiction de nos deux familles, nous vous invitons sincèrement à venir témoigner de ce moment solennel.",
        groom_title: "Le Marié",
        groom_name: "Đào Mạnh Hiệp",
        groom_parents: "Fils de M. Đào Mạnh Hiển &amp; Mme Nguyễn Thị Hà",
        groom_img_alt: "Le marié Mạnh Hiệp",
        groom_desc: "“Un ingénieur au cœur chaleureux, aimant l'art, croyant toujours au miracle du destin et au sourire radieux de la femme aimée.”",
        bride_title: "La Mariée",
        bride_name: "Nguyễn Huyền Trang",
        bride_parents: "Fille de M. Nguyễn Mạnh Hòa &amp; Mme Nguyễn Thu Huyền",
        bride_img_alt: "La mariée Huyền Trang",
        bride_desc: "“Une femme aimant l'art, douce et raffinée. Là où elle se trouve règnent la lumière du soleil et la paix dans l'âme.”",
        // Countdown
        countdown_title: "Compte à rebours jusqu'au Grand Jour",
        countdown_subtitle: "Notre cérémonie de mariage aura lieu le",
        countdown_date_lunar: "Samedi 26 décembre 2026 (18 novembre Année du Cheval de Feu)",
        countdown_day: "Jours",
        countdown_hour: "Heures",
        countdown_minute: "Minutes",
        countdown_second: "Secondes",
        btn_add_calendar: "Ajouter au Calendrier",
        btn_download_ics: "Télécharger fichier Apple Calendar (.ics)",
        // Video
        video_title: "Moments d'Amour",
        video_subtitle: "Chaque regard, chaque sourire immortalisé dans le film souvenir",
        video_caption: "“Chaque moment passé ensemble est une brique bâtissant notre foyer heureux”",
        // Gallery
        gallery_title: "Album de Souvenirs",
        gallery_heading: "Instants Précieux &amp; Doux",
        gallery_subtitle: "Cliquez sur chaque photo pour l'afficher en plein écran",
        gallery_modal_aria: "Afficher en plein écran",
        gallery_close_aria: "Fermer",
        gallery_prev_aria: "Photo précédente",
        gallery_next_aria: "Photo suivante",
        // Timeline
        timeline_title: "Programme de la Cérémonie",
        timeline_heading: "Déroulement de la Journée",
        timeline_subtitle: "Nous serons ravis de vous accueillir à l'heure pour partager ces instants",
        timeline_event1_time: "10h00",
        timeline_event1_title: "Accueil des Invités",
        timeline_event1_desc: "Bienvenue aux invités, photos souvenirs au photobooth élégant avec les mariés.",
        timeline_event2_time: "10h30",
        timeline_event2_title: "Cérémonie de Mariage Solennelle",
        timeline_event2_desc: "Échange d'alliances, coupe du gâteau, toast et vœux d'amour éternel.",
        timeline_event3_time: "11h00",
        timeline_event3_title: "Ouverture du Banquet de Mariage",
        timeline_event3_desc: "Dégustation de mets gastronomiques et vœux chaleureux de la famille et des amis.",
        timeline_event4_time: "11h45",
        timeline_event4_title: "Échange &amp; Musique",
        timeline_event4_desc: "Plongez dans des mélodies douces, jeux conviviaux et instants inoubliables.",
        dresscode_title: "Code Vestimentaire Suggéré",
        dresscode_desc: "Pour créer des images souvenirs harmonieuses et chaleureuses, la famille souhaite que les invités choisissent leurs tenues selon les couleurs suivantes :",
        dresscode_note: "* Veuillez éviter de porter une robe blanche pure pour honorer la robe de mariée de la Mariée.",
        // Venue
        venue_title: "Lieu de Célébration",
        venue_badge: "Centre de Réception &amp; Mariage",
        venue_name: "Trống Đồng Palace Cầu Giấy",
        venue_hall: "Salle Crystal (2ème étage)",
        venue_label_address: "Adresse :",
        venue_address: "Số 72 Trần Đăng Ninh, Dịch Vọng, Cầu Giấy, Hanoï",
        venue_label_time: "Date &amp; Heure :",
        venue_time: "10h00 - Samedi 26/12/2026",
        venue_parking: "Grand parking pour voitures et deux-roues avec assistance sur place.",
        venue_btn_map: "Itinéraire sur Google Maps",
        venue_map_iframe_title: "Carte Google Maps Trống Đồng Palace Cầu Giấy",
        venue_map_touch: "Touchez pour interagir avec la carte",
        // RSVP
        rsvp_title: "Confirmation de Présence &amp; Vœux",
        rsvp_desc: "Votre présence est notre plus grande joie. Merci de nous confirmer votre venue pour un accueil des plus chaleureux.",
        rsvp_name_label: "Votre nom et prénom",
        rsvp_name_placeholder: "Ex: Jean Dupont, Marie...",
        rsvp_phone_label: "Numéro de téléphone",
        rsvp_phone_placeholder: "Ex: 06 12 34 56 78",
        rsvp_attendance_label: "Serez-vous présent(e) ?",
        rsvp_yes: "Oui, je serai présent(e)",
        rsvp_no: "Régret(te), je ne pourrai pas venir",
        rsvp_guests_label: "Nombre d'invités",
        rsvp_guests_1: "1 personne (moi seul)",
        rsvp_guests_2: "2 personnes (en couple / avec un ami)",
        rsvp_guests_3: "3 personnes (famille)",
        rsvp_guests_4: "4 personnes ou plus (famille)",
        rsvp_side_label: "Vous êtes invité(e) par :",
        rsvp_side_groom: "Famille du Marié (Hiệp)",
        rsvp_side_bride: "Famille de la Mariée (Trang)",
        rsvp_message_label: "Message de félicitations pour les Mariés",
        rsvp_message_placeholder: "Écrivez vos vœux les plus chaleureux pour Mạnh Hiệp & Huyền Trang ici...",
        rsvp_submit: "Envoyer ma Confirmation &amp; Vœux",
        rsvp_submitting: "Envoi en cours...",
        rsvp_alert_name: "Veuillez entrer votre nom et prénom !",
        rsvp_alert_error: "Une légère erreur est survenue lors de l'envoi, mais votre message a bien été affiché. Merci !",
        guestbook_title: "Livre d'Or &amp; Messages d'Amitié",
        guestbook_modal_title: "Envoyé avec Succès",
        guestbook_modal_desc: "Merci infiniment ! Votre présence et vos vœux sont un immense honneur et bonheur pour nos familles.",
        guestbook_modal_close: "Fermer",
        guestbook_just_now: "À l'instant",
        // Footer
        footer_quote: "“Au grand plaisir de vous retrouver pour le plus beau jour de notre vie !”",
        footer_date: "26 . 12 . 2026 | Trống Đồng Palace Cầu Giấy, Hanoï",
        // SEO
        seo_title: "Cérémonie de Mariage : Mạnh Hiệp & Huyền Trang | 26.12.2026",
        seo_description: "Nous avons le plaisir de vous inviter à la cérémonie de mariage de Mạnh Hiệp & Huyền Trang à Trống Đồng Palace Cầu Giấy le 26 décembre 2026."
      },
      en: {
        code: "en",
        name: "English",
        flag: "🇬🇧",
        // Envelope
        envelope_screen_aria: "Wedding invitation envelope screen",
        envelope_tag: "Wedding Invitation",
        envelope_guest_name: "Cordially Invited: Honored Guest",
        envelope_guest_prefix: "Cordially Invited: ",
        envelope_guest_default: "Honored Guest",
        envelope_seal_title: "Tap to open the invitation",
        envelope_couple: "Mạnh Hiệp &amp; Huyền Trang",
        envelope_date: "DECEMBER 26, 2026 &bull; HANOI",
        envelope_btn_open: "Open Invitation",
        envelope_audio_hint: "Romantic music will play automatically upon opening",
        // Audio Floating Bar
        audio_bar_title: "Background Music Control",
        audio_bar_aria: "Background Music Control",
        audio_prev_aria: "Previous Track",
        audio_next_aria: "Next Track",
        audio_play_pause_aria: "Play / Pause",
        audio_title_prefix: "Track",
        audio_of: "of",
        audio_btn_mute_on: "Pause",
        audio_btn_mute_off: "Play Music",
        audio_playing_status: "Playing",
        audio_default_title: "Background Music",
        audio_alert: "Autoplay was blocked by your browser. Please tap 'Play Music' to start.",
        // Hero
        hero_save_date: "Save Our Date",
        hero_guest_name: "To: Honored Guest",
        hero_guest_prefix: "To: ",
        hero_guest_default: "Honored Guest",
        hero_title: "Wedding Ceremony",
        hero_couple: "Mạnh Hiệp &amp; Huyền Trang",
        hero_date: "26 . 12 . 2026",
        hero_location: "HANOI",
        hero_scroll: "Scroll to explore",
        hero_logo_alt: "Wedding Monogram Mạnh Hiệp & Huyền Trang",
        // Story
        story_title: "Our Story &amp; Vows",
        story_quote: "“Love does not consist in gazing at each other, but in looking outward together in the same direction.”",
        story_body: "Through years of sweet memories, from dates under the trees of Hanoi to dreams of building a warm home, we realized true happiness is simply having each other. Today, with the blessing of our families, we sincerely invite you to witness this sacred moment.",
        groom_title: "The Groom",
        groom_name: "Đào Mạnh Hiệp",
        groom_parents: "Son of Mr. Đào Mạnh Hiển &amp; Mrs. Nguyễn Thị Hà",
        groom_img_alt: "The Groom Mạnh Hiệp",
        groom_desc: "“A tech engineer with a warm heart, passionate about art, who always believes in destiny and the radiant smile of the girl he loves.”",
        bride_title: "The Bride",
        bride_name: "Nguyễn Huyền Trang",
        bride_parents: "Daughter of Mr. Nguyễn Mạnh Hòa &amp; Mrs. Nguyễn Thu Huyền",
        bride_img_alt: "The Bride Huyền Trang",
        bride_desc: "“An art lover, gentle and refined. Wherever she is, warmth and inner peace follow like sunshine.”",
        // Countdown
        countdown_title: "Countdown to Our Big Day",
        countdown_subtitle: "Our wedding celebration will be held on",
        countdown_date_lunar: "Saturday, December 26, 2026 (November 18, Year of the Fire Horse)",
        countdown_day: "Days",
        countdown_hour: "Hours",
        countdown_minute: "Minutes",
        countdown_second: "Seconds",
        btn_add_calendar: "Add to Calendar",
        btn_download_ics: "Download Apple Calendar (.ics)",
        // Video
        video_title: "Moments of Love",
        video_subtitle: "Every gaze and smile captured forever in our wedding film",
        video_caption: "“Every moment together is a brick building our happy home”",
        // Gallery
        gallery_title: "Wedding Album",
        gallery_heading: "Sweet Memories",
        gallery_subtitle: "Tap any photo to view in full screen",
        gallery_modal_aria: "Full screen photo view",
        gallery_close_aria: "Close",
        gallery_prev_aria: "Previous Photo",
        gallery_next_aria: "Next Photo",
        // Timeline
        timeline_title: "Wedding Schedule",
        timeline_heading: "Time &amp; Activities",
        timeline_subtitle: "We look forward to welcoming our loved ones on time for a wonderful celebration",
        timeline_event1_time: "10:00 AM",
        timeline_event1_title: "Guest Welcome &amp; Reception",
        timeline_event1_desc: "Welcome guests, check-in and take keepsake photos at the photobooth with the Bride &amp; Groom.",
        timeline_event2_time: "10:30 AM",
        timeline_event2_title: "Formal Wedding Ceremony",
        timeline_event2_desc: "Exchange of rings, wedding cake cutting, champagne toast, and lifelong vows.",
        timeline_event3_time: "11:00 AM",
        timeline_event3_title: "Wedding Banquet",
        timeline_event3_desc: "Enjoy exquisite cuisine with blessings from family, relatives, and dear friends.",
        timeline_event4_time: "11:45 AM",
        timeline_event4_title: "Music &amp; Social Gathering",
        timeline_event4_desc: "Immerse in sweet melodies, fun games, and unforgettable memories.",
        dresscode_title: "Suggested Dress Code",
        dresscode_desc: "To create harmonious and warm photos, our families kindly suggest dressing according to the color palette:",
        dresscode_note: "* Guests are kindly requested to avoid wearing pure white to honor the Bride's wedding gown.",
        // Venue
        venue_title: "Event Location",
        venue_badge: "Wedding &amp; Convention Center",
        venue_name: "Trống Đồng Palace Cầu Giấy",
        venue_hall: "Crystal Hall (2nd Floor)",
        venue_label_address: "Address:",
        venue_address: "No. 72 Tran Dang Ninh, Dich Vong Ward, Cau Giay District, Hanoi",
        venue_label_time: "Date &amp; Time:",
        venue_time: "10:00 AM - Saturday, December 26, 2026",
        venue_parking: "Spacious parking for cars and motorbikes with dedicated attendants.",
        venue_btn_map: "Get Directions on Google Maps",
        venue_map_iframe_title: "Google Maps Trống Đồng Palace Cầu Giấy",
        venue_map_touch: "Tap to interact with map",
        // RSVP
        rsvp_title: "RSVP &amp; Best Wishes",
        rsvp_desc: "Your presence is our greatest joy. Please let us know if you can attend so we can prepare the warmest welcome.",
        rsvp_name_label: "Your Full Name",
        rsvp_name_placeholder: "e.g., John Doe, Emily...",
        rsvp_phone_label: "Phone Number",
        rsvp_phone_placeholder: "e.g., +84 912 345 678",
        rsvp_attendance_label: "Will you attend?",
        rsvp_yes: "Yes, I will attend",
        rsvp_no: "Regretfully, I cannot attend",
        rsvp_guests_label: "Number of Guests",
        rsvp_guests_1: "1 person (Just me)",
        rsvp_guests_2: "2 persons (With partner / friend)",
        rsvp_guests_3: "3 persons (Family)",
        rsvp_guests_4: "4+ persons (Family)",
        rsvp_side_label: "You are a guest of:",
        rsvp_side_groom: "Groom's Family (Hiệp)",
        rsvp_side_bride: "Bride's Family (Trang)",
        rsvp_message_label: "Wishes for Bride &amp; Groom",
        rsvp_message_placeholder: "Send your warmest wishes to Mạnh Hiệp & Huyền Trang here...",
        rsvp_submit: "Confirm &amp; Send Wishes",
        rsvp_submitting: "Sending...",
        rsvp_alert_name: "Please enter your name!",
        rsvp_alert_error: "A minor error occurred, but your message has been recorded on the page. Thank you!",
        guestbook_title: "Guestbook &amp; Wishes",
        guestbook_modal_title: "Sent Successfully",
        guestbook_modal_desc: "Thank you so much! Your presence and warm wishes mean the world to our families.",
        guestbook_modal_close: "Close",
        guestbook_just_now: "Just now",
        // Footer
        footer_quote: "“Looking forward to celebrating our happiest day with you!”",
        footer_date: "December 26, 2026 | Trống Đồng Palace Cầu Giấy, Hanoi",
        // SEO
        seo_title: "Wedding Ceremony: Mạnh Hiệp & Huyền Trang | 26.12.2026",
        seo_description: "Cordially invite you to celebrate the wedding ceremony of Mạnh Hiệp & Huyền Trang at Trống Đồng Palace Cầu Giấy on December 26, 2026."
      },
      ko: {
        code: "ko",
        name: "한국어",
        flag: "🇰🇷",
        // Envelope
        envelope_screen_aria: "청첩장 봉투 열기 화면",
        envelope_tag: "소중한 청첩장",
        envelope_guest_name: "정중히 모십니다: 귀빈 여러분",
        envelope_guest_prefix: "정중히 모십니다: ",
        envelope_guest_default: "귀빈 여러분",
        envelope_seal_title: "터치하여 청첩장 열기",
        envelope_couple: "Mạnh Hiệp &amp; Huyền Trang",
        envelope_date: "2026년 12월 26일 &bull; 하노이",
        envelope_btn_open: "청첩장 열기",
        envelope_audio_hint: "봉투를 열면 감미로운 음악이 자동으로 재생됩니다",
        // Audio Floating Bar
        audio_bar_title: "배경음악 제어",
        audio_bar_aria: "배경음악 제어",
        audio_prev_aria: "이전 곡",
        audio_next_aria: "다음 곡",
        audio_play_pause_aria: "재생 / 일시정지",
        audio_title_prefix: "트랙",
        audio_of: "/",
        audio_btn_mute_on: "일시정지",
        audio_btn_mute_off: "음악 재생",
        audio_playing_status: "재생 중",
        audio_default_title: "배경음악",
        audio_alert: "브라우저에서 자동 재생이 차단되었습니다. '음악 재생'을 눌러주세요.",
        // Hero
        hero_save_date: "Save Our Date",
        hero_guest_name: "귀하: 소중한 분",
        hero_guest_prefix: "귀하: ",
        hero_guest_default: "소중한 분",
        hero_title: "결혼식에 초대합니다",
        hero_couple: "Mạnh Hiệp &amp; Huyền Trang",
        hero_date: "2026 . 12 . 26",
        hero_location: "하노이",
        hero_scroll: "스크롤하여 확인하기",
        hero_logo_alt: "Mạnh Hiệp & Huyền Trang 웨딩 로고",
        // Story
        story_title: "초대의 말씀 &amp; 서약",
        story_quote: "“사랑이란 서로 마주보는 것이 아니라, 함께 같은 방향을 바라보는 것입니다.”",
        story_body: "하노이의 가로수 아래 첫 만남부터 따뜻한 가정을 꿈꾸기까지, 서로가 곁에 있어 가장 온전한 행복임을 깨달았습니다. 양가 부모님의 축복 속에서, 저희 두 사람의 소중한 시작을 함께 지켜봐 주시길 진심으로 청합니다.",
        groom_title: "신랑",
        groom_name: "Đào Mạnh Hiệp",
        groom_parents: "Đào Mạnh Hiển &amp; Nguyễn Thị Hà 의 아들",
        groom_img_alt: "신랑 Mạnh Hiệp",
        groom_desc: "“따뜻한 마음과 예술을 사랑하는 엔지니어, 운명과 사랑하는 이의 환한 미소를 항상 믿는 사람.”" ,
        bride_title: "신부",
        bride_name: "Nguyễn Huyền Trang",
        bride_parents: "Nguyễn Mạnh Hòa &amp; Nguyễn Thu Huyền 의 딸",
        bride_img_alt: "신부 Huyền Trang",
        bride_desc: "“예술을 사랑하고 다정하며 섬세한 사람. 그녀가 있는 곳에는 항상 햇살과 평온이 머뭅니다.”",
        // Countdown
        countdown_title: "우리의 날까지 카운트다운",
        countdown_subtitle: "저희 두 사람의 결혼식이 열립니다",
        countdown_date_lunar: "2026년 12월 26일 토요일 (음력 11월 18일)",
        countdown_day: "일",
        countdown_hour: "시간",
        countdown_minute: "분",
        countdown_second: "초",
        btn_add_calendar: "캘린더에 일정 추가",
        btn_download_ics: "Apple 캘린더 파일 다운로드 (.ics)",
        // Video
        video_title: "사랑의 순간들",
        video_subtitle: "모든 눈빛과 미소를 영상 속에 영원히 담았습니다",
        video_caption: "“함께하는 모든 순간이 행복한 가정을 세우는 벽돌입니다”",
        // Gallery
        gallery_title: "웨딩 앨범",
        gallery_heading: "행복한 순간들",
        gallery_subtitle: "사진을 터치하면 전체 화면으로 감상하실 수 있습니다",
        gallery_modal_aria: "사진 전체 화면 보기",
        gallery_close_aria: "닫기",
        gallery_prev_aria: "이전 사진",
        gallery_next_aria: "다음 사진",
        // Timeline
        timeline_title: "예식 일정",
        timeline_heading: "시간 &amp; 프로그램",
        timeline_subtitle: "귀한 걸음 헛되지 않도록 정성껏 모시겠습니다",
        timeline_event1_time: "10:00",
        timeline_event1_title: "하객 맞이 &amp; 포토타임",
        timeline_event1_desc: "귀빈 맞이, 포토부스 기념사진 촬영 및 신랑·신부와의 만남.",
        timeline_event2_time: "10:30",
        timeline_event2_title: "본식 (결혼 예배/예식)",
        timeline_event2_desc: "예물 교환, 웨딩 케이크 커팅, 축배 및 영원한 사랑의 서약.",
        timeline_event3_time: "11:00",
        timeline_event3_title: "피로연 &amp; 식사",
        timeline_event3_desc: "정성껏 준비한 음식과 함께 가족 및 지인들의 따뜻한 축하를 나눕니다.",
        timeline_event4_time: "11:45",
        timeline_event4_title: "축하 음악 &amp; 교제",
        timeline_event4_desc: "달콤한 음악과 즐거운 이벤트, 잊지 못할 추억을 함께 만듭니다.",
        dresscode_title: "드레스코드 안내",
        dresscode_desc: "조화롭고 따뜻한 사진을 위해 아래 컬러 팔레트를 참고해 주시길 부탁드립니다:",
        dresscode_note: "* 신부의 웨딩드레스를 위해 순백색(White) 의상은 삼가해 주시길 부탁드립니다.",
        // Venue
        venue_title: "오시는 길",
        venue_badge: "웨딩 &amp; 컨벤션 홀",
        venue_name: "Trống Đồng Palace Cầu Giấy",
        venue_hall: "Crystal Hall (2층)",
        venue_label_address: "주소:",
        venue_address: "하노이 Cầu Giấy 구, Dịch Vọng 동, Trần Đăng Ninh 72번지",
        venue_label_time: "일시:",
        venue_time: "2026년 12월 26일 토요일 오전 10:00",
        venue_parking: "전용 주차 안내 요원이 배치된 넓은 차량 및 오토바이 주차장 완비.",
        venue_btn_map: "Google 지도에서 길찾기",
        venue_map_iframe_title: "Trống Đồng Palace Cầu Giấy Google 지도",
        venue_map_touch: "지도를 터치하여 이동",
        // RSVP
        rsvp_title: "참석 여부 전달 &amp; 축하 메시지",
        rsvp_desc: "귀한 걸음으로 자리를 빛내주시면 감사하겠습니다. 정성껏 맞이할 수 있도록 참석 여부를 알려주세요.",
        rsvp_name_label: "성함",
        rsvp_name_placeholder: "예: 김민수, 이영희...",
        rsvp_phone_label: "연락처",
        rsvp_phone_placeholder: "예: 010-1234-5678",
        rsvp_attendance_label: "참석 여부",
        rsvp_yes: "참석합니다",
        rsvp_no: "마음으로 축하합니다 (불참)",
        rsvp_guests_label: "동반 인원",
        rsvp_guests_1: "본인 1명",
        rsvp_guests_2: "동반 1인 포함 (총 2명)",
        rsvp_guests_3: "가족 동반 (총 3명)",
        rsvp_guests_4: "가족 동반 (4명 이상)",
        rsvp_side_label: "구분:",
        rsvp_side_groom: "신랑 측 (Hiệp)",
        rsvp_side_bride: "신부 측 (Trang)",
        rsvp_message_label: "신랑 &amp; 신부에게 전하는 축하 메시지",
        rsvp_message_placeholder: "Mạnh Hiệp & Huyền Trang 부부에게 따뜻한 축복의 글을 남겨주세요...",
        rsvp_submit: "참석 확인 &amp; 축하 글 보내기",
        rsvp_submitting: "전송 중...",
        rsvp_alert_name: "성함을 입력해 주세요!",
        rsvp_alert_error: "일시적인 오류가 발생했으나 메시지는 화면에 정상 기록되었습니다. 감사합니다!",
        guestbook_title: "방명록 &amp; 축하의 글",
        guestbook_modal_title: "전송 완료",
        guestbook_modal_desc: "진심으로 감사드립니다! 보내주신 축복과 따뜻한 마음에 깊이 감사드립니다.",
        guestbook_modal_close: "닫기",
        guestbook_just_now: "방금 전",
        // Footer
        footer_quote: "“저희의 가장 기쁜 날에 소중한 분들을 모십니다!”",
        footer_date: "2026 . 12 . 26 | Trống Đồng Palace Cầu Giấy, 하노이",
        // SEO
        seo_title: "결혼식: Mạnh Hiệp & Huyền Trang | 2026.12.26",
        seo_description: "2026년 12월 26일 Trống Đồng Palace Cầu Giấy에서 열리는 Mạnh Hiệp & Huyền Trang의 결혼식에 정중히 초대합니다."
      },
      es: {
        code: "es",
        name: "Español",
        flag: "🇪🇸",
        // Envelope
        envelope_screen_aria: "Pantalla de apertura de la invitación",
        envelope_tag: "Invitación de Boda",
        envelope_guest_name: "Cordialmente Invitado(a): Invitado de Honor",
        envelope_guest_prefix: "Cordialmente Invitado(a): ",
        envelope_guest_default: "Invitado de Honor",
        envelope_seal_title: "Toque para abrir la invitación",
        envelope_couple: "Mạnh Hiệp &amp; Huyền Trang",
        envelope_date: "26 . 12 . 2026 &bull; HANÓI",
        envelope_btn_open: "Abrir Invitación",
        envelope_audio_hint: "Una dulce melodía comenzará a reproducirse al abrir",
        // Audio Floating Bar
        audio_bar_title: "Control de Música",
        audio_bar_aria: "Control de Música",
        audio_prev_aria: "Canción anterior",
        audio_next_aria: "Canción siguiente",
        audio_play_pause_aria: "Reproducir / Pausar",
        audio_title_prefix: "Pista",
        audio_of: "de",
        audio_btn_mute_on: "Pausar",
        audio_btn_mute_off: "Activar Música",
        audio_playing_status: "Reproduciendo",
        audio_default_title: "Música de Fondo",
        audio_alert: "El navegador bloqueó la reproducción automática. Toque 'Activar Música' para iniciar.",
        // Hero
        hero_save_date: "Reserva la Fecha",
        hero_guest_name: "Estimado(a): Invitado de Honor",
        hero_guest_prefix: "Estimado(a): ",
        hero_guest_default: "Invitado de Honor",
        hero_title: "Ceremonia de Boda",
        hero_couple: "Mạnh Hiệp &amp; Huyền Trang",
        hero_date: "26 . 12 . 2026",
        hero_location: "HANÓI",
        hero_scroll: "Desliza para explorar",
        hero_logo_alt: "Monograma de Boda Mạnh Hiệp & Huyền Trang",
        // Story
        story_title: "Nuestra Historia &amp; Promesa",
        story_quote: "“El amor no consiste en mirarse el uno al otro, sino en mirar juntos hacia la misma dirección.”",
        story_body: "A lo largo de los años compartiendo momentos dulces, desde citas bajo los árboles de Hanói hasta el sueño de construir un hogar cálido, comprendimos que la verdadera felicidad es estar juntos. Hoy, con la bendición de nuestras familias, te invitamos de corazón a ser testigo de este momento sagrado.",
        groom_title: "El Novio",
        groom_name: "Đào Mạnh Hiệp",
        groom_parents: "Hijo de D. Đào Mạnh Hiển y Dña. Nguyễn Thị Hà",
        groom_img_alt: "El Novio Mạnh Hiệp",
        groom_desc: "“Un ingeniero de corazón cálido y amante del arte, que cree en los milagros del destino y en la sonrisa radiante de la mujer que ama.”",
        bride_title: "La Novia",
        bride_name: "Nguyễn Huyền Trang",
        bride_parents: "Hija de D. Nguyễn Mạnh Hòa y Dña. Nguyễn Thu Huyền",
        bride_img_alt: "La Novia Huyền Trang",
        bride_desc: "“Apasionada del arte, dulce y delicada. Dondequiera que esté, la calidez y la serenidad la acompañan como la luz del sol.”",
        // Countdown
        countdown_title: "Cuenta Regresiva para Nuestro Gran Día",
        countdown_subtitle: "Nuestra boda se celebrará el",
        countdown_date_lunar: "Sábado, 26 de diciembre de 2026 (18 de noviembre, Año del Caballo de Fuego)",
        countdown_day: "Días",
        countdown_hour: "Horas",
        countdown_minute: "Minutos",
        countdown_second: "Segundos",
        btn_add_calendar: "Añadir al Calendario",
        btn_download_ics: "Descargar archivo Apple Calendar (.ics)",
        // Video
        video_title: "Momentos de Amor",
        video_subtitle: "Cada mirada y sonrisa capturadas para siempre en nuestro video de bodas",
        video_caption: "“Cada instante juntos es un ladrillo construyendo nuestro hogar feliz”",
        // Gallery
        gallery_title: "Álbum de Recuerdos",
        gallery_heading: "Momentos Inolvidables",
        gallery_subtitle: "Toque cualquier foto para verla en pantalla completa",
        gallery_modal_aria: "Ver foto en pantalla completa",
        gallery_close_aria: "Cerrar",
        gallery_prev_aria: "Foto anterior",
        gallery_next_aria: "Foto siguiente",
        // Timeline
        timeline_title: "Programa del Evento",
        timeline_heading: "Horario &amp; Actividades",
        timeline_subtitle: "Esperamos con alegría recibir puntualmente a nuestros seres queridos para compartir este día especial",
        timeline_event1_time: "10:00",
        timeline_event1_title: "Recepción de Invitados",
        timeline_event1_desc: "Bienvenida a los invitados, fotos de recuerdo en el photobooth con los Novios.",
        timeline_event2_time: "10:30",
        timeline_event2_title: "Ceremonia Nupcial Solemne",
        timeline_event2_desc: "Intercambio de alianzas, corte de tarta nupcial, brindis de champán y votos de amor eterno.",
        timeline_event3_time: "11:00",
        timeline_event3_title: "Banquete de Bodas",
        timeline_event3_desc: "Degustación de alta gastronomía junto con las bendiciones de familiares y amigos.",
        timeline_event4_time: "11:45",
        timeline_event4_title: "Música &amp; Celebración",
        timeline_event4_desc: "Música en vivo, actividades divertidas y recuerdos inolvidables.",
        dresscode_title: "Código de Vestimenta",
        dresscode_desc: "Para lograr fotos armoniosas y cálidas, sugerimos a los invitados vestirse según la siguiente paleta de colores:",
        dresscode_note: "* Se ruega evitar vestidos de color blanco puro para respetar el vestido de la Novia.",
        // Venue
        venue_title: "Lugar de la Celebración",
        venue_badge: "Centro de Bodas &amp; Eventos",
        venue_name: "Trống Đồng Palace Cầu Giấy",
        venue_hall: "Salón Crystal (2º Piso)",
        venue_label_address: "Dirección:",
        venue_address: "Nº 72 Trần Đăng Ninh, Dịch Vọng, Cầu Giấy, Hanói",
        venue_label_time: "Fecha y Hora:",
        venue_time: "10:00 - Sábado, 26/12/2026",
        venue_parking: "Amplio estacionamiento para coches y motos con personal de asistencia.",
        venue_btn_map: "Cómo llegar en Google Maps",
        venue_map_iframe_title: "Mapa Google Maps Trống Đồng Palace Cầu Giấy",
        venue_map_touch: "Toque para interactuar con el mapa",
        // RSVP
        rsvp_title: "Confirmación de Asistencia &amp; Mensajes",
        rsvp_desc: "Tu presencia es nuestra mayor alegría. Por favor confirma tu asistencia para recibirte de la mejor manera.",
        rsvp_name_label: "Nombre completo",
        rsvp_name_placeholder: "Ej: Carlos Ruiz, Laura...",
        rsvp_phone_label: "Número de teléfono",
        rsvp_phone_placeholder: "Ej: +34 612 345 678",
        rsvp_attendance_label: "¿Asistirás?",
        rsvp_yes: "Sí, asistiré con gusto",
        rsvp_no: "Lamentablemente no podré asistir",
        rsvp_guests_label: "Número de invitados",
        rsvp_guests_1: "1 persona (Solo yo)",
        rsvp_guests_2: "2 personas (Con pareja / amigo)",
        rsvp_guests_3: "3 personas (Familia)",
        rsvp_guests_4: "4 personas o más (Familia)",
        rsvp_side_label: "Invitado(a) por parte de:",
        rsvp_side_groom: "Familia del Novio (Hiệp)",
        rsvp_side_bride: "Familia de la Novia (Trang)",
        rsvp_message_label: "Mensaje para los Novios",
        rsvp_message_placeholder: "Escribe tus mejores deseos para Mạnh Hiệp & Huyền Trang aquí...",
        rsvp_submit: "Confirmar Asistencia &amp; Enviar Votos",
        rsvp_submitting: "Enviando...",
        rsvp_alert_name: "¡Por favor ingresa tu nombre y apellido!",
        rsvp_alert_error: "Ocurrió un pequeño error al enviar, pero tu mensaje ha quedado guardado en la página. ¡Gracias!",
        guestbook_title: "Libro de Visitas &amp; Felicitaciones",
        guestbook_modal_title: "Enviado con Éxito",
        guestbook_modal_desc: "¡Muchas gracias! Tu presencia y tus hermosos deseos son un inmenso honor para nuestras familias.",
        guestbook_modal_close: "Cerrar",
        guestbook_just_now: "Hace un momento",
        // Footer
        footer_quote: "“¡Esperamos verte en el día más feliz de nuestras vidas!”",
        footer_date: "26 . 12 . 2026 | Trống Đồng Palace Cầu Giấy, Hanói",
        // SEO
        seo_title: "Ceremonia de Boda: Mạnh Hiệp & Huyền Trang | 26.12.2026",
        seo_description: "Te invitamos cordialmente a la ceremonia de boda de Mạnh Hiệp & Huyền Trang en Trống Đồng Palace Cầu Giấy el 26 de diciembre de 2026."
      }
    }
  }
};

/**
 * ==============================================================================
 * GOOGLE DRIVE IMAGE HELPER FUNCTION
 * ==============================================================================
 */
function parseGoogleDriveUrl(urlOrId, fallbackUrl = "") {
  if (!urlOrId || typeof urlOrId !== "string") {
    return fallbackUrl || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80";
  }

  const trimmed = urlOrId.trim();

  if (!trimmed.includes("drive.google.com") && !trimmed.includes("docs.google.com")) {
    const isBareGoogleId = /^[a-zA-Z0-9_-]{25,50}$/.test(trimmed);
    if (!isBareGoogleId) {
      return trimmed;
    }
  }

  let fileId = "";
  const matchFileD = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (matchFileD && matchFileD[1]) {
    fileId = matchFileD[1];
  }

  if (!fileId) {
    const matchIdParam = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (matchIdParam && matchIdParam[1]) {
      fileId = matchIdParam[1];
    }
  }

  if (!fileId && /^[a-zA-Z0-9_-]{25,50}$/.test(trimmed)) {
    fileId = trimmed;
  }

  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  return trimmed || fallbackUrl;
}

if (typeof window !== "undefined") {
  window.WEDDING_CONFIG = WEDDING_CONFIG;
  window.parseGoogleDriveUrl = parseGoogleDriveUrl;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { WEDDING_CONFIG, parseGoogleDriveUrl };
}
