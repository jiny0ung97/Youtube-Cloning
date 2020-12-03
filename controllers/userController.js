import passport from "passport";
import routes from "../routes";
import User from "../models/User";

// Join
export const getJoin = (req, res) =>
    res.render("join.pug", { pageTitle: "Join" });

export const postJoin = async (req, res, next) => {
    const {
        body: { name, email, password, password2 }
    } = req;
    if (password !== password2) {
        res.status(400);
        res.render("join.pug", { pageTitle: "Join" });
    } else {
        try {
            const user = await User({
                name, email
            });
            await User.register(user, password);
            next();
        } catch(error) {
            console.log(error);
            res.redirect(routes.home);
        }
    }
};

// Log In
export const getLogin = (req, res) =>
    res.render("login.pug", { pageTitle: "Login" });

export const postLogin = passport.authenticate('local', {
    failureRedirect: routes.login,
    successRedirect: routes.home
});

export const githubLogin = passport.authenticate('github');

export const postGithubLogin = (req, res) => {
    res.redirect(routes.home);
};

export const githubLoginCallback = async (accessToken, refreshToken, profile, cb) => {
    const { _json: { id, avatar_url, name, email } } = profile;

    try {
        const user = await User.findOne({ email });
        if (user) {
            user.githubId = id;
            user.save();
            return cb(null, user);
        } else {
            const newUser = await User.create({
                email,
                name,
                githubId: id,
                avatarUrl: avatar_url
            });
            return cb(null, newUser);
        }
    } catch(error) {
        return cb(error);
    }
};

// Log Out
export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);
};

// User Detail
export const getMe = (req, res) => {
    res.render("userDetail.pug", { pageTitle: "User Detail", user: req.user });
};

export const userDetail = async (req, res) => {
    const { params: { id } } = req;
    try {
        const user = await User.findById(id).populate('videos');
        res.render("userDetail.pug", { pageTitle: "User Detail", user });
    } catch(error) {
        res.redirect(routes.home);
    }
}

// Edit Profile
export const getEditProfile = (req, res) => {
    res.render("editProfile.pug", { pageTitle: "Edit Profile"});
}

export const postEditProfile = async (req, res) => {
    const {
        body: { name, email },
        file
    } = req;

    try {
        const user = await User.findByIdAndUpdate(req.user.id, {
            name,
            email,
            avatarUrl: file ? file.path : req.user.avatarUrl
        });
        res.redirect(routes.me);
    } catch(error) {
        res.render("editProfile.pug", { pageTitle: "Edit Profile"});
    }
}

// Change Password
export const getChangePassword = (req, res) => {
    res.render("changePassword.pug", { pageTitle: "Change Password"});
}

export const postChangePassword = async (req, res) => {
    const {
        body: { old_password, new_password, new_password2 }
    } = req;

    try {
        if (new_password !== new_password2) {
            res.status(400);
            res.redirect("changePassword.pug", { pageTitle: "Change Password"});
            return;
        }

        await req.user.changePassword(old_password, new_password);
        res.redirect(routes.me);
    } catch (error) {
        res.redirect("editProfile.pug", { pageTitle: "Edit Profile"});
    }
};