/**
 * An array of public routes that are accessible to all users.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ['/'];

/**
 * An array of routes for authentication.
 * These routes will redirect to the settings page if the user is authenticated.
 * @type {string[]}
 */
export const authRoutes = ['/auth/login', '/auth/register', '/auth/error '];

/**
 * The prefix for API authentication routes.
 * Routes that starts with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect URL after a successful login.
 * @type {string}
 */
export const DEFAULT_LOGGEDIN_REDIRECT = '/settings';

/**
 * The default redirect URL when needs to login.
 * @type {string}
 */
export const LOGIN_PAGE_URL = '/auth/login';
