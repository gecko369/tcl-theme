#!/usr/bin/env python3
"""Render a 1600x900 Celebration Life branded feature card.

usage: make_card.py OUT.png "Headline (<= 8 words)" "Sub-line" [--kicker BLOG] [--fonts DIR]
Fonts: Baloo2.ttf + Nunito.ttf (variable fonts from github.com/google/fonts) in --fonts DIR.
"""
import argparse, os
from PIL import Image, ImageDraw, ImageFont

CREAM, INK, GOLD, CORAL, SKY, TEAL = "#FFF7EB", "#20304F", "#FBB02D", "#F2674A", "#7FC4E8", "#1F9B8E"
W, H = 1600, 900


def font(path, size, weight):
    f = ImageFont.truetype(path, size)
    try:
        f.set_variation_by_axes([weight])
    except Exception:
        pass
    return f


def wrap(draw, text, f, max_w):
    lines, cur = [], ""
    for word in text.split():
        trial = (cur + " " + word).strip()
        if draw.textlength(trial, font=f) <= max_w:
            cur = trial
        else:
            lines.append(cur)
            cur = word
    lines.append(cur)
    return lines


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("out")
    ap.add_argument("headline")
    ap.add_argument("subline")
    ap.add_argument("--kicker", default="THE CELEBRATION LIFE BLOG")
    ap.add_argument("--fonts", default=os.path.dirname(os.path.abspath(__file__)))
    a = ap.parse_args()
    baloo, nunito = os.path.join(a.fonts, "Baloo2.ttf"), os.path.join(a.fonts, "Nunito.ttf")

    img = Image.new("RGB", (W, H), CREAM)
    d = ImageDraw.Draw(img)

    # sun motif top-left
    cx, cy = 150, 150
    for i in range(12):
        import math
        ang = i * math.pi / 6
        d.line([(cx + 95 * math.cos(ang), cy + 95 * math.sin(ang)),
                (cx + 135 * math.cos(ang), cy + 135 * math.sin(ang))], fill=GOLD, width=14)
    d.ellipse([cx - 70, cy - 70, cx + 70, cy + 70], fill=GOLD)

    # decorative waves bottom-right
    d.ellipse([1180, 640, 1900, 1240], fill=SKY)
    d.ellipse([1320, 720, 2000, 1300], fill=TEAL)

    left, max_w = 140, 1180
    d.text((330, 125), a.kicker, font=font(nunito, 34, 800), fill=CORAL)

    size = 112
    while size > 60:
        hf = font(baloo, size, 800)
        lines = wrap(d, a.headline, hf, max_w)
        if len(lines) <= 3:
            break
        size -= 6
    y = 330
    for line in lines:
        d.text((left, y), line, font=hf, fill=INK)
        y += int(size * 1.02)

    d.rectangle([left, y + 34, left + 160, y + 46], fill=CORAL)
    d.text((left, y + 66), a.subline, font=font(nunito, 44, 700), fill=TEAL)

    d.text((left, H - 90), "The Celebration Life  ·  Celebration, FL", font=font(nunito, 34, 700), fill=INK)
    img.save(a.out, "PNG", optimize=True)
    print(a.out)


if __name__ == "__main__":
    main()
