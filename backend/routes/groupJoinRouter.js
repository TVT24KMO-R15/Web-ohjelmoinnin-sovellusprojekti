import { Router } from "express";
import { getRequestsForGroup, sendJoinRequest, getPendingRequestsAsOwner, getPendingRequestsAsUser, getRequestsByUserAndGroup, removeSentRequest, acceptJoinRequest, denyJoinRequest } from "../controllers/groupJoinController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: GroupJoin
 *     description: Group join request endpoints
*/

/**
 * @swagger
 * /groupjoin/pendingrequests/received/{ownerid}:
 *   get:
 *     summary: Get all pending join requests for groups owned by the user
 *     tags: [GroupJoin]
 *     parameters:
 *       - in: path
 *         name: ownerid
 *         required: true
 *         description: The ID of the group owner
 *         schema:
 *           type: string
 * responses:
 *   200:
 *     description: A list of pending join requests
 */

// url/groupjoin/*endpoint*
router.get('/requests/:groupid', getRequestsForGroup); // not used (?) YES used (!)
router.get('/pendingrequests/received/:ownerid', getPendingRequestsAsOwner); // with group owner id, returns all usernames that want to join groups
router.get('/pendingrequests/sent/:accountid', getPendingRequestsAsUser); // with user id, see all sent requests to groups
router.get('/requeststatus/:groupid/:accountid', getRequestsByUserAndGroup);
router.post('/pendingrequests/remove/:accountid/:groupid', removeSentRequest); // remove a sent join request as user into a specific group
router.post('/join/:accountid/:groupid', sendJoinRequest); // send a join request with groupid and accountid
router.post('/pendingrequests/accept/:requestid', acceptJoinRequest) // reject request
router.post('/pendingrequests/reject/:requestid', denyJoinRequest) // accept request

export default router;
