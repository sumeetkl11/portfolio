[ACT AS:
A world-class Awwwards-level Creative Developer and Art Director, specializing in ultra-premium web design, Next.js, Framer Motion, and advanced scroll-based storytelling for high-end personal portfolios.

THE TASK:
Design and implement a cinematic, Apple-level scrollytelling landing page for a personal portfolio (Sumit). 
The experience should feel like a premium movie teaser combined with an interactive portfolio, driven entirely by a scroll-based image-sequence animation and striking typography. The core mechanic: as the user scrolls, a photorealistic image sequence plays showing the creator (Sumit) in black tactical gear in a pitch-black void, slowly zooming out and raising a katana, perfectly synchronized with typography appearing in the negative space.

TECH STACK INTENT (for behavior/style, not code generation):
Framework: Next.js 14 (App Router mental model)
Styling: Tailwind CSS-style utility thinking (tight spacing, absolute precision)
Animation: Framer Motion-style scroll-linked animations, easing, and transitions
Rendering: HTML5 Canvas-style image-sequence playback for buttery smooth 60fps performance.

VISUAL DIRECTION & AESTHETIC:
Overall vibe: Cinematic, raw, intense, ultra-clean, minimal, editorial, Awwwards-winning.
Seamless Blending:
The page background color MUST perfectly match the background of the image sequence (Absolute Pitch Black) so the video edges are 100% invisible and the character appears to exist seamlessly within the webpage itself.
Color Palette – Pure Dark Mode:
Primary background: Absolute Pitch Black #000000. No exceptions.
Secondary background/UI panels: #0A0A0A for extremely subtle depth on navbar/buttons.
Headings: text-white with a very subtle soft glow for depth.
Body text: text-white/60 (light gray) for calm readability.
Accent colors: 
Primary accent: Stark, crisp white #FFFFFF or metallic silver for borders and active states. 
No distracting gradients or colorful ambient lights. The focus is purely on the character and the text.

Typography:
Fonts: Inter, SF Pro Display, or a geometric sans-serif (like Clash Display or Satoshi).
Style: ultra-clean, tracking-tight, large scale, strong hierarchy.
Headings: bold, tight line-height, editorial and punchy.
Overall layout feeling: full-bleed, edge-to-edge, generous negative space on the right, no clutter, no decorative noise.

NAVBAR – STRUCTURE & BEHAVIOR:
Ultra-minimal top navigation bar.
Fixed / sticky at the top with a translucent, slightly blurred background (glassmorphism).
Content (from left to right):
Left: Simple text logo “SUMIT.” in a clean, bold font.
Center: Minimalist links: “About”, “Skills”, “Projects”, “Contact”.
Right: Primary CTA button (“Let's Talk”) with a subtle 1px white/silver border, soft hover glow.
Scroll behavior:
At top: Fully transparent.
After slight scroll: Fades in with a gentle backdrop blur (rgba(0,0,0,0.5)), reinforcing the premium feel without distracting from the pitch-black aesthetic.

CORE INTERACTION: SCROLL-LINKED IMAGE SEQUENCE
A central HTML5 Canvas-style full-screen area pinned/sticky during scroll.
Inside this space, a high-res sequence plays.
Sequence behavior:
Start: Extreme close-up of Sumit's face, staring intensely. Front-lit, pitch-black background.
Mid: Smooth, cinematic zoom out. Sumit's body anchors to the far-left side of the screen, revealing his black tactical outfit. He is holding exactly ONE katana. The entire right side of the screen is pure black negative space.
Peak: Sumit slowly and deliberately raises the katana with both hands, bringing the vertical blade directly in front of his face.
End: He holds the final stance, staring past the vertical blade into the camera. 
The canvas and the background color are identical (#000000), enabling a seamless, edge-free presentation.

SCROLL LOGIC AND STORYTELLING BEATS:
Use scroll as a narrative axis. As the user scrolls from 0 to 100%, different text sections appear on the empty right side of the screen, synchronized with the movement on the left.

HERO / INTRO (0–25% scroll)
Visual: Extreme close-up of face. Intense stare. 
Copy (Centered or slightly right, bold, clean):
Large headline: "Hi, I'm Sumit."
Subtitle: "Creative Developer & Designer."
Tone: Direct, confident, premium.

THE REVEAL (25–50% scroll)
Visual: Camera smoothly zooms out. Sumit shifts to the far-left. Katana is resting in his hand. The right side opens up into pure black space.
Copy (Right-aligned, emerging smoothly in the negative space):
Headline: "Precision in every pixel."
Subcopy:
"Building digital experiences with the discipline of a warrior."
"No clutter. No compromises. Just pure performance."

THE ACTION (50–75% scroll)
Visual: Sumit slowly raises the katana with both hands. The motion is deliberate, realistic, and heavy. 
Copy (Right-aligned, fading in as previous text fades out):
Headline: "Sharpening the edge of the web."
Subcopy:
"Mastering Next.js, immersive animations, and interactive storytelling."
"Every line of code serves a purpose."

THE STANCE & CTA (75–100% scroll)
Visual: The katana is held vertically in front of his face. He stares intensely past the blade. The motion stops and holds.
Copy (Right-aligned, strong call-to-action):
Headline: "Let's build something extraordinary."
CTA button-style copy:
Primary Button: "View My Work"
Secondary Text Link: "Get in touch"

UI & VISUAL POLISH:
Keywords to emphasize: Cinematic, photorealistic, pitch-black void, ultra-premium, modern, minimalist, smooth, buttery scroll, hardware-accelerated, immersive, Awwwards-level, sharp, disciplined.
Stylistic elements:
Zero background light bleed. Frontal, clean lighting on the character only.
Text overlays must float above the canvas with subtle non-intrusive presence.

FINAL PROMPT (COMBINED, READY-TO-USE):
"Design a hyper-premium, cinematic scrollytelling personal portfolio landing page for a Creative Developer named Sumit. The experience should feel like an intense, Awwwards-winning digital showcase with a sticky full-screen canvas playing a high-resolution image sequence as the user scrolls. The page uses an absolute pure pitch-black aesthetic (#000000) that perfectly matches the image sequence background, so the character appears to exist seamlessly in the webpage with no visible edges. There must be no background lights or UI panels breaking the black void.

Include an ultra-minimal, fixed top navigation bar: a slim, glassmorphism nav with subtle backdrop blur, starting transparent and fading to translucent black on scroll. It features a bold 'SUMIT.' logo on the left, centered links ('About', 'Work', 'Contact'), and a right-aligned CTA button ('Let's Talk') with a delicate 1px border. Use a strictly monochrome palette—pitch black backgrounds, crisp white text (text-white/90 for headings, text-white/60 for body)—for maximum contrast and an editorial, high-tech look. Typography should use Inter or SF Pro with tight tracking and bold, punchy headings.

The scroll-linked canvas animation is the core interaction: At 0-25% scroll, show an extreme close-up of Sumit (a young South Asian man in black tactical gear) staring intensely into the camera, with the text 'Hi, I'm Sumit. Creative Developer.' fading in. From 25-50% scroll, the camera smoothly zooms out and anchors his body to the far-left side of the screen. He holds exactly ONE katana. The right side becomes pure black negative space. Here, right-aligned text fades in: 'Precision in every pixel. Building digital experiences with the discipline of a warrior.' 

From 50-75% scroll, he slowly and deliberately raises the katana with both hands, bringing the blade up. The text on the right transitions to: 'Sharpening the edge of the web. Mastering immersive animations and interactive storytelling.' From 75-100% scroll, he holds the final stance with the blade vertical in front of his face. The final right-aligned copy appears: 'Let's build something extraordinary.', paired with a stark, minimal CTA button reading 'View My Work'. 

The scroll transitions must feel smooth, buttery, and hardware-accelerated. All typography overlays should use subtle fades and eased upward slides. Optimize for an Awwwards-level, luxury portfolio experience with photorealistic character rendering, disciplined minimalism, and highly impactful interactive storytelling."
]