# Hero Video Conversion Guide

## Overview
This guide explains how to convert the 192 JPEG frames into optimized video files for the hero scroll animation.

## Prerequisites
- **ffmpeg** installed on your system
  - Windows: Download from https://ffmpeg.org/download.html
  - Or use: `winget install ffmpeg` (Windows 11)
  - Verify: `ffmpeg -version`

## Step-by-Step Instructions

### 1. Navigate to the frames directory
```bash
cd "D:\coedes\protfolio\2nd - portfolio\portfolio-next\public\frames"
```

### 2. Create MP4 version (H.264 - Best compatibility)
```bash
ffmpeg -framerate 30 -i ezgif-frame-%03d.jpg -c:v libx264 -preset slow -crf 22 -pix_fmt yuv420p -movflags +faststart -y ../hero-scroll.mp4
```

**Explanation:**
- `-framerate 30`: 30 frames per second (192 frames = ~6.4 seconds)
- `-i ezgif-frame-%03d.jpg`: Input pattern (001, 002, etc.)
- `-c:v libx264`: Use H.264 codec (universal support)
- `-preset slow`: Better compression (takes longer but smaller file)
- `-crf 22`: Quality level (18-28 range, 22 is good balance)
- `-pix_fmt yuv420p`: Color format for max compatibility
- `-movflags +faststart`: Optimize for web streaming
- `-y`: Overwrite output file if exists
- `../hero-scroll.mp4`: Output to public folder

**Expected file size:** 3-5 MB
**Expected duration:** ~6.4 seconds

### 3. Create WebM version (VP9 - Better compression)
```bash
ffmpeg -framerate 30 -i ezgif-frame-%03d.jpg -c:v libvpx-vp9 -crf 30 -b:v 0 -threads 4 -y ../hero-scroll.webm
```

**Explanation:**
- `-c:v libvpx-vp9`: Use VP9 codec (better compression than H.264)
- `-crf 30`: Quality for WebM (30 is good balance)
- `-b:v 0`: Variable bitrate (best quality/size ratio)
- `-threads 4`: Use 4 CPU threads for faster encoding

**Expected file size:** 2-4 MB (smaller than MP4)
**Expected duration:** ~6.4 seconds

### 4. Verify the videos
```bash
# Check MP4
ffmpeg -i ../hero-scroll.mp4

# Check WebM
ffmpeg -i ../hero-scroll.webm
```

Look for:
- Duration: Should be ~6.4 seconds
- Resolution: Should be 1920x1080 (or original frame size)
- File size: 2-5 MB is good

### 5. Test in browser
1. Run dev server: `npm run dev`
2. Open http://localhost:3000
3. Scroll down slowly
4. The video should scrub smoothly with scroll

## File Locations
After conversion, you should have:
```
public/
├── hero-scroll.mp4      (H.264 - fallback for older browsers)
├── hero-scroll.webm     (VP9 - modern browsers, smaller file)
└── frames/
    └── ezgif-frame-001.jpg (used as poster/placeholder)
```

## Troubleshooting

### Video doesn't play
- Check browser console for errors
- Verify video files are in `public/` folder
- Try clearing browser cache
- Check video file isn't corrupted: `ffmpeg -v error -i hero-scroll.mp4 -f null -`

### Video is too large (>5MB)
- Increase CRF value (lower quality): `-crf 28` for MP4, `-crf 35` for WebM
- Reduce framerate: `-framerate 24` instead of 30
- Reduce resolution: Add `-vf scale=1280:720` before output

### Video is too low quality
- Decrease CRF value: `-crf 18` for MP4, `-crf 25` for WebM
- Use slower preset: `-preset slower`

### Video scrubbing isn't smooth
- Try different scrub value in code (currently 0.5)
- Ensure video has keyframes: add `-g 1` to ffmpeg command

## Performance Impact

**Before (192 images):**
- Initial load: ~15-20 MB network transfer
- LCP: 4-5 seconds
- Requires progressive loading logic

**After (video):**
- Initial load: 3-5 MB (MP4) or 2-4 MB (WebM)
- LCP: <2.5 seconds ✅
- Native browser streaming
- Instant playback with poster

## Optional: Create Multiple Qualities

For even better performance, create multiple quality versions:

```bash
# High quality (desktop)
ffmpeg -framerate 30 -i ezgif-frame-%03d.jpg -c:v libx264 -preset slow -crf 22 -pix_fmt yuv420p -movflags +faststart ../hero-scroll-hq.mp4

# Medium quality (tablet)
ffmpeg -framerate 30 -i ezgif-frame-%03d.jpg -vf scale=1280:720 -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart ../hero-scroll-md.mp4

# Low quality (mobile)
ffmpeg -framerate 30 -i ezgif-frame-%03d.jpg -vf scale=960:540 -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart ../hero-scroll-lo.mp4
```

Then update the video element to use responsive sources.

## Next Steps
1. Run the ffmpeg commands above
2. Verify video files are created in `public/` folder
3. Test the scroll animation
4. (Optional) Delete `public/frames/` folder to save space (keep one frame for poster)
5. Commit and push changes

## Estimated Improvement
- **Bundle size:** -180KB (Three.js lazy loaded)
- **Network transfer:** -10-15 MB (images → video)
- **LCP:** 4-5s → <2.5s ✅
- **User experience:** Instant load, smooth scroll
