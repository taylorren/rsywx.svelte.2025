import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
    if (!browser) return 'light';

    // Check localStorage first
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
        return stored;
    }

    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
    if (!browser) return;

    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

function createThemeStore() {
    const { subscribe, set, update } = writable<Theme>('light');

    return {
        subscribe,
        init: () => {
            if (!browser) return;

            const initialTheme = getInitialTheme();
            applyTheme(initialTheme);
            set(initialTheme);
        },
        set: (theme: Theme) => {
            if (browser) {
                localStorage.setItem('theme', theme);
                applyTheme(theme);
            }
            set(theme);
        },
        toggle: () => {
            update(currentTheme => {
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                if (browser) {
                    localStorage.setItem('theme', newTheme);
                    applyTheme(newTheme);
                }
                return newTheme;
            });
        }
    };
}

export const theme = createThemeStore();