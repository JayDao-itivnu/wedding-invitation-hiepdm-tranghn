#!/usr/bin/env python3
"""
==============================================================================
AUTOMATED MULTILINGUAL I18N VERIFICATION & AUDIT SCRIPT
Kiểm tra tính toàn vẹn của hệ thống 5 ngôn ngữ:
- 🇻🇳 Tiếng Việt (vi)
- 🇫🇷 Français (fr)
- 🇬🇧 English (en)
- 🇰🇷 한국어 (ko)
- 🇪🇸 Español (es)
==============================================================================
"""

import re
import sys
from html.parser import HTMLParser

SUPPORTED_LANGS = [
    ("vi", "Tiếng Việt 🇻🇳"),
    ("fr", "Français 🇫🇷"),
    ("en", "English 🇬🇧"),
    ("ko", "한국어 🇰🇷"),
    ("es", "Español 🇪🇸")
]

# Regex ký tự có dấu đặc trưng của tiếng Việt
VI_SPECIFIC_CHARS_REGEX = re.compile(
    r"[ạảãầấậẩẫăằắặẳẵẹẻẽềếệểễỉĩọỏồốộổỗơờớợởỡụủưừứựửữỳỵỷỹđĐ]", re.IGNORECASE
)

# Danh sách ngoại lệ tên riêng & địa danh
EXEMPTIONS = [
    "Đào Mạnh Hiệp",
    "Nguyễn Huyền Trang",
    "Mạnh Hiệp",
    "Huyền Trang",
    "Hiệp",
    "Trang",
    "Đào Mạnh Hiển",
    "Nguyễn Thị Hà",
    "Nguyễn Mạnh Hòa",
    "Nguyễn Thu Huyền",
    "Nguyễn Tuấn Anh",
    "Lê Phương Thảo",
    "Trần Minh Quân",
    "Trống Đồng Palace Cầu Giấy",
    "Trống Đồng Palace",
    "Số 72 Trần Đăng Ninh",
    "Trần Đăng Ninh",
    "Dịch Vọng",
    "Cầu Giấy",
    "Hà Nội",
    "Hanoï",
    "Đà Lạt",
    "Tiếng Việt",
    "Français",
    "English",
    "한국어",
    "Español"
]


def extract_config_dicts(config_path="config.js"):
    """Trích xuất từ điển các ngôn ngữ và dữ liệu dynamic trong config.js"""
    with open(config_path, "r", encoding="utf-8") as f:
        code = f.read()

    dicts = {}
    for code_lang, _ in SUPPORTED_LANGS:
        pattern = rf"\b{code_lang}:\s*\{{(.*?)\n\s*\}}"
        match = re.search(pattern, code, re.DOTALL)
        res = {}
        if match:
            block = match.group(1)
            for line in block.splitlines():
                line_clean = line.strip()
                m = re.match(r"^([a-zA-Z0-9_]+)\s*:\s*(\"[^\"]*\"|'[^']*'),?", line_clean)
                if m:
                    key = m.group(1)
                    val = m.group(2)[1:-1]
                    res[key] = val
        dicts[code_lang] = res

    return dicts, code


class HtmlNodeParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.nodes = []

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        self.tags.append((tag, attr_dict))

        for attr in ["placeholder", "title", "aria-label", "alt"]:
            val = attr_dict.get(attr)
            if val and VI_SPECIFIC_CHARS_REGEX.search(val):
                i18n_attr = f"data-i18n-{attr}" if attr != "alt" else "data-i18n-alt"
                has_key = attr_dict.get(i18n_attr) or attr_dict.get("data-i18n")
                self.nodes.append({
                    "type": "attribute",
                    "tag": tag,
                    "attr": attr,
                    "value": val,
                    "i18n_key": has_key,
                })

    def handle_endtag(self, tag):
        if self.tags:
            self.tags.pop()

    def handle_data(self, data):
        s = data.strip()
        if not s or s.startswith("/*") or s.startswith("<!--"):
            return
        current_tag, attrs = self.tags[-1] if self.tags else ("body", {})
        if current_tag in ["script", "style"]:
            return

        has_i18n = attrs.get("data-i18n")
        self.nodes.append({
            "type": "text",
            "tag": current_tag,
            "value": s,
            "i18n_key": has_i18n,
            "attrs": attrs,
        })


def check_exemption(text):
    """Kiểm tra nếu đoạn text chỉ chứa tên riêng thuộc danh sách ngoại lệ"""
    t = text.strip()
    for ex in sorted(EXEMPTIONS, key=len, reverse=True):
        t = t.replace(ex, "")
    t = re.sub(r"[&bull;•|&,.\s\-()/:0-9+]+", "", t)
    common_words = [
        "Famille", "du", "Marié", "de", "la", "Mariée", "Fils", "Fille", "M.", "Mme",
        "dans", "brume", "à", "au", "et", "Số", "Family", "Groom", "Bride", "Son", "Daughter",
        "of", "Mr", "Mrs", "Mr.", "Mrs.", "and", "in", "the", "Familia", "del", "Novio",
        "Novia", "Hijo", "Hija", "D.", "Dña.", "en", "niebla", "측", "의", "아들", "딸"
    ]
    for w in sorted(common_words, key=len, reverse=True):
        t = re.sub(rf"\b{re.escape(w)}\b", "", t, flags=re.IGNORECASE)
    return not VI_SPECIFIC_CHARS_REGEX.search(t)


def run_audit():
    print("==================================================================")
    print("      BÁO CÁO KIỂM TRA ĐA NGÔN NGỮ (5 NGÔN NGỮ QUỐC TẾ)          ")
    print("      🇻🇳 Tiếng Việt | 🇫🇷 Français | 🇬🇧 English | 🇰🇷 한국어 | 🇪🇸 Español ")
    print("==================================================================")

    dicts, config_code = extract_config_dicts("config.js")

    print("\n1. TỪ ĐIỂN CONFIG.JS (ĐỐI CHIỂU SỰ ĐỐI XỨNG CÁC NGÔN NGỮ):")
    base_keys = set(dicts["vi"].keys())
    print(f"   • Khóa chuẩn Tiếng Việt (VI): {len(base_keys)} khóa")

    symmetry_ok = True
    for code, label in SUPPORTED_LANGS[1:]:
        curr_keys = set(dicts[code].keys())
        missing_in_curr = base_keys - curr_keys
        extra_in_curr = curr_keys - base_keys
        print(f"   • {label:<15}: {len(curr_keys)} khóa", end=" ")
        if not missing_in_curr and not extra_in_curr:
            print("-> ✅ Đối xứng 100% với VI")
        else:
            symmetry_ok = False
            print(f"-> ❌ Thiếu {len(missing_in_curr)} khóa: {missing_in_curr}")

    with open("index.html", "r", encoding="utf-8") as f:
        html_content = f.read()

    parser = HtmlNodeParser()
    parser.feed(html_content)

    print("\n2. ĐỘ PHỦ DATA-I18N TRONG INDEX.HTML:")
    all_i18n_keys_used = set()
    untranslated_items = []

    for item in parser.nodes:
        key = item.get("i18n_key")
        val = item["value"]

        if key:
            all_i18n_keys_used.add(key)
        else:
            if VI_SPECIFIC_CHARS_REGEX.search(val):
                if not check_exemption(val):
                    untranslated_items.append(item)

    print(f"   • Tổng số khóa i18n sử dụng trong HTML: {len(all_i18n_keys_used)} vị trí")

    # Kiểm tra xem có khóa HTML nào thiếu trong bất kỳ ngôn ngữ nào không
    missing_any_lang = {}
    for code, label in SUPPORTED_LANGS:
        missing = [k for k in all_i18n_keys_used if k not in dicts[code]]
        if missing:
            missing_any_lang[code] = missing

    if not missing_any_lang:
        print("   ✅ 100% khóa trong HTML đều có mặt đầy đủ trong CẢ 5 NGÔN NGỮ!")
    else:
        print(f"   ❌ Có khóa bị thiếu trong các ngôn ngữ: {missing_any_lang}")

    if untranslated_items:
        print(f"   ❌ Phát hiện {len(untranslated_items)} mục tĩnh chứa tiếng Việt chưa có data-i18n:")
        for u in untranslated_items:
            print(f"      • [{u['type']}] <{u['tag']}>: \"{u['value']}\"")
    else:
        print("   ✅ 0 mục tiếng Việt tĩnh bị sót! Toàn bộ nội dung giao diện đều có data-i18n.")

    print("\n3. KIỂM TRA DỮ LIỆU ĐỘNG (DYNAMIC ASSETS):")
    # Kiểm tra Album ảnh cưới (Gallery)
    for code, label in SUPPORTED_LANGS[1:]:
        matches = re.findall(rf"\btitle_{code}:\s*\"([^\"]+)\"", config_code)
        print(f"   • Gallery ({label}): {len(matches)}/6 ảnh có bản dịch", end=" ")
        if len(matches) == 6:
            print("-> ✅ Hoàn thành")
        else:
            print("-> ❌ Thiếu ảnh")

    # Kiểm tra Sổ lưu bút (Guestbook)
    for code, label in SUPPORTED_LANGS[1:]:
        matches = re.findall(rf"\bcontent_{code}:\s*\"([^\"]+)\"", config_code)
        print(f"   • Guestbook ({label}): {len(matches)}/3 lời chúc mẫu", end=" ")
        if len(matches) == 3:
            print("-> ✅ Hoàn thành")
        else:
            print("-> ❌ Thiếu lời chúc")

    print("\n4. MÔ PHỎNG DỊCH THỬ SANG CÁC NGÔN NGỮ NGOẠI QUỐC:")
    foreign_lang_clean = True
    for code, label in SUPPORTED_LANGS[1:]:
        lang_dict = dicts[code]
        residual_vi = []
        for key in all_i18n_keys_used:
            val = lang_dict.get(key, "")
            if VI_SPECIFIC_CHARS_REGEX.search(val) and not check_exemption(val):
                residual_vi.append((key, val))
        if residual_vi:
            foreign_lang_clean = False
            print(f"   • {label}: ❌ Còn {len(residual_vi)} mục sót tiếng Việt: {residual_vi}")
        else:
            print(f"   • {label}: ✅ Sạch sẽ 100%, không còn sót chữ tiếng Việt")

    print("\n==================================================================")
    all_success = symmetry_ok and not missing_any_lang and not untranslated_items and foreign_lang_clean
    if all_success:
        print("🎉 KẾT QUẢ CUỐI CÙNG: 5 NGÔN NGỮ HOÀN HẢO (100% READY)")
    else:
        print("⚠️ KẾT QUẢ: CẦN HOÀN THIỆN THÊM")
    print("==================================================================")

    return 0 if all_success else 1


if __name__ == "__main__":
    sys.exit(run_audit())
