const passport = require("passport");
const Usuario = require("../models/Usuario");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

passport.use(
   new GoogleStrategy(
      {
         clientID: process.env.GOOGLE_CLIENT_SECRET_KEY,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
         callbackURL: "/api/auth/google/callback",
         scope: ["profile", "email"],
      },
      async function (accessToken, refreshToken, profile, done) {
         try {
            let existeUser = Usuario.findOne({ googleId: profile.id });
            if (!existeUser) {
               const usuarioAdicionado = new Usuario({ nome: profile.displayName, email: profile.emails[0].value, googleId: profile.id });
               usuarioAdicionado.save();
            }
            done(false, usuarioAdicionado);
         } catch (error) {
            done(error, false);
         }
      }
   )
);

passport.serializeUser((user, done) => {
   done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
   try {
      const user = await Usuario.findById(id);
      done(null, user);
   } catch (error) {
      done(error, false);
   }
});

module.exports = passport;
