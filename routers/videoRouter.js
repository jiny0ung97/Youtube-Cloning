import express from "express";
import routes from "../routes";
import { onlyPrivate, uploadVideo } from "../middlewares"
import { deleteVideo, getEditVideo, postEditVideo, getUpload, postUpload, videoDetail } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

videoRouter.get(routes.videoDetail(), videoDetail);

videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;