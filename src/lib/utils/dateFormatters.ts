/**
 * Formats a date string into Chinese format (YYYY年MM月DD日)
 * @param dateString - ISO date string or any valid date string
 * @returns Formatted Chinese date string
 */
export function formatChineseDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
}

/**
 * Formats a date string into relative time in Chinese
 * @param dateString - ISO date string or any valid date string
 * @returns Relative time string (今天, 昨天, X天前, etc.)
 */
export function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return '今天';
    if (diffDays === 1) return '昨天';
    if (diffDays < 7) return `${diffDays}天前`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}周前`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}个月前`;
    return `${Math.floor(diffDays / 365)}年前`;
}

/**
 * Converts English date strings like "November 1" to Chinese format "11月1日"
 * @param dateStr - English date string (e.g., "November 1", "January 15")
 * @returns Chinese formatted date string
 */
export function convertEnglishDateToChinese(dateStr: string): string {
    const monthMap: { [key: string]: number } = {
        'January': 1,
        'February': 2,
        'March': 3,
        'April': 4,
        'May': 5,
        'June': 6,
        'July': 7,
        'August': 8,
        'September': 9,
        'October': 10,
        'November': 11,
        'December': 12
    };

    // Pattern to match "Month Day" format
    const monthDayPattern = /(\w+)\s+(\d+)/g;
    
    return dateStr.replace(monthDayPattern, (match, monthName, day) => {
        const monthNumber = monthMap[monthName];
        if (monthNumber) {
            return `${monthNumber}月${day}日`;
        }
        return match; // Return original if month not found
    });
}