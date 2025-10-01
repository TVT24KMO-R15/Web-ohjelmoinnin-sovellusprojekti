import { Router } from "express";
import { sendJoinRequest, getPendingRequestsAsOwner, getPendingRequestsAsUser, removeSentRequest } from "../controllers/groupJoinController.js";

const router = Router();

/* ideas
- get pending requests to group x, with username/id? DONE
- send a join request to a group as a user DONE
- see own pending requests as user DONE
- remove join request as a user DONE

- accept join request as a owner
- deny join request as a owner
- on accept, update tables to set user into group
*/


/**
 * @swagger
 * tags:
 *   - name: GroupJoin
 *     description: Group join request endpoints
*/

// url/groupjoin/*endpoint*
//router.get('/requests/:groupid', getRequestsForGroup); // not used (?)
router.get('/pendingrequests/received/:ownerid', getPendingRequestsAsOwner); // with group owner id, returns all usernames that want to join groups
router.get('/pendingrequests/sent/:accountid', getPendingRequestsAsUser); // with user id, see all sent requests to groups
router.post('/pendingrequests/remove/:accountid/:groupid', removeSentRequest); // remove a sent join request as user into a specific group
router.post('/join/:accountid/:groupid', sendJoinRequest); // send a join request with groupid and accountid

export default router;
