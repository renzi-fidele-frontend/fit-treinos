export function googleAuth() {
   window.open(`${import.meta.env.VITE_BACKEND_URL}/auth/google/callback`, "_self");
}

export function facebookAuth() {
   window.open(`${import.meta.env.VITE_BACKEND_URL}/auth/facebook/callback`, "_self");
}
