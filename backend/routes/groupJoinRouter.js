import { Router } from "express";
import { sendJoinRequest, getPendingRequestsAsOwner, getPendingRequestsAsUser } from "../controllers/groupJoinController.js";

const router = Router();

/*
endpoints 
- get pending requests to group x, with username/id? DONE 

- send a join request to a group as a user 
- remove join request as a user

- accept join request as a owner
- deny join request as a owner

*/
//router.get('/requests/:groupid', getRequestsForGroup); // not used (?)

/**
 * @swagger
 * tags:
 *   - name: GroupJoin
 *     description: Group join request endpoints
 */

router.get('/pendingrequests/received/:ownerid', getPendingRequestsAsOwner);
router.get('/pendingrequests/sent/:userid', getPendingRequestsAsUser);
router.post('/join/', sendJoinRequest);

export default router;
