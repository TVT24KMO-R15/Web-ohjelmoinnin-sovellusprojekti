import {
  queryInsertJoinRequest,
  queryRequestsForGroup,
  queryPendingUsersWithOwnerID,
  queryGetRequestsFromAccountID
} from "../models/groupJoin.js";

/* ideas
- get pending requests to group x, with username/id? DONE
- send a join request to a group as a user DONE
- see own pending requests as user DONE

- remove join request as a user

- accept join request as a owner
- deny join request as a owner

- on accept, update tables to set user into group
*/



const getPendingRequestsAsOwner = async (req, res, next) => {
  const ownerid = req.params.ownerid;
  console.log("getting join requests into groups owned by owner_id: ", ownerid);
  try {
    const result = await queryPendingUsersWithOwnerID(ownerid)
    if (result.rows.length === 0) {
      return res
        .status(200)
        .json({ requests: "No pending join requests"});
    }
    return res.status(200).json({requests: result.rows});
  } catch (error) {
    return next(error)
  }
};

/* usage:
POST http://localhost:3000/groupjoin/join/
{
  "groupid" : 5,
  "accountid" : 5
}
*/

const sendJoinRequest = async (req, res, next) => {
  console.log("Sending join request")
  if (!req.body || !req.body.groupid || !req.body.accountid) {
    return res.status(500).json({error: "group id and account id required"});
  }
  const groupid = req.body.groupid
  const accountid = req.body.accountid

  try {
    const result = await queryInsertJoinRequest(groupid, accountid);
    console.log("result:" ,result);
    return res.status(201).json({status: "Successfully sent join request to group!"})
  } catch (error) {
    if (error.message.includes("duplicate key value violates unique constraint")) {
      return res.status(500).json({ error: "Already requested to join group" });
    } else if (error.message.includes("insert or update on table")) {
      return res.status(500).json({ error: "Incorrect group or account" });
    }
    return next(error);
  }
};

// http://localhost:3000/groupjoin/pendingrequests/sent/7
const getPendingRequestsAsUser = async (req, res, next) => {
  if (!req.params.userid) {
    return res.status(404).json({ error: "Userid required" });
  }

  const userid = req.params.userid;
  console.log(typeof userid);

  console.log("getting pending requests for user: ", req.params.userid);

  try {
    const result = await queryGetRequestsFromAccountID(userid);
    if (result.rows.length === 0) {
      return res.status(200).json({ result: "No pending requests found" });
    }
    return res.status(200).json({ result: result.rows });
  } catch (error) {
    if (error.message.includes("invalid input syntax for type integer")) {
      return res.status(500).json({ error: "invalid userid input" });
    }
    return next(error);
  }
};



export { sendJoinRequest, getPendingRequestsAsOwner, getPendingRequestsAsUser };


/*
const getRequestsForGroup = async (req, res, next) => {
  const groupid = req.params.groupid;
  console.log("Getting join requests for group id: ", groupid);
  try {
    const result = await queryRequestsForGroup(groupid);
    console.log("got group join requests for group id: ", result.rows);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: `No join requests for group ${groupid}` });
    }
    return res.status(200).json(result.rows);
  } catch (error) {
    return next(error);
  }
};
*/