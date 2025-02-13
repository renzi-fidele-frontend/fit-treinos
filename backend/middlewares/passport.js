const passport = require("passport");
const Usuario = require("../models/Usuario");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const jwt = require("jsonwebtoken");

passport.use(
   new GoogleStrategy(
      {
         clientID: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
         callbackURL: "/api/auth/google/callback",
         scope: ["profile", "email"],
      },
      async function (accessToken, refreshToken, profile, done) {
         try {
            let existeUser = await Usuario.findOne({ googleId: profile.id });
            let usuarioAdicionado;
            if (!existeUser) {
               usuarioAdicionado = new Usuario({
                  nome: profile.displayName,
                  email: profile?.emails[0]?.value,
                  googleId: profile.id,
                  foto: profile?.photos[0]?.value,
               });
               usuarioAdicionado.save();
               const token = jwt.sign({ userId: usuarioAdicionado.id }, process.env.JWT_SECRET);
               done(false, { user: usuarioAdicionado.toObject(), token });
            } else {
               const token = jwt.sign({ userId: existeUser.id }, process.env.JWT_SECRET);
               done(false, { user: existeUser.toObject(), token });
            }
         } catch (error) {
            done(error, false);
         }
      }
   )
);
passport.use(
   new FacebookStrategy(
      {
         clientID: process.env.FB_ID,
         clientSecret: process.env.FB_SECRET,
         callbackURL: "/api/auth/facebook/callback",
         scope: ["email", "public_profile"],
         profileFields: ["email", "photos", "name"],
      },
      async function (accessToken, refreshToken, profile, done) {
         try {
            let existeUser = await Usuario.findOne({ facebookId: profile.id });
            let usuarioAdicionado;
            if (!existeUser) {
               usuarioAdicionado = new Usuario({
                  nome: profile?.name?.givenName + " " + profile?.name?.familyName,
                  email: profile?.emails[0]?.value,
                  facebookId: profile.id,
                  foto: profile?.photos[0]?.value,
               });
               usuarioAdicionado.save();
               const token = jwt.sign({ userId: usuarioAdicionado.id }, process.env.JWT_SECRET);
               done(false, { user: usuarioAdicionado.toObject(), token });
            } else {
               const token = jwt.sign({ userId: existeUser.id }, process.env.JWT_SECRET);
               done(false, { user: existeUser.toObject(), token });
            }
         } catch (error) {
            done(error, false);
         }
      }
   )
);

module.exports = passport;
