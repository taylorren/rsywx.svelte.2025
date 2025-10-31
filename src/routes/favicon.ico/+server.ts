import { redirect } from '@sveltejs/kit';

/**
 * Redirect /favicon.ico requests to the favicon stored under /images/favicon.ico
 * This avoids 404s from user agents that request the root /favicon.ico path.
 */
export function GET() {
    throw redirect(307, '/images/favicon.ico');
}
