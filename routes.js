// Global

const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// Users

const USERS = "/users";
const USER_DETAIL = "/users/:id";
const EDIT_PROFILE = "/users/edit-profile";
const CHANGE_PASSWORD = "/users/change-password";
const ME = "/me";

// Github-login
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// Videos

const VIDEOS = "/videos";
const UPLOAD = "/videos/upload";
const VIDEO_DETAIL = "/videos/:id";
const EDIT_VIDEO = "/videos/:id/edit";
const DELETE_VIDEO = "/videos/:id/delete";

const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    search: SEARCH,
    users: USERS,
    userDetail: id => {
        if (id) {
            return `/users/${id}`;
        } else {
            return USER_DETAIL;
        }
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    me: ME,
    github:GITHUB,
    githubCallback: GITHUB_CALLBACK,
    videos: VIDEOS,
    upload: UPLOAD,
    videoDetail: id => {
        if (id) {
            return `/videos/${id}`;
        } else {
            return VIDEO_DETAIL;
        }
    },
    editVideo: (id) => {
        if (id) {
            return `/videos/${id}/edit`;
        } else {
            return EDIT_VIDEO;
        }
    },
    deleteVideo: (id) => {
        if (id) {
            return `/videos/${id}/delete`;
        } else {
            return DELETE_VIDEO;
        }
    }
};

export default routes;