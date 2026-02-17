import { exit } from "@tauri-apps/plugin-process";

// Add a keydown listener to the window
window.addEventListener('keydown', async (e) => {
  if (e.key === 'Escape') {
    // Optional: Prevent default browser behavior (if any)
    e.preventDefault(); 
    console.log("KEYDOWN")
    
    // Exit App
    await exit(0);
  }
});
