/**
 * ==============================================================================
 * WEDDING INVITATION APPLICATION SCRIPT
 * Style: Apple Scrollytelling, Lenis Smooth Scroll, GSAP, Canvas Confetti
 * Tone: Warm Beige & Burgundy
 * Internationalization: Multilingual 5 Languages
 * (Tiếng Việt 🇻🇳, Français 🇫🇷, English 🇬🇧, 한국어 🇰🇷, Español 🇪🇸)
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
  let currentGuestName = "";
  const dynamicUserWishes = []; // Lưu các lời chúc người dùng vừa gửi trong phiên
  let serverWishes = []; // Lưu lời chúc tải từ Google Apps Script

  // --- 1. INITIALIZATION ON DOM READY ---
  document.addEventListener("DOMContentLoaded", () => {
    // 0. Khóa cơ chế ghi nhớ vị trí cuộn của trình duyệt (tránh bị nhảy xuống đáy trang khi F5)
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    // Khởi tạo i18n trước để xác định ngôn ngữ đúng ngay từ đầu
    initI18n();
    initPersonalizedGreeting();
    initAudio();
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

    if (guestParam) {
      currentGuestName = decodeURIComponent(guestParam.replace(/\+/g, " ")).trim();
      const rsvpNameInput = document.getElementById("rsvp-name");
      if (rsvpNameInput) {
        rsvpNameInput.value = currentGuestName;
      }
    } else {
      currentGuestName = ""; // Không có khách mời riêng qua URL -> Dùng danh xưng mặc định của từng ngôn ngữ
    }

    updatePersonalizedGreeting(currentLang);
  }

  function updatePersonalizedGreeting(lang) {
    const langs = WEDDING_CONFIG.i18n.languages || {};
    const dict = langs[lang] || langs.vi || {};

    const guestGreetingEl = document.getElementById("envelope-guest-name");
    const heroGuestGreetingEl = document.getElementById("hero-guest-name");

    if (currentGuestName) {
      // Có tên riêng được truyền qua URL (?to=David / ?name=Trang...)
      const prefixEnvelope = dict.envelope_guest_prefix || "Trân trọng kính mời: ";
      const prefixHero = dict.hero_guest_prefix || "Trân trọng kính mời: ";
      if (guestGreetingEl) {
        guestGreetingEl.textContent = `${prefixEnvelope}${currentGuestName}`;
      }
      if (heroGuestGreetingEl) {
        heroGuestGreetingEl.textContent = `${prefixHero}${currentGuestName}`;
      }
    } else {
      // Mặc định (truy cập thông thường) -> Hiển thị đúng danh xưng chuẩn của ngôn ngữ đang chọn
      if (guestGreetingEl) {
        guestGreetingEl.textContent = dict.envelope_guest_name || "Trân trọng kính mời: Quý khách";
      }
      if (heroGuestGreetingEl) {
        heroGuestGreetingEl.textContent = dict.hero_guest_name || "Trân trọng kính mời quý khách tới tham dự";
      }
    }
  }

  // --- 2.5. NGÔN NGỮ (I18N) ---
  function initI18n() {
    const cfg = WEDDING_CONFIG.i18n || {};
    const savedLang = localStorage.getItem("wedding-lang") || cfg.defaultLang || "vi";
    currentLang = savedLang;

    // Cập nhật trạng thái active của nút cờ
    updateFlagButtonsUI(currentLang);

    // Áp dụng ngôn ngữ đã lưu
    translate(currentLang);

    // Sự kiện click nút chọn ngôn ngữ
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.getAttribute("data-lang");
        if (!lang || lang === currentLang) return;

        currentLang = lang;
        localStorage.setItem("wedding-lang", lang);
        updateFlagButtonsUI(lang);
        translate(lang);
      });
    });
  }

  function updateFlagButtonsUI(lang) {
    document.querySelectorAll(".lang-btn").forEach((b) => {
      if (b.getAttribute("data-lang") === lang) {
        b.classList.add("lang-active", "bg-wedding-gold/20", "text-wedding-goldLight");
        b.classList.remove("bg-transparent", "text-wedding-goldLight/70");
      } else {
        b.classList.remove("lang-active", "bg-wedding-gold/20", "text-wedding-goldLight");
        b.classList.add("bg-transparent", "text-wedding-goldLight/70");
      }
    });
  }

  // Dịch toàn bộ trang theo mã ngôn ngữ
  function translate(lang) {
    currentLang = lang;
    const langs = WEDDING_CONFIG.i18n.languages || {};
    const dict = langs[lang] || langs.vi || {};

    // Cập nhật lang thuộc tính của html
    document.documentElement.lang = lang;

    // 1. Dịch innerHTML cho các phần tử có [data-i18n]
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = (el.getAttribute("data-i18n") || "").trim();
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    // 2. Dịch placeholder cho các trường input & textarea có [data-i18n-placeholder]
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = (el.getAttribute("data-i18n-placeholder") || "").trim();
      if (dict[key] !== undefined) {
        el.setAttribute("placeholder", dict[key]);
      }
    });

    // 3. Dịch title cho các phần tử có [data-i18n-title]
    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = (el.getAttribute("data-i18n-title") || "").trim();
      if (dict[key] !== undefined) {
        el.setAttribute("title", dict[key]);
      }
    });

    // 4. Dịch aria-label cho các phần tử có [data-i18n-aria-label]
    document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
      const key = (el.getAttribute("data-i18n-aria-label") || "").trim();
      if (dict[key] !== undefined) {
        el.setAttribute("aria-label", dict[key]);
      }
    });

    // 5. Dịch alt text cho hình ảnh có [data-i18n-alt]
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const key = (el.getAttribute("data-i18n-alt") || "").trim();
      if (dict[key] !== undefined) {
        el.setAttribute("alt", dict[key]);
      }
    });

    // 6. Cập nhật thẻ <title> và meta description
    if (dict.seo_title) {
      document.title = dict.seo_title;
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && dict.seo_description) {
      metaDesc.setAttribute("content", dict.seo_description);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && dict.seo_title) {
      ogTitle.setAttribute("content", dict.seo_title);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && dict.seo_description) {
      ogDesc.setAttribute("content", dict.seo_description);
    }

    // 7. Cập nhật các thành phần động
    updatePersonalizedGreeting(lang);
    updateAudioUI();
    renderGallery(lang);
    renderGuestbookWishes(lang);

    // Cập nhật text nút gửi form nếu form không trong trạng thái loading
    const submitBtn = document.getElementById("rsvp-submit-btn");
    const btnText = document.getElementById("rsvp-btn-text");
    if (btnText && (!submitBtn || !submitBtn.disabled)) {
      btnText.innerHTML = dict.rsvp_submit || "Gửi Xác Nhận &amp; Lời Chúc";
    }

    // Đồng bộ lại tính toán scrolltrigger khi font/text thay đổi kích thước
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
  }

  // --- 3. BACKGROUND MUSIC PLAYLIST (TỪ THƯ MỤC audio/) ---
  function initAudio() {
    const cfg = WEDDING_CONFIG.audio;
    const playlist = cfg.playlist || [];
    const basePath = cfg.basePath || "audio/";

    if (!playlist.length) {
      bgMusicAudio = new Audio(cfg.fallbackSrc || "");
      bgMusicAudio.loop = true;
      bgMusicAudio.preload = "auto";
      updateAudioUI();
      bindAudioControls();
      return;
    }

    const firstSrc = basePath + playlist[0].file;
    bgMusicAudio = new Audio(firstSrc);
    bgMusicAudio.loop = false;
    bgMusicAudio.preload = "auto";

    bgMusicAudio.addEventListener("ended", () => {
      if (!cfg.loopPlaylist) return;
      playNext();
    });

    bgMusicAudio.addEventListener("error", (e) => {
      console.warn("Lỗi tải audio:", e);
    });

    updateAudioUI();
    bindAudioControls();
    audioInitialized = true;
  }

  function bindAudioControls() {
    const audioPill = document.getElementById("audio-control-pill");
    const btnPrev = document.getElementById("audio-prev");
    const btnNext = document.getElementById("audio-next");

    if (!audioPill) return;

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

  function updateAudioUI() {
    const cfg = WEDDING_CONFIG.audio;
    const playlist = cfg.playlist || [];
    const titleEl = document.getElementById("audio-title");
    const artistEl = document.getElementById("audio-artist");
    const dict = (WEDDING_CONFIG.i18n.languages || {})[currentLang] || {};

    const trackPrefix = dict.audio_title_prefix || "Bài";
    const trackOf = dict.audio_of || "/";

    if (playlist.length && playlist[currentTrackIndex]) {
      const t = playlist[currentTrackIndex];
      if (titleEl) {
        titleEl.textContent = t.title;
        if (titleEl.scrollWidth > titleEl.clientWidth) {
          titleEl.classList.add("marquee");
        } else {
          titleEl.classList.remove("marquee");
          titleEl.style.animation = "none";
        }
      }
      if (artistEl) {
        artistEl.textContent = `${t.artist}  •  ${trackPrefix} ${currentTrackIndex + 1} ${trackOf} ${playlist.length}`;
        if (artistEl.scrollWidth > artistEl.clientWidth) {
          artistEl.classList.add("marquee");
        } else {
          artistEl.classList.remove("marquee");
          artistEl.style.animation = "none";
        }
      }
    } else {
      if (titleEl) {
        titleEl.textContent = cfg.title || dict.audio_default_title || "Nhạc nền";
        titleEl.classList.remove("marquee");
        titleEl.style.animation = "none";
      }
      if (artistEl) {
        artistEl.textContent = cfg.artist || "";
        artistEl.classList.remove("marquee");
        artistEl.style.animation = "none";
      }
    }

    const audioLabel = document.getElementById("audio-label");
    if (audioLabel) {
      audioLabel.textContent = isAudioPlaying ? (dict.audio_btn_mute_on || "Tạm dừng") : (dict.audio_btn_mute_off || "Bật nhạc");
    }
  }

  function loadTrack(index) {
    const cfg = WEDDING_CONFIG.audio;
    const playlist = cfg.playlist || [];
    const basePath = cfg.basePath || "audio/";

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

  function playPrev() {
    const playlist = WEDDING_CONFIG.audio.playlist || [];
    if (!playlist.length) return;
    loadTrack(currentTrackIndex - 1);
  }

  function toggleAudio() {
    if (!bgMusicAudio) return;

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

  // --- 4. ENVELOPE / SPLASH SCREEN OPEN ANIMATION ---
  function initEnvelope() {
    const envelopeScreen = document.getElementById("envelope-screen");
    const envelopeWrapper = document.getElementById("envelope-wrapper");
    const waxSeal = document.getElementById("wax-seal");
    const btnOpen = document.getElementById("btn-open-envelope");
    const flap = document.querySelector(".envelope-flap");

    if (!envelopeScreen || !envelopeWrapper) return;

    // Helper an toàn bọc lệnh gọi GSAP to/fromTo tránh cảnh báo target not found trên Console
    const safeTo = (tl, target, vars, position) => {
      const el = typeof target === "string" ? document.querySelector(target) : target;
      if (el) {
        if (position !== undefined) tl.to(el, vars, position);
        else tl.to(el, vars);
      }
      return tl;
    };

    const safeFromTo = (tl, target, fromVars, toVars, position) => {
      const el = typeof target === "string" ? document.querySelector(target) : target;
      if (el) {
        if (position !== undefined) tl.fromTo(el, fromVars, toVars, position);
        else tl.fromTo(el, fromVars, toVars);
      }
      return tl;
    };

    const triggerOpen = () => {
      if (isEnvelopeOpened) return;
      isEnvelopeOpened = true;

      window.scrollTo(0, 0);
      if (lenisInstance) {
        lenisInstance.scrollTo(0, { immediate: true });
      }

      let originX = 0.5;
      let originY = 0.5;
      if (waxSeal) {
        const rect = waxSeal.getBoundingClientRect();
        originX = (rect.left + rect.width / 2) / window.innerWidth;
        originY = (rect.top + rect.height / 2) / window.innerHeight;
      }

      if (bgMusicAudio && WEDDING_CONFIG.audio.autoplayOnOpen) {
        try {
          bgMusicAudio.volume = 0;
          bgMusicAudio.play().then(() => {
            isAudioPlaying = true;
            updateAudioUI();
            const soundWave = document.querySelector(".sound-wave");
            const audioLabel = document.getElementById("audio-label");
            const dict = (WEDDING_CONFIG.i18n.languages || {})[currentLang] || {};
            if (soundWave) soundWave.classList.add("playing");
            if (audioLabel) audioLabel.textContent = dict.audio_playing_status || "Đang phát";

            const playImg = document.getElementById("audio-play-pause-img");
            if (playImg) {
              playImg.src = "icons/pause.png";
            }

            const audioBar = document.getElementById("audio-control-pill");
            if (audioBar) {
              audioBar.classList.remove("hidden");
              audioBar.classList.add("shown");
            }

            if (typeof gsap !== "undefined") {
              gsap.to(bgMusicAudio, { volume: 0.75, duration: 1.5, ease: "power1.out" });
            }
          }).catch((err) => console.log("Audio unlock:", err));
        } catch (err) {
          console.warn("Audio play issue:", err);
        }
      }

      if (typeof gsap === "undefined") {
        envelopeScreen.style.display = "none";
        document.body.classList.remove("envelope-locked");
        return;
      }

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
          if (typeof ScrollTrigger !== "undefined") {
            ScrollTrigger.refresh();
          }
        }
      });

      safeTo(masterTl, waxSeal, {
        scale: 0.88,
        duration: 0.16,
        ease: "power2.in"
      });

      safeTo(masterTl, waxSeal, {
        scale: 1.35,
        opacity: 0,
        filter: "brightness(1.8) drop-shadow(0 0 20px #DFCA95)",
        duration: 0.32,
        ease: "power2.out",
        onStart: () => {
          fireEpicSealBurst(originX, originY);
        }
      });

      safeTo(masterTl, flap, {
        rotateX: 180,
        duration: 0.75,
        ease: "power3.inOut"
      }, "-=0.25");

      safeTo(masterTl, envelopeWrapper, {
        scale: 1.15,
        y: -18,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.7,
        ease: "power2.inOut"
      }, "-=0.45");

      safeTo(masterTl, envelopeScreen, {
        opacity: 0,
        duration: 0.65,
        ease: "power2.inOut"
      }, "-=0.45");

      safeFromTo(masterTl, ".hero-badge", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.35");
      safeFromTo(masterTl, ".hero-title-main", { opacity: 0, y: 40, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.95, ease: "power3.out" }, "-=0.6");
      safeFromTo(masterTl, ".hero-monogram-circle", { opacity: 0, scale: 0.6, rotation: -20 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.85, ease: "back.out(2)" }, "-=0.65");
      safeFromTo(masterTl, ".hero-date-box", { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.55");
      safeFromTo(masterTl, ".hero-scroll-hint", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");
    };

    if (waxSeal) waxSeal.addEventListener("click", triggerOpen);
    if (btnOpen) btnOpen.addEventListener("click", triggerOpen);
    envelopeWrapper.addEventListener("click", (e) => {
      if (!isEnvelopeOpened) triggerOpen(e);
    });
  }

  // --- 5. CANVAS CONFETTI ---
  function fireEpicSealBurst(originX = 0.5, originY = 0.5) {
    if (typeof confetti !== "function") return;

    const colors = ["#800020", "#721121", "#C5A059", "#DFCA95", "#F9F6F0"];

    confetti({
      particleCount: 65,
      spread: 100,
      startVelocity: 35,
      origin: { x: originX, y: originY },
      colors: colors,
      disableForReducedMotion: true,
      scalar: 1.1
    });

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

      if (typeof ScrollTrigger !== "undefined") {
        lenisInstance.on("scroll", ScrollTrigger.update);
      }

      if (typeof gsap !== "undefined") {
        gsap.ticker.add((time) => {
          lenisInstance.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      }
    }

    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      initScrollytellingAnimations();
    }
  }

  // --- 7. GSAP SCROLLYTELLING ANIMATIONS ---
  function initScrollytellingAnimations() {
    const heroImg = document.querySelector(".hero-bg-image");
    if (heroImg && document.querySelector("#hero-section")) {
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
    
    // Convert solarDate to UTC string for Google Calendar
    let startTimeUtc = "20261226T030000Z";
    let endTimeUtc = "20261226T070000Z";
    try {
      const sDate = new Date(WEDDING_CONFIG.event.solarDate);
      const eDate = new Date(sDate.getTime() + 4 * 60 * 60 * 1000); // +4 tiếng
      const toUtcString = (d) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
      startTimeUtc = toUtcString(sDate);
      endTimeUtc = toUtcString(eDate);
    } catch (_) {}

    if (btnGoogleCal) {
      btnGoogleCal.addEventListener("click", () => {
        const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startTimeUtc}/${endTimeUtc}&details=${eventDetails}&location=${eventLocation}`;
        window.open(googleCalUrl, "_blank", "noopener,noreferrer");
      });
    }

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
          `DESCRIPTION:Nhắc nhở: Lễ cưới ${WEDDING_CONFIG.couple.groom.name} & ${WEDDING_CONFIG.couple.bride.name} sắp diễn ra!`,
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
    const lightboxModal = document.getElementById("lightbox-modal");
    const btnClose = document.getElementById("lightbox-close");
    const btnPrev = document.getElementById("lightbox-prev");
    const btnNext = document.getElementById("lightbox-next");

    renderGallery(currentLang);

    if (btnClose) btnClose.addEventListener("click", closeLightbox);
    if (btnPrev) btnPrev.addEventListener("click", showPrevLightbox);
    if (btnNext) btnNext.addEventListener("click", showNextLightbox);

    if (lightboxModal) {
      lightboxModal.addEventListener("click", (e) => {
        if (e.target === lightboxModal || e.target.classList.contains("lightbox-backdrop")) {
          closeLightbox();
        }
      });
    }

    window.addEventListener("keydown", (e) => {
      if (!lightboxModal || !lightboxModal.classList.contains("active")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrevLightbox();
      if (e.key === "ArrowRight") showNextLightbox();
    });
  }

  function renderGallery(lang) {
    const galleryGrid = document.getElementById("gallery-grid");
    if (!galleryGrid || !WEDDING_CONFIG.gallery) return;

    galleryGrid.innerHTML = "";

    WEDDING_CONFIG.gallery.forEach((item, index) => {
      const card = document.createElement("div");
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

      const directSrc = parseGoogleDriveUrl(item.src);
      const fallbackSrc = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80";

      const title = (lang !== "vi" && item["title_" + lang]) ? item["title_" + lang] : item.title;
      const subtitle = (lang !== "vi" && item["subtitle_" + lang]) ? item["subtitle_" + lang] : (item.subtitle || "");
      const desc = (lang !== "vi" && item["desc_" + lang]) ? item["desc_" + lang] : (item.desc || "");

      card.innerHTML = `
        <img 
          src="${directSrc}" 
          alt="${title}" 
          loading="lazy" 
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onerror="this.onerror=null; this.src='${fallbackSrc}';"
        />
        <div class="bento-overlay">
          <span class="text-xs tracking-widest uppercase text-[#C5A059] font-medium mb-1">${subtitle}</span>
          <h4 class="font-serifLuxury text-xl md:text-2xl text-[#F9F6F0] font-semibold">${title}</h4>
          ${desc ? `<p class="text-xs text-[#EBE3D5] opacity-90 mt-1">${desc}</p>` : ""}
        </div>
      `;

      card.addEventListener("click", () => openLightbox(index));
      galleryGrid.appendChild(card);
    });

    // Nếu lightbox đang mở, cập nhật luôn nội dung
    const lightboxModal = document.getElementById("lightbox-modal");
    if (lightboxModal && lightboxModal.classList.contains("active")) {
      updateLightboxContent();
    }
  }

  function openLightbox(index) {
    const lightboxModal = document.getElementById("lightbox-modal");
    if (!lightboxModal) return;
    activeLightboxIndex = index;
    updateLightboxContent();
    lightboxModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    const lightboxModal = document.getElementById("lightbox-modal");
    if (!lightboxModal) return;
    lightboxModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  function updateLightboxContent() {
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxSubtitle = document.getElementById("lightbox-subtitle");
    const item = WEDDING_CONFIG.gallery[activeLightboxIndex];
    if (!item) return;

    const lang = currentLang;
    const title = (lang !== "vi" && item["title_" + lang]) ? item["title_" + lang] : item.title;
    const subtitle = (lang !== "vi" && item["subtitle_" + lang]) ? item["subtitle_" + lang] : (item.subtitle || item.desc || "");

    const directSrc = parseGoogleDriveUrl(item.src);
    if (lightboxImg) {
      lightboxImg.src = directSrc;
      lightboxImg.alt = title;
    }
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxSubtitle) lightboxSubtitle.textContent = subtitle;
  }

  function showPrevLightbox() {
    activeLightboxIndex = (activeLightboxIndex - 1 + WEDDING_CONFIG.gallery.length) % WEDDING_CONFIG.gallery.length;
    updateLightboxContent();
  }

  function showNextLightbox() {
    activeLightboxIndex = (activeLightboxIndex + 1) % WEDDING_CONFIG.gallery.length;
    updateLightboxContent();
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

  // --- 12. MAP TOUCH SHIELD & VENUE MAP BINDING ---
  function initMapShield() {
    // Đồng bộ đường dẫn bản đồ và iframe từ WEDDING_CONFIG.event.venue
    const venue = WEDDING_CONFIG.event?.venue;
    const mapLink = document.getElementById("venue-map-link");
    const mapIframe = document.getElementById("venue-map-iframe");

    if (venue) {
      if (mapLink && venue.mapsNavigationUrl) {
        mapLink.href = venue.mapsNavigationUrl;
      }
      if (mapIframe && venue.mapsEmbedIframeUrl) {
        mapIframe.src = venue.mapsEmbedIframeUrl;
      }
    }

    const shield = document.getElementById("map-touch-shield");
    const mapWrapper = document.getElementById("map-wrapper");

    if (!shield || !mapWrapper) return;

    shield.addEventListener("click", () => {
      shield.classList.add("shield-disabled");
    });

    mapWrapper.addEventListener("mouseleave", () => {
      shield.classList.remove("shield-disabled");
    });
  }

  // --- 13. RSVP FORM & LIVE GUESTBOOK ---
  function initRSVPAndGuestbook() {
    const rsvpForm = document.getElementById("rsvp-form");
    const submitBtn = document.getElementById("rsvp-submit-btn");
    const btnText = document.getElementById("rsvp-btn-text");
    const btnSpinner = document.getElementById("rsvp-btn-spinner");
    const rsvpModal = document.getElementById("rsvp-success-modal");
    const modalClose = document.getElementById("modal-success-close");

    // 1. Tự động chọn giá trị mặc định cho trường nhóm khách (side) theo trang đang mở:
    // "Nhà Trai" nếu đang ở link nhà trai, "Nhà Gái" nếu đang ở link nhà gái
    const currentEventSide = WEDDING_CONFIG.event?.event_side || "nhatrai";
    const targetSideValue = currentEventSide === "nhagai" ? "Nhà Gái" : "Nhà Trai";
    const defaultSideRadio = document.querySelector(`input[name="side"][value="${targetSideValue}"]`);
    if (defaultSideRadio) {
      defaultSideRadio.checked = true;
    }

    // 2. Render lời chúc ban đầu
    renderGuestbookWishes(currentLang);

    // 3. Tải lời chúc từ Google Apps Script (GET request)
    fetchGuestbookFromGAS();

    if (!rsvpForm) return;

    // 4. Xử lý gửi Form RSVP (POST request tới Google Apps Script)
    rsvpForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const dict = (WEDDING_CONFIG.i18n.languages || {})[currentLang] || {};
      const name = document.getElementById("rsvp-name").value.trim();
      const phone = document.getElementById("rsvp-phone").value.trim();
      const attendance = document.querySelector('input[name="attendance"]:checked')?.value || "yes";
      const guestsCount = document.getElementById("rsvp-guests")?.value || "1";
      const sideRadio = document.querySelector('input[name="side"]:checked');
      const side = sideRadio ? sideRadio.value : "Nhà Trai";
      const message = document.getElementById("rsvp-message").value.trim();

      if (!name) {
        alert(dict.rsvp_alert_name || "Vui lòng nhập họ và tên của bạn!");
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      if (btnText) btnText.textContent = dict.rsvp_submitting || "Đang gửi...";
      if (btnSpinner) btnSpinner.classList.remove("hidden");

      const attendanceText = attendance === "yes" 
        ? (dict.rsvp_yes || "Chắc chắn mình sẽ tham dự") 
        : (dict.rsvp_no || "Rất tiếc mình bận không thể đến");

      // Payload JSON khớp chính xác 100% với yêu cầu Google Apps Script
      const payload = {
        name: name,
        phone: phone,
        attendance: attendanceText,
        guestsCount: String(guestsCount),
        side: side, // Giá trị badge: Nhà Trai | Nhà Gái | Bạn Thân
        message: message,
        event_side: WEDDING_CONFIG.event?.event_side || "nhatrai"
      };

      const hasScriptUrl = Boolean(WEDDING_CONFIG.rsvp?.googleScriptUrl && WEDDING_CONFIG.rsvp.googleScriptUrl.trim());

      try {
        if (hasScriptUrl && !WEDDING_CONFIG.rsvp?.mockMode) {
          await fetch(WEDDING_CONFIG.rsvp.googleScriptUrl, {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(payload)
          });
        } else {
          console.log("[RSVP Mock Mode Activated] Data captured:", payload);
          await new Promise((resolve) => setTimeout(resolve, 600));
        }

        fireWeddingConfetti();

        // Ngay sau khi gửi POST thành công, nếu khách có nhập lời chúc, chèn ngay lên đầu danh sách
        if (message) {
          const newWishObj = {
            name: name,
            side: side,
            content: message,
            time: dict.guestbook_just_now || "Vừa xong",
            isNew: true
          };
          dynamicUserWishes.unshift(newWishObj);
          renderGuestbookWishes(currentLang);
        }

        const successMsg = WEDDING_CONFIG.rsvp["successMessage_" + currentLang] || dict.guestbook_modal_desc || WEDDING_CONFIG.rsvp.successMessage;
        if (rsvpModal) {
          const modalDesc = document.getElementById("modal-success-desc");
          if (modalDesc) {
            modalDesc.textContent = successMsg;
          }
          rsvpModal.classList.add("active");
        } else {
          alert(successMsg);
        }

        const currentNameVal = document.getElementById("rsvp-name").value;
        rsvpForm.reset();
        document.getElementById("rsvp-name").value = currentNameVal;
        // Giữ lại side mặc định sau khi reset form
        const resetSideRadio = document.querySelector(`input[name="side"][value="${targetSideValue}"]`);
        if (resetSideRadio) {
          resetSideRadio.checked = true;
        }

      } catch (err) {
        console.error("Lỗi gửi RSVP:", err);
        alert(dict.rsvp_alert_error || "Có lỗi nhỏ khi gửi phản hồi, nhưng lời chúc của bạn đã được ghi nhận trên giao diện. Cảm ơn bạn!");
        if (message) {
          dynamicUserWishes.unshift({
            name: name,
            side: side,
            content: message,
            time: dict.guestbook_just_now || "Vừa xong",
            isNew: true
          });
          renderGuestbookWishes(currentLang);
        }
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (btnText) btnText.innerHTML = dict.rsvp_submit || "Gửi Xác Nhận &amp; Lời Chúc";
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
  }

  // Tải danh sách lời chúc từ Google Apps Script (GET)
  async function fetchGuestbookFromGAS() {
    const scriptUrl = WEDDING_CONFIG.rsvp?.googleScriptUrl;
    if (!scriptUrl || !scriptUrl.trim() || WEDDING_CONFIG.rsvp?.mockMode) {
      return;
    }
    try {
      const getUrl = scriptUrl + (scriptUrl.includes("?") ? "&" : "?") + "action=getWishes";
      const res = await fetch(getUrl);
      if (!res.ok) return;
      const json = await res.json();
      if (json && json.status === "success" && Array.isArray(json.data) && json.data.length > 0) {
        serverWishes = json.data;
        renderGuestbookWishes(currentLang);
      }
    } catch (err) {
      console.warn("Không thể tải lời chúc từ Google Apps Script, sử dụng fallback mẫu:", err);
    }
  }

  function renderGuestbookWishes(lang) {
    const guestbookContainer = document.getElementById("guestbook-wishes");
    if (!guestbookContainer) return;

    guestbookContainer.innerHTML = "";

    // 1. Render lời chúc người dùng vừa gửi trực tiếp trong phiên
    dynamicUserWishes.forEach((wish) => {
      appendWishElement(guestbookContainer, wish.name, wish.side, wish.content, wish.time, wish.isNew);
    });

    // 2. Render danh sách lời chúc từ Google Apps Script nếu có
    if (serverWishes && serverWishes.length > 0) {
      serverWishes.forEach((item) => {
        const wishName = item.name || "Khách Quý";
        const wishBadge = item.badge || item.side || "Bạn Thân";
        const wishMessage = item.message || item.content || "";
        const wishTime = item.time || "";
        appendWishElement(guestbookContainer, wishName, wishBadge, wishMessage, wishTime, false);
      });
      return;
    }

    // 3. Fallback: Render các lời chúc mẫu từ config
    if (WEDDING_CONFIG.rsvp?.initialWishes) {
      WEDDING_CONFIG.rsvp.initialWishes.forEach((wish) => {
        const side = (lang !== "vi" && wish["side_" + lang]) ? wish["side_" + lang] : wish.side;
        const time = (lang !== "vi" && wish["time_" + lang]) ? wish["time_" + lang] : wish.time;
        const content = (lang !== "vi" && wish["content_" + lang]) ? wish["content_" + lang] : wish.content;
        appendWishElement(guestbookContainer, wish.name, side, content, time, false);
      });
    }
  }

  function appendWishElement(container, name, side, content, timeStr, isNew = false) {
    const card = document.createElement("div");
    card.className = `p-4 md:p-5 rounded-2xl glass-panel border border-[#C5A059]/30 transition-all duration-500 ${
      isNew ? "ring-2 ring-[#721121] scale-102 bg-white" : ""
    }`;

    const sideLower = (side || "").toLowerCase();
    const isGroom = sideLower.includes("trai") || 
                    sideLower.includes("marié") || 
                    sideLower.includes("groom") || 
                    side.includes("신랑") || 
                    sideLower.includes("novio");
    const isFriend = sideLower.includes("bạn thân") ||
                     sideLower.includes("ami") ||
                     sideLower.includes("friend") ||
                     side.includes("절친") ||
                     sideLower.includes("amigo");

    let badgeClass = "bg-[#C5A059]/15 text-[#800020] border-[#C5A059]/40"; // Nhà Gái
    if (isGroom) {
      badgeClass = "bg-[#721121]/10 text-[#721121] border-[#721121]/30";
    } else if (isFriend) {
      badgeClass = "bg-[#C5A059]/25 text-[#4A0E17] border-[#C5A059]/50 font-semibold";
    }

    card.innerHTML = `
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <span class="font-serifLuxury font-bold text-lg text-[#2B090E]">${escapeHtml(name)}</span>
          <span class="text-xs px-2.5 py-0.5 rounded-full border ${badgeClass} font-medium">${escapeHtml(side)}</span>
        </div>
        <span class="text-xs text-[#5A4744]/75">${escapeHtml(timeStr)}</span>
      </div>
      <p class="text-sm text-[#2B090E] leading-relaxed italic">“${escapeHtml(content)}”</p>
    `;

    container.appendChild(card);
  }

  function escapeHtml(text) {
    if (!text) return "";
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

})();
