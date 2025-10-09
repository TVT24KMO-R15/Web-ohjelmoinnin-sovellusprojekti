import { Router } from "express";
import { getRequestsForGroup, sendJoinRequest, getPendingRequestsAsOwner, getPendingRequestsAsUser, getRequestsByUserAndGroup, removeSentRequest, removeRejectedRequest, removeAcceptedRequest, acceptJoinRequest, denyJoinRequest } from "../controllers/groupJoinController.js";
import { auth } from "../helpers/authHelper.js";

const router = Router();

// url/groupjoin/*endpoint*
router.get('/requests/:groupid', auth, getRequestsForGroup); // not used (?) YES used (!)
router.get('/pendingrequests/received/:ownerid', auth, getPendingRequestsAsOwner); // with group owner id, returns all usernames that want to join groups
router.get('/pendingrequests/sent/:accountid', auth, getPendingRequestsAsUser); // with user id, see all sent requests to groups
router.get('/requeststatus/:groupid/:accountid', auth, getRequestsByUserAndGroup);
router.post('/pendingrequests/remove/:accountid/:groupid', auth, removeSentRequest); // remove a sent join request as user into a specific group
router.post('/pendingrequests/removerejected/:accountid/:groupid', auth, removeRejectedRequest); // remove a rejected join request
router.post('/pendingrequests/removeaccepted/:accountid/:groupid', auth, removeAcceptedRequest); // remove an accepted join request (when removing member from group)
router.post('/join/:accountid/:groupid', auth, sendJoinRequest); // send a join request with groupid and accountid
router.post('/pendingrequests/accept/:requestid', auth, acceptJoinRequest) // reject request
router.post('/pendingrequests/reject/:requestid', auth, denyJoinRequest) // accept request

export default router;
