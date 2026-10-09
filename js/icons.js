// Иконки (SVG)
function SI(z){return '<svg viewBox="0 0 24 24" width="'+z+'" height="'+z+'"><path d="M12 2.4l2.9 6.2 6.8.8-5 4.7 1.3 6.8L12 17.6 6 20.9l1.3-6.8-5-4.7 6.8-.8z" fill="#ffc83d" stroke="#ff9f0a" stroke-width="1" stroke-linejoin="round"/></svg>'}
function TI(z){return '<svg viewBox="0 0 24 24" width="'+z+'" height="'+z+'"><circle cx="12" cy="12" r="11" fill="#0098EA"/><path d="M7.6 7.8h8.8c.8 0 1.3.9.9 1.6L12.9 16.6a1 1 0 0 1-1.8 0L6.7 9.4c-.4-.7.1-1.6.9-1.6z" fill="none" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 8v9" stroke="#fff" stroke-width="1.5"/></svg>'}
var WA1='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16l1.2 5a3.2 3.2 0 0 1-6.4 0 3.2 3.2 0 0 1-6.4 0 3.2 3.2 0 0 1-6.4 0L4 4zM5 12v8h14v-8"/></svg>',
WA2='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3 8-8"/><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h9"/></svg>',
WA3='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M7 8h11l-3-3M17 16H6l3 3"/></svg>';
function sv(x){return '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+x+'</svg>'}
var IC={user:sv('<circle cx="12" cy="8" r="4" fill="#fff" stroke="none"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z" fill="#fff" stroke="none"/>'),
gear:sv('<path fill="#fff" stroke="none" d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>'),
layers:sv('<path d="M12 3 3 8l9 5 9-5-9-5z" fill="#fff"/><path d="M3 12.5l9 5 9-5M3 16.5l9 5 9-5"/>'),
clock:sv('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>'),
task:sv('<path d="M9 11l3 3 8-8"/><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h9"/>'),
gift:sv('<rect x="3" y="8" width="18" height="4" rx="1" fill="#fff" stroke="none"/><path d="M5 12v8h14v-8M12 8v12M12 8c-2-4-6-3-5 0 .6 1.6 3.5 1 5 0M12 8c2-4 6-3 5 0-.6 1.6-3.5 1-5 0"/>'),
auto:sv('<path d="M13 2 4 14h7l-1 8 9-12h-7z" fill="#fff" stroke="none"/>'),
trophy:sv('<path d="M7 4h10v5a5 5 0 0 1-10 0V4z" fill="#fff"/><path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3M12 14v4M8 21h8M9 18h6"/>'),
shop:sv('<path d="M4 4h16l1.2 5a3.2 3.2 0 0 1-6.4 0 3.2 3.2 0 0 1-6.4 0 3.2 3.2 0 0 1-6.4 0L4 4z" fill="#fff" stroke="none"/><path d="M5 12v8h14v-8M10 20v-5h4v5"/>')};
var PLUSC='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fff"/><path d="M12 7v10M7 12h10" stroke="#4a7fe6" stroke-width="2.4" stroke-linecap="round"/></svg>',
TAGC='<svg viewBox="0 0 24 24"><path d="M3 12.5V4.5A1.5 1.5 0 0 1 4.5 3h8L21 11.5 12.5 20z" fill="#fff"/><circle cx="8" cy="8" r="1.7" fill="#4a7fe6"/></svg>';
