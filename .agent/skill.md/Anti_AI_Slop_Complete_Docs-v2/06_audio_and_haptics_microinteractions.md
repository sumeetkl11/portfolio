# 06. Subtle Audio & Haptics Microinteractions

## 1. What is it & Why it exists
**What:** Micro-sound feedback on user interactions (switching tabs, button clicks, toggles).
**Why:** Award-winning sites (Linear, Family.co) feel physical and responsive because interaction triggers tiny, pleasant audio cues.

## 2. Setup Guide & Configuration
**Install use-sound:**
`npm install use-sound`

**Setup Sound Hook Component:**
```jsx
import useSound from 'use-sound';

export const TactileButton = ({ children, onClick, ...props }) => {
  // Sound file should be lightweight (~5KB mp3/ogg)
  const [playClick] = useSound('/sounds/soft-click.mp3', { volume: 0.12 });

  return (
    <button
      onClick={(e) => {
        playClick();
        onClick && onClick(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
};
```

## 3. Expert Advice & Pro Tips
- **Ultra-Low Volume:** Sound volume must never exceed 10-15%. It must be felt subconsciously rather than heard loudly.
- **Global Mute Switch:** Always provide a subtle toggle icon in the navigation bar/footer so users can mute all sound effects.
- **Mobile Guard:** Disable sound on mobile touch devices where system haptic feedback is already present.
