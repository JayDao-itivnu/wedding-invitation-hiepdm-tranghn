/**
 * ==============================================================================
 * WEDDING INVITATION APPLICATION SCRIPT
 * Style: Apple Scrollytelling, Lenis Smooth Scroll, GSAP, Canvas Confetti
 * Tone: Warm Beige & Burgundy
 * ==============================================================================
 */

(function () {
  "use strict";

  // --- STATE VARIABLES ---
  let isEnvelopeOpened = false;
  let bgMusicAudio = null;
  let isAudioPlaying = false;
  let lenisInstance = null;
  let activeLightboxIndex = 0;
  let currentTrackIndex = 0;
  let audioInitialized = false;
  let currentLang = "vi";

  // --- 1. INITIALIZATION ON DOM READY ---
  document.addEventListener("DOMContentLoaded", () => {
    // 0. Khóa cơ chế ghi nhớ vị trí cuộn của trình duyệt (tránh bị nhảy xuống đáy trang khi F5)
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    initPersonalizedGreeting();
    initAudio();
    initI18n();
    initEnvelope();
    initLenisAndGSAP();
    initCountdown();
    initCalendarActions();
    initGalleryAndLightbox();
    initTimelineScroll();
    initMapShield();
    initRSVPAndGuestbook();
  });

  // --- 2. PERSONALIZED GREETING (?to=... hoặc ?guest=...) ---
  function initPersonalizedGreeting() {
    const params = new URLSearchParams(window.location.search);
    const guestParam = params.get("to") || params.get("guest") || params.get("name");

    const guestGreetingEl = document.getElementById("envelope-guest-name");
    const rsvpNameInput = document.getElementById("rsvp-name");
    const heroGuestGreetingEl = document.getElementById("hero-guest-name");

    let formattedName = WEDDING_CONFIG.rsvp.defaultGuestName;
    if (guestParam) {
      formattedName = decodeURIComponent(guestParam.replace(/\+/g, " ")).trim();
    }

    if (guestGreetingEl) {
      guestGreetingEl.textContent = `Trân trọng kính mời: ${formattedName}`;
    }
    if (heroGuestGreetingEl) {
      heroGuestGreetingEl.textContent = `Kính gửi: ${formattedName}`;
    }
    if (rsvpNameInput && guestParam) {
      rsvpNameInput.value = formattedName;
    }
  }

  // --- 2.5. NGÔN NGỮ (I18N) ---
  function initI18n() {
    const cfg = WEDDING_CONFIG.i18n || {};
    const savedLang = localStorage.getItem("wedding-lang") || cfg.defaultLang || "vi";
    currentLang = savedLang;

    // Áp dụng ngôn ngữ đã lưu
    translate(currentLang);

    // Sự kiện click nút cờ
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const lang = btn.getAttribute("data-lang");
        if (!lang) return;

        // Cập nhật UI nút cờ
        document.querySelectorAll(".lang-btn").forEach((b) => {
          if (b.getAttribute("data-lang") === lang) {
            b.classList.add("lang-active");
            b.classList.remove("bg-transparent", "text-wedding-goldLight/70");
            b.classList.add("bg-wedding-gold/10", "text-wedding-goldLight");
          } else {
            b.classList.remove("lang-active");
            b.classList.remove("bg-wedding-gold/10", "text-wedding-goldLight");
            b.classList.add("bg-transparent", "text-wedding-goldLight/70");
          }
        });

        currentLang = lang;
        localStorage.setItem("wedding-lang", lang);
        translate(lang);
      });
    });
  }

  // Dịch toàn bộ trang theo mã ngôn ngữ
  function translate(lang) {
    const langs = WEDDING_CONFIG.i18n.languages || {};
    const dict = langs[lang] || langs.vi || {};

    // Dịch các phần tử có data-i18n
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Cập nhật thẻ <title> và meta description
    if (dict.seo_title) document.title = dict.seo_title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && dict.seo_description) metaDesc.setAttribute("content", dict.seo_description);

    // Cập nhật các phần âm thanh (nút play/pause text)
    const audioLabel = document.getElementById("audio-label");
    if (audioLabel) {
      audioLabel.textContent = isAudioPlaying ? dict.audio_btn_mute_on : dict.audio_btn_mute_off;
    }
  }

  // --- 3. BACKGROUND MUSIC PLAYLIST (TỪ THƯ MỤC audio/) ---
  function initAudio() {
    const cfg = WEDDING_CONFIG.audio;
    const playlist = cfg.playlist || [];
    const basePath = cfg.basePath || "/audio/";

    if (!playlist.length) {
      // Không có playlist → dùng fallbackSrc đơn lẻ
      bgMusicAudio = new Audio(cfg.fallbackSrc || "");
      bgMusicAudio.loop = true;
      bgMusicAudio.preload = "auto";
      updateAudioUI();
      bindAudioControls();
      return;
    }

    // Khởi tạo với bài đầu tiên
    const firstSrc = basePath + playlist[0].file;
    bgMusicAudio = new Audio(firstSrc);
    bgMusicAudio.loop = false; // tự chuyển bài khi kết thúc
    bgMusicAudio.preload = "auto";

    // Khi bài kết thúc → tự phát bài tiếp theo
    bgMusicAudio.addEventListener("ended", () => {
      if (!cfg.loopPlaylist) return;
      playNext();
    });

    // Lỗi tải file (ví dụ file mp3 không tồn tại)
    bgMusicAudio.addEventListener("error", (e) => {
      console.warn("Lỗi tải audio:", e);
    });

    updateAudioUI();
    bindAudioControls();
    audioInitialized = true;
  }

  // Gán sự kiện cho các nút điều khiển
  function bindAudioControls() {
    const audioPill = document.getElementById("audio-control-pill");
    const btnPrev = document.getElementById("audio-prev");
    const btnNext = document.getElementById("audio-next");

    if (!audioPill) return;

    // Click vào thân nút (không phải nút prev/next/play-pause) → play/pause
    audioPill.addEventListener("click", (e) => {
      if (e.target.closest("#audio-prev") || e.target.closest("#audio-next") || e.target.closest("#audio-play-pause")) return;
      toggleAudio();
    });

    if (btnPrev) btnPrev.addEventListener("click", (e) => {
      e.stopPropagation();
      playPrev();
    });

    if (btnNext) btnNext.addEventListener("click", (e) => {
      e.stopPropagation();
      playNext();
    });

    const btnPlayPause = document.getElementById("audio-play-pause");
    if (btnPlayPause) btnPlayPause.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleAudio();
    });
  }

  // Cập nhật tên bài / ca sĩ trên giao diện
  function updateAudioUI() {
    const cfg = WEDDING_CONFIG.audio;
    const playlist = cfg.playlist || [];
    const titleEl = document.getElementById("audio-title");
    const artistEl = document.getElementById("audio-artist");

    if (playlist.length && playlist[currentTrackIndex]) {
      const t = playlist[currentTrackIndex];
      if (titleEl) {
        titleEl.textContent = t.title;
        // Chỉ bật marquee khi text quá dài so với container
        if (titleEl.scrollWidth > titleEl.clientWidth) {
          titleEl.classList.add("marquee");
        } else {
          titleEl.classList.remove("marquee");
          titleEl.style.animation = "none";
        }
      }
      if (artistEl) {
        artistEl.textContent = `${t.artist}  •  Bài ${currentTrackIndex + 1} / ${playlist.length}`;
        if (artistEl.scrollWidth > artistEl.clientWidth) {
          artistEl.classList.add("marquee");
        } else {
          artistEl.classList.remove("marquee");
          artistEl.style.animation = "none";
        }
      }
    } else {
      if (titleEl) {
        titleEl.textContent = cfg.title || "Nhạc nền";
        titleEl.classList.remove("marquee");
        titleEl.style.animation = "none";
      }
      if (artistEl) {
        artistEl.textContent = cfg.artist || "";
        artistEl.classList.remove("marquee");
        artistEl.style.animation = "none";
      }
    }
  }

  // Load bài theo index (relative đến basePath)
  function loadTrack(index) {
    const cfg = WEDDING_CONFIG.audio;
    const playlist = cfg.playlist || [];
    const basePath = cfg.basePath || "/audio/";

    if (!playlist.length) return;

    currentTrackIndex = ((index % playlist.length) + playlist.length) % playlist.length;
    const track = playlist[currentTrackIndex];
    const src = basePath + track.file;

    if (bgMusicAudio) {
      bgMusicAudio.src = src;
      bgMusicAudio.load();
      updateAudioUI();
      if (isAudioPlaying) {
        bgMusicAudio.play().catch(() => {});
      }
    }
  }

  // Bài tiếp theo
  function playNext() {
    const playlist = WEDDING_CONFIG.audio.playlist || [];
    if (!playlist.length) return;
    const next = currentTrackIndex + 1;
    if (next >= playlist.length) {
      if (WEDDING_CONFIG.audio.loopPlaylist) {
        loadTrack(0);
      } else {
        if (bgMusicAudio) bgMusicAudio.pause();
        isAudioPlaying = false;
        updateAudioUI();
      }
    } else {
      loadTrack(next);
    }
  }

  // Bài trước
  function playPrev() {
    const playlist = WEDDING_CONFIG.audio.playlist || [];
    if (!playlist.length) return;
    loadTrack(currentTrackIndex - 1);
  }

  // Bật / tắt âm thanh (yêu cầu user gesture)
  function toggleAudio() {
    if (!bgMusicAudio) return;

    const btnPlayPause = document.getElementById("audio-play-pause");
    const playImg = document.getElementById("audio-play-pause-img");
    const dict = (WEDDING_CONFIG.i18n.languages || {})[currentLang] || {};

    if (isAudioPlaying) {
      bgMusicAudio.pause();
      isAudioPlaying = false;
      const lbl = document.getElementById("audio-label");
      if (lbl) lbl.textContent = dict.audio_btn_mute_off || "Bật nhạc";
      if (playImg) playImg.src = "icons/play.png";
    } else {
      bgMusicAudio.play().then(() => {
        isAudioPlaying = true;
        const lbl = document.getElementById("audio-label");
        if (lbl) lbl.textContent = dict.audio_btn_mute_on || "Tạm dừng";
        if (playImg) playImg.src = "icons/pause.png";
      }).catch((err) => {
        console.warn("Autoplay bị chặn bởi trình duyệt:", err);
        alert(dict.audio_alert || "Trình duyệt chặn phát tự động. Vui lòng bấm nút 'Bật nhạc' để kích hoạt.");
      });
    }
  }

  // --- 4. ENVELOPE / SPLASH SCREEN OPEN ANIMATION (APPLE-GRADE CHOREOGRAPHY) ---
  function initEnvelope() {
    const envelopeScreen = document.getElementById("envelope-screen");
    const envelopeWrapper = document.getElementById("envelope-wrapper");
    const waxSeal = document.getElementById("wax-seal");
    const btnOpen = document.getElementById("btn-open-envelope");
    const flap = document.querySelector(".envelope-flap");

    if (!envelopeScreen || !envelopeWrapper) return;

    const triggerOpen = (e) => {
      if (isEnvelopeOpened) return;
      isEnvelopeOpened = true;

      // Luôn đặt trang web về đúng đỉnh đầu (Hero Section), triệt tiêu lỗi bị nhảy xuống chân trang
      window.scrollTo(0, 0);
      if (lenisInstance) {
        lenisInstance.scrollTo(0, { immediate: true });
      }

      // Tính toán tọa độ chính xác của con dấu để bắn pháo hoa từ đúng tâm con dấu
      let originX = 0.5;
      let originY = 0.5;
      if (waxSeal) {
        const rect = waxSeal.getBoundingClientRect();
        originX = (rect.left + rect.width / 2) / window.innerWidth;
        originY = (rect.top + rect.height / 2) / window.innerHeight;
      }

      // Kích hoạt phát nhạc nền mượt mà với volume ramp tăng dần
      if (bgMusicAudio && WEDDING_CONFIG.audio.autoplayOnOpen) {
        try {
          bgMusicAudio.volume = 0;
          bgMusicAudio.play().then(() => {
            isAudioPlaying = true;
            updateAudioUI();
            const soundWave = document.querySelector(".sound-wave");
            const audioLabel = document.getElementById("audio-label");
            if (soundWave) soundWave.classList.add("playing");
            if (audioLabel) audioLabel.textContent = "Đang phát";

            const btnPlayPause = document.getElementById("audio-play-pause");
            const playImg = document.getElementById("audio-play-pause-img");
            if (playImg) {
              playImg.src = "icons/pause.png";
            }

            // Hiện thanh điều khiển nhạc sau khi mở thiệp
            const audioBar = document.getElementById("audio-control-pill");
            if (audioBar) {
              audioBar.classList.remove("hidden");
              audioBar.classList.add("shown");
            }

            // Tăng âm lượng êm dịu từ 0 lên 0.75 trong 1.5s
            gsap.to(bgMusicAudio, { volume: 0.75, duration: 1.5, ease: "power1.out" });
          }).catch((err) => console.log("Audio unlock:", err));
        } catch (err) {
          console.warn("Audio play issue:", err);
        }
      }

      // GSAP Master Timeline 60fps đồng bộ hoá mượt mà
      const masterTl = gsap.timeline({
        onStart: () => {
          window.scrollTo(0, 0);
          if (lenisInstance) lenisInstance.scrollTo(0, { immediate: true });
        },
        onComplete: () => {
          envelopeScreen.style.display = "none";
          document.body.classList.remove("envelope-locked");
          window.scrollTo(0, 0);
          if (lenisInstance) {
            lenisInstance.resize();
            lenisInstance.scrollTo(0, { immediate: true });
          }
          ScrollTrigger.refresh();
        }
      });

      // Giai đoạn 1: Nén lực xúc giác (Haptic press) lên con dấu sáp
      masterTl.to(waxSeal, {
        scale: 0.88,
        duration: 0.16,
        ease: "power2.in"
      })
      // Giai đoạn 2: Con dấu phát sáng bừng lên và vỡ ra thành ánh sáng kim tuyến
      .to(waxSeal, {
        scale: 1.35,
        opacity: 0,
        filter: "brightness(1.8) drop-shadow(0 0 20px #DFCA95)",
        duration: 0.32,
        ease: "power2.out",
        onStart: () => {
          fireEpicSealBurst(originX, originY);
        }
      })
      // Giai đoạn 3: Nắp phong bì tam giác mở lật 3D 180 độ
      .to(flap, {
        rotateX: 180,
        duration: 0.75,
        ease: "power3.inOut"
      }, "-=0.25")
      // Giai đoạn 4: Camera Push-in (Phong bì phóng to nhẹ và lướt mờ vào ống kính)
      .to(envelopeWrapper, {
        scale: 1.15,
        y: -18,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.7,
        ease: "power2.inOut"
      }, "-=0.45")
      // Giai đoạn 5: Màn hình chờ hòa tan (Crossfade) nhẹ nhàng vào Hero Section
      .to(envelopeScreen, {
        opacity: 0,
        duration: 0.65,
        ease: "power2.inOut"
      }, "-=0.45")
      // Giai đoạn 6: Hero Section thức giấc (Staggered Apple Reveal)
      .fromTo(".hero-badge", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.35")
      .fromTo(".hero-title-main", { opacity: 0, y: 40, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.95, ease: "power3.out" }, "-=0.6")
      .fromTo(".hero-monogram-circle", { opacity: 0, scale: 0.6, rotation: -20 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.85, ease: "back.out(2)" }, "-=0.65")
      .fromTo(".hero-date-box", { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.55")
      .fromTo(".hero-scroll-hint", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");
    };

    if (waxSeal) waxSeal.addEventListener("click", triggerOpen);
    if (btnOpen) btnOpen.addEventListener("click", triggerOpen);
    envelopeWrapper.addEventListener("click", (e) => {
      if (!isEnvelopeOpened) triggerOpen(e);
    });
  }

  // --- 5. CANVAS CONFETTI (STARBURST FROM SEAL + ROYAL FLURRY) ---
  function fireEpicSealBurst(originX = 0.5, originY = 0.5) {
    if (typeof confetti !== "function") return;

    const colors = ["#800020", "#721121", "#C5A059", "#DFCA95", "#F9F6F0"];

    // Particle starburst tỏa ra từ đúng tâm con dấu
    confetti({
      particleCount: 65,
      spread: 100,
      startVelocity: 35,
      origin: { x: originX, y: originY },
      colors: colors,
      disableForReducedMotion: true,
      scalar: 1.1
    });

    // Pháo giấy đại tiệc bắn từ 2 mép màn hình sau 220ms
    setTimeout(() => {
      confetti({
        particleCount: 70,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.75 },
        colors: colors,
        disableForReducedMotion: true
      });
      confetti({
        particleCount: 70,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.75 },
        colors: colors,
        disableForReducedMotion: true
      });
    }, 220);
  }

  function fireWeddingConfetti() {
    fireEpicSealBurst(0.5, 0.5);
  }

  // --- 6. LENIS SMOOTH SCROLL & GSAP SCROLLTRIGGER ---
  function initLenisAndGSAP() {
    if (typeof Lenis !== "undefined") {
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.8,
        infinite: false
      });
      window.weddingLenis = lenisInstance;

      lenisInstance.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }

    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      initScrollytellingAnimations();
    }
  }

  // --- 7. GSAP SCROLLYTELLING ANIMATIONS ---
  function animateHeroEntrance() {
    const tl = gsap.timeline();
    tl.from(".hero-badge", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" })
      .from(".hero-title-main", { opacity: 0, y: 35, duration: 1, ease: "power3.out" }, "-=0.5")
      .from(".hero-monogram-circle", { opacity: 0, scale: 0.8, duration: 0.8, ease: "back.out(1.7)" }, "-=0.6")
      .from(".hero-date-box", { opacity: 0, y: 25, duration: 0.8, ease: "power3.out" }, "-=0.5")
      .from(".hero-scroll-hint", { opacity: 0, y: 15, duration: 0.6, ease: "power3.out" }, "-=0.3");
  }

  function initScrollytellingAnimations() {
    // Parallax trên Hero Background Image
    const heroImg = document.querySelector(".hero-bg-image");
    if (heroImg) {
      gsap.to(heroImg, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    // Text Reveal on Scroll (Câu chuyện tình yêu & Lời dẫn)
    const revealItems = document.querySelectorAll(".gsap-reveal");
    revealItems.forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // HIỆU ỨNG CHUYỂN NỀN ĐỎ ĐÔ (BURGUNDY TRANSITION) Ở SECTION VIDEO
    const videoSection = document.getElementById("video-section");
    const videoFrame = document.querySelector(".video-container-frame");

    if (videoSection) {
      ScrollTrigger.create({
        trigger: videoSection,
        start: "top 65%",
        end: "bottom 35%",
        onEnter: () => {
          gsap.to("body", {
            backgroundColor: WEDDING_CONFIG.colors.burgundyDeep,
            color: WEDDING_CONFIG.colors.textLight,
            duration: 0.8,
            ease: "power2.inOut"
          });
          videoSection.classList.add("theme-burgundy-active");
        },
        onLeave: () => {
          gsap.to("body", {
            backgroundColor: WEDDING_CONFIG.colors.primaryBg,
            color: WEDDING_CONFIG.colors.textDark,
            duration: 0.8,
            ease: "power2.inOut"
          });
          videoSection.classList.remove("theme-burgundy-active");
        },
        onEnterBack: () => {
          gsap.to("body", {
            backgroundColor: WEDDING_CONFIG.colors.burgundyDeep,
            color: WEDDING_CONFIG.colors.textLight,
            duration: 0.8,
            ease: "power2.inOut"
          });
          videoSection.classList.add("theme-burgundy-active");
        },
        onLeaveBack: () => {
          gsap.to("body", {
            backgroundColor: WEDDING_CONFIG.colors.primaryBg,
            color: WEDDING_CONFIG.colors.textDark,
            duration: 0.8,
            ease: "power2.inOut"
          });
          videoSection.classList.remove("theme-burgundy-active");
        }
      });

      // Video Scale-up effect kiểu Apple Keynote
      if (videoFrame) {
        gsap.fromTo(
          videoFrame,
          { scale: 0.88, borderRadius: "36px" },
          {
            scale: 1,
            borderRadius: "20px",
            ease: "none",
            scrollTrigger: {
              trigger: videoSection,
              start: "top 80%",
              end: "center center",
              scrub: true
            }
          }
        );
      }
    }
  }

  // --- 8. COUNTDOWN TIMER ---
  function initCountdown() {
    const targetDate = new Date(WEDDING_CONFIG.event.solarDate).getTime();
    const daysEl = document.getElementById("cd-days");
    const hoursEl = document.getElementById("cd-hours");
    const minutesEl = document.getElementById("cd-minutes");
    const secondsEl = document.getElementById("cd-seconds");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.textContent = String(days).padStart(2, "0");
      hoursEl.textContent = String(hours).padStart(2, "0");
      minutesEl.textContent = String(minutes).padStart(2, "0");
      secondsEl.textContent = String(seconds).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // --- 9. ADD TO CALENDAR (.ICS & GOOGLE CALENDAR) ---
  function initCalendarActions() {
    const btnGoogleCal = document.getElementById("btn-calendar-google");
    const btnIcsCal = document.getElementById("btn-calendar-ics");

    const eventTitle = encodeURIComponent(`Lễ Thành Hôn: ${WEDDING_CONFIG.couple.groom.name} & ${WEDDING_CONFIG.couple.bride.name}`);
    const eventDetails = encodeURIComponent(`Trân trọng kính mời quý khách tới chung vui cùng gia đình chúng mình tại ${WEDDING_CONFIG.event.venue.name}.\nĐịa chỉ: ${WEDDING_CONFIG.event.venue.address}`);
    const eventLocation = encodeURIComponent(`${WEDDING_CONFIG.event.venue.name}, ${WEDDING_CONFIG.event.venue.address}`);
    
    // Ngày giờ UTC: 26/12/2026 10:00 (GMT+7) = 26/12/2026 03:00 UTC
    const startTimeUtc = "20261226T030000Z";
    const endTimeUtc = "20261226T070000Z";

    // 1. Google Calendar link
    if (btnGoogleCal) {
      btnGoogleCal.addEventListener("click", () => {
        const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startTimeUtc}/${endTimeUtc}&details=${eventDetails}&location=${eventLocation}`;
        window.open(googleCalUrl, "_blank", "noopener,noreferrer");
      });
    }

    // 2. Apple / Outlook iCalendar (.ics) download
    if (btnIcsCal) {
      btnIcsCal.addEventListener("click", () => {
        const icsContent = [
          "BEGIN:VCALENDAR",
          "VERSION:2.0",
          "PRODID:-//Apple Scrollytelling Wedding//VI",
          "CALSCALE:GREGORIAN",
          "METHOD:PUBLISH",
          "BEGIN:VEVENT",
          `SUMMARY:Lễ Thành Hôn: ${WEDDING_CONFIG.couple.groom.name} & ${WEDDING_CONFIG.couple.bride.name}`,
          `DESCRIPTION:Trân trọng kính mời quý khách tham dự đám cưới của ${WEDDING_CONFIG.couple.groom.name} & ${WEDDING_CONFIG.couple.bride.name}.`,
          `LOCATION:${WEDDING_CONFIG.event.venue.name}, ${WEDDING_CONFIG.event.venue.address}`,
          `DTSTART:${startTimeUtc}`,
          `DTEND:${endTimeUtc}`,
          "STATUS:CONFIRMED",
          "BEGIN:VALARM",
          "TRIGGER:-PT2H",
          "ACTION:DISPLAY",
          "DESCRIPTION:Nhắc nhở: Lễ cưới Mạnh Hiệp & Huyền Trang sắp diễn ra!",
          "END:VALARM",
          "END:VEVENT",
          "END:VCALENDAR"
        ].join("\r\n");

        const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute("download", `Le_Thanh_Hon_${WEDDING_CONFIG.couple.groom.name}_${WEDDING_CONFIG.couple.bride.name}.ics`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  }

  // --- 10. PHOTO GALLERY & LIGHTBOX ---
  function initGalleryAndLightbox() {
    const galleryGrid = document.getElementById("gallery-grid");
    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxSubtitle = document.getElementById("lightbox-subtitle");
    const btnClose = document.getElementById("lightbox-close");
    const btnPrev = document.getElementById("lightbox-prev");
    const btnNext = document.getElementById("lightbox-next");

    if (!galleryGrid || !lightboxModal) return;

    // Render Dynamic Gallery Items
    galleryGrid.innerHTML = "";
    WEDDING_CONFIG.gallery.forEach((item, index) => {
      const card = document.createElement("div");
      // Apple Bento Grid span classes
      let spanClass = "col-span-1 md:col-span-1 row-span-1";
      if (item.aspect === "tall") {
        spanClass = "col-span-1 md:col-span-1 md:row-span-2 h-[380px] md:h-[500px]";
      } else if (item.aspect === "wide") {
        spanClass = "col-span-1 md:col-span-2 h-[260px] md:h-[320px]";
      } else {
        spanClass = "col-span-1 h-[260px] md:h-[320px]";
      }

      card.className = `bento-card ${spanClass} group`;
      card.setAttribute("data-index", index);

      // Chuyển link Google Drive sang Direct URL
      const directSrc = parseGoogleDriveUrl(item.src);
      const fallbackSrc = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80";

      card.innerHTML = `
        <img 
          src="${directSrc}" 
          alt="${item.title}" 
          loading="lazy" 
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onerror="this.onerror=null; this.src='${fallbackSrc}';"
        />
        <div class="bento-overlay">
          <span class="text-xs tracking-widest uppercase text-[#C5A059] font-medium mb-1">${item.subtitle || ""}</span>
          <h4 class="font-serif-luxury text-xl md:text-2xl text-[#F9F6F0] font-semibold">${item.title}</h4>
          ${item.desc ? `<p class="text-xs text-[#EBE3D5] opacity-90 mt-1">${item.desc}</p>` : ""}
        </div>
      `;

      card.addEventListener("click", () => openLightbox(index));
      galleryGrid.appendChild(card);
    });

    function openLightbox(index) {
      activeLightboxIndex = index;
      updateLightboxContent();
      lightboxModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightboxModal.classList.remove("active");
      document.body.style.overflow = "";
    }

    function updateLightboxContent() {
      const item = WEDDING_CONFIG.gallery[activeLightboxIndex];
      if (!item) return;

      const directSrc = parseGoogleDriveUrl(item.src);
      lightboxImg.src = directSrc;
      lightboxImg.alt = item.title;
      if (lightboxTitle) lightboxTitle.textContent = item.title;
      if (lightboxSubtitle) lightboxSubtitle.textContent = item.subtitle || item.desc || "";
    }

    function showPrev() {
      activeLightboxIndex = (activeLightboxIndex - 1 + WEDDING_CONFIG.gallery.length) % WEDDING_CONFIG.gallery.length;
      updateLightboxContent();
    }

    function showNext() {
      activeLightboxIndex = (activeLightboxIndex + 1) % WEDDING_CONFIG.gallery.length;
      updateLightboxContent();
    }

    if (btnClose) btnClose.addEventListener("click", closeLightbox);
    if (btnPrev) btnPrev.addEventListener("click", showPrev);
    if (btnNext) btnNext.addEventListener("click", showNext);

    // Click outside to close
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal || e.target.classList.contains("lightbox-backdrop")) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    window.addEventListener("keydown", (e) => {
      if (!lightboxModal.classList.contains("active")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    });
  }

  // --- 11. TIMELINE SCROLL PROGRESS ---
  function initTimelineScroll() {
    const timelineSection = document.getElementById("timeline-section");
    const progressFill = document.getElementById("timeline-progress-fill");

    if (!timelineSection || !progressFill || typeof ScrollTrigger === "undefined") return;

    ScrollTrigger.create({
      trigger: timelineSection,
      start: "top 70%",
      end: "bottom 80%",
      scrub: true,
      onUpdate: (self) => {
        progressFill.style.height = `${(self.progress * 100).toFixed(1)}%`;
      }
    });
  }

  // --- 12. MAP TOUCH SHIELD (PREVENT SCROLL JACKING ON MOBILE) ---
  function initMapShield() {
    const shield = document.getElementById("map-touch-shield");
    const mapWrapper = document.getElementById("map-wrapper");

    if (!shield || !mapWrapper) return;

    shield.addEventListener("click", () => {
      shield.classList.add("shield-disabled");
    });

    // Khi người dùng cuộn chuột ra khỏi khu vực bản đồ thì tự động khóa lại để bảo vệ cuộn
    mapWrapper.addEventListener("mouseleave", () => {
      shield.classList.remove("shield-disabled");
    });
  }

  // --- 13. RSVP FORM & LIVE GUESTBOOK ---
  function initRSVPAndGuestbook() {
    const rsvpForm = document.getElementById("rsvp-form");
    const guestbookContainer = document.getElementById("guestbook-wishes");
    const submitBtn = document.getElementById("rsvp-submit-btn");
    const btnText = document.getElementById("rsvp-btn-text");
    const btnSpinner = document.getElementById("rsvp-btn-spinner");
    const rsvpModal = document.getElementById("rsvp-success-modal");
    const modalClose = document.getElementById("modal-success-close");

    // Render initial guestbook wishes from config
    if (guestbookContainer && WEDDING_CONFIG.rsvp.initialWishes) {
      guestbookContainer.innerHTML = "";
      WEDDING_CONFIG.rsvp.initialWishes.forEach((wish) => {
        appendWishToWall(wish.name, wish.side, wish.content, wish.time);
      });
    }

    if (!rsvpForm) return;

    rsvpForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("rsvp-name").value.trim();
      const phone = document.getElementById("rsvp-phone").value.trim();
      const attendance = document.querySelector('input[name="attendance"]:checked')?.value || "yes";
      const guestsCount = document.getElementById("rsvp-guests")?.value || "1";
      const side = document.querySelector('input[name="side"]:checked')?.value || "Nhà Trai";
      const message = document.getElementById("rsvp-message").value.trim();

      if (!name) {
        alert("Vui lòng nhập họ và tên của bạn!");
        return;
      }

      // Set loading state
      if (submitBtn) submitBtn.disabled = true;
      if (btnText) btnText.textContent = "Đang gửi...";
      if (btnSpinner) btnSpinner.classList.remove("hidden");

      const payload = {
        name,
        phone,
        attendance: attendance === "yes" ? "Có tham dự" : "Rất tiếc không thể tham dự",
        guestsCount,
        side,
        message,
        timestamp: new Date().toISOString()
      };

      const hasScriptUrl = Boolean(WEDDING_CONFIG.rsvp.googleScriptUrl && WEDDING_CONFIG.rsvp.googleScriptUrl.trim());

      try {
        if (hasScriptUrl && !WEDDING_CONFIG.rsvp.mockMode) {
          // Gửi dữ liệu thật tới Google Apps Script Web App
          await fetch(WEDDING_CONFIG.rsvp.googleScriptUrl, {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          });
        } else {
          // MOCK MODE: Giả lập độ trễ mạng thực tế 650ms để người dùng trải nghiệm trọn vẹn
          console.log("[RSVP Mock Mode Activated] Data captured:", payload);
          await new Promise((resolve) => setTimeout(resolve, 650));
        }

        // Bắn pháo giấy chúc mừng
        fireWeddingConfetti();

        // Thêm lời chúc vào Guestbook Wall ngay lập tức
        if (message) {
          appendWishToWall(name, side, message, "Vừa xong", true);
        }

        // Hiển thị modal thành công
        if (rsvpModal) {
          const modalDesc = document.getElementById("modal-success-desc");
          if (modalDesc) {
            modalDesc.textContent = WEDDING_CONFIG.rsvp.successMessage;
          }
          rsvpModal.classList.add("active");
        } else {
          alert(WEDDING_CONFIG.rsvp.successMessage);
        }

        // Reset form (giữ lại tên nếu có từ URL)
        const currentName = document.getElementById("rsvp-name").value;
        rsvpForm.reset();
        document.getElementById("rsvp-name").value = currentName;

      } catch (err) {
        console.error("Lỗi gửi RSVP:", err);
        alert("Có lỗi nhỏ khi gửi phản hồi, nhưng lời chúc của bạn đã được ghi nhận trên giao diện. Cảm ơn bạn!");
        if (message) {
          appendWishToWall(name, side, message, "Vừa xong", true);
        }
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (btnText) btnText.textContent = "Gửi Xác Nhận & Lời Chúc";
        if (btnSpinner) btnSpinner.classList.add("hidden");
      }
    });

    if (modalClose && rsvpModal) {
      modalClose.addEventListener("click", () => {
        rsvpModal.classList.remove("active");
      });
      rsvpModal.addEventListener("click", (e) => {
        if (e.target === rsvpModal) {
          rsvpModal.classList.remove("active");
        }
      });
    }

    function appendWishToWall(name, side, content, timeStr, isNew = false) {
      if (!guestbookContainer) return;

      const card = document.createElement("div");
      card.className = `p-4 md:p-5 rounded-2xl glass-panel border border-[#C5A059]/30 transition-all duration-500 ${
        isNew ? "ring-2 ring-[#721121] scale-102 bg-white" : ""
      }`;

      // Badge màu tùy theo nhà Trai hay nhà Gái
      const isGroom = side.toLowerCase().includes("trai");
      const badgeClass = isGroom 
        ? "bg-[#721121]/10 text-[#721121] border-[#721121]/30" 
        : "bg-[#C5A059]/15 text-[#800020] border-[#C5A059]/40";

      card.innerHTML = `
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <span class="font-serif-luxury font-bold text-lg text-[#2B090E]">${escapeHtml(name)}</span>
            <span class="text-xs px-2.5 py-0.5 rounded-full border ${badgeClass} font-medium">${escapeHtml(side)}</span>
          </div>
          <span class="text-xs text-[#5A4744]/75">${escapeHtml(timeStr)}</span>
        </div>
        <p class="text-sm text-[#2B090E] leading-relaxed italic">“${escapeHtml(content)}”</p>
      `;

      if (isNew && guestbookContainer.firstChild) {
        guestbookContainer.insertBefore(card, guestbookContainer.firstChild);
      } else {
        guestbookContainer.appendChild(card);
      }
    }

    function escapeHtml(text) {
      if (!text) return "";
      const div = document.createElement("div");
      div.textContent = text;
      return div.innerHTML;
    }
  }

})();
