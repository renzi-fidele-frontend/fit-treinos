export function googleAuth() {
   window.open(`${import.meta.env.VITE_BACKEND_URL}/auth/google/callback`, "_self");
}
