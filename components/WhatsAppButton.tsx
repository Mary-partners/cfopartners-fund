import { WHATSAPP_URL } from "@/lib/links";

/**
 * Floating WhatsApp chat button, fixed to the bottom-right corner on every
 * page. WhatsApp is the channel most Kenyan founders reach for first.
 */
export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with CFO Partners on WhatsApp"
      className="fixed bottom-6 right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-110"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M16.004 3C9.382 3 4 8.382 4 15.004c0 2.65.87 5.1 2.34 7.08L4.06 28.7a.75.75 0 0 0 .94.94l6.74-2.27a11.92 11.92 0 0 0 4.26.78h.01C22.63 28.15 28 22.77 28 16.15 28 9.53 22.626 3 16.004 3zm0 2.25c5.39 0 9.746 4.51 9.746 9.9 0 5.39-4.36 9.75-9.75 9.75a9.7 9.7 0 0 1-3.95-.84.75.75 0 0 0-.55-.04l-4.59 1.55 1.52-4.47a.75.75 0 0 0-.1-.68 9.66 9.66 0 0 1-1.83-5.67c0-5.39 4.36-9.5 9.5-9.5zm-3.77 4.93c-.22 0-.57.08-.87.4-.3.32-1.14 1.11-1.14 2.71 0 1.6 1.17 3.15 1.33 3.37.16.21 2.25 3.6 5.56 4.9 2.75 1.09 3.31.87 3.91.82.6-.06 1.93-.79 2.2-1.55.27-.76.27-1.41.19-1.55-.08-.13-.3-.21-.62-.37-.32-.16-1.93-.95-2.23-1.06-.3-.11-.52-.16-.73.16-.21.32-.84 1.06-1.03 1.27-.19.21-.38.24-.7.08-.33-.16-1.38-.51-2.62-1.62-.97-.86-1.62-1.93-1.81-2.25-.19-.33-.02-.5.14-.66.15-.15.33-.38.49-.57.16-.19.21-.33.32-.54.11-.22.05-.41-.03-.57-.08-.16-.71-1.76-1-2.4-.26-.58-.53-.5-.73-.51-.19-.01-.41-.01-.63-.01z" />
      </svg>
    </a>
  );
}
