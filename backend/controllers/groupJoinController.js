import {
  queryInsertJoinRequest,
  queryRequestsForGroup,
  queryPendingUsersWithOwnerID,
  queryGetRequestsFromAccountID,
  queryRequestByAccountIdAndGroup,
  queryDeleteSentRequest,
  queryAcceptJoinRequest,
  queryDenyJoinRequest,
  queryInsertUserIntoTables
} from "../models/groupJoin.js";

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
    console.log("received join requests successfully");
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
  if (!req.params.groupid || !req.params.accountid) {
    return res.status(500).json({error: "group id and account id required"});
  }

  const groupid = req.params.groupid
  const accountid = req.params.accountid

  try {
    const result = await queryInsertJoinRequest(groupid, accountid);
    console.log("join request sent")
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
  console.log("trying to get sent requests as user")
  if (!req.params.accountid) {
    return res.status(404).json({ error: "accountid required" });
  }

  const accountid = req.params.accountid;
  
  try {
    const result = await queryGetRequestsFromAccountID(accountid);
    if (result.rows.length === 0) {
      return res.status(200).json({ result: "No pending requests found" });
    }
    console.log("got sent join requests for user: ", req.params.accountid);
    return res.status(200).json({ result: result.rows });
  } catch (error) {
    if (error.message.includes("invalid input syntax for type integer")) {
      return res.status(500).json({ error: "invalid accountid input" });
    }
    return next(error);
  }
};


const getRequestsByUserAndGroup = async (req, res, next) => {
  const groupid = req.params.groupid;
  const accountid = req.params.accountid;
  console.log('getting group join request for user: ' + accountid + ' for group: ' + groupid)
  if (!groupid || !accountid) {
    return res.status(404).json({ error: "accountid and groupid required" });
  }

  try {
    const result = await queryRequestByAccountIdAndGroup(groupid, accountid)
    if (result.rows.length === 0) {
      return res.status(200).json({ result: "No join request found for group " + groupid + " for user " + accountid });
    }
    console.log("Found join request for group "+ groupid + " for account " + accountid + " with status " + result.rows.request_status)
    return res.status(200).json({ result: result.rows });

  } catch (error) {
    return next(error)
  }
}


const removeSentRequest = async (req, res, next) => {
  console.log("trying to remove sent request")
  if (!req.params.accountid || !req.params.groupid) {
    return res.status(500).json({ error: "accountid and groupid required" });
  }

  const accountid = req.params.accountid;
  const groupid = req.params.groupid;

  try {
    const result = await queryDeleteSentRequest( groupid, accountid);
    if (result.rowCount === 1) {
      console.log("deleted join request into group ", groupid, " by account: ", accountid);
      return res.status(200).json({ status: "Join request deleted" });
    } else {
      return res.status(500).json({ error: "delete failed" });
    }
  } catch (error) {
    if (error.message.includes("invalid input syntax for type integer")) {
      return res.status(500).json({ error: "invalid url input" });
    }
    return next(error);
  }
};

const acceptJoinRequest = async (req, res, next) => {
  if (!req.params.requestid) {
    return res.status(500).json({ error: "No join request provided" });
  }
  const requestid = req.params.requestid;
  try {
    const result = await queryAcceptJoinRequest(requestid);
    if (result.rowCount === 0) {
      return res.status(500).json({ error: "failed to accept join request" });
    }
    console.log("Accepted join request: ", requestid);
    console.log("inserting user into tables")
    queryInsertUserIntoTables(requestid);
    return res.status(200).json({ status: "Accepted join request" });
  } catch (error) {
    if (error.message.includes("invalid input syntax for type integer")) {
      return res.status(500).json({ error: "Invalid input" });
    }
    return next(error);
  }
};

const denyJoinRequest = async (req, res, next) => {
  if (!req.params.requestid) {
    return res.status(500).json({ error: "No request ID provided" });
  }
  const requestid = req.params.requestid;
  try {
    const result = await queryDenyJoinRequest(requestid);
    if (result.rowCount === 0) {
      return res.status(500).json({ error: "failed to deny join request" });
    }
    console.log("Denied join request: ", requestid);
    return res.status(200).json({ status: "Denied join request" });
  } catch (error) {
    if (error.message.includes("invalid input syntax for type integer")) {
      return res.status(500).json({ error: "Invalid input" });
    }
    return next(error);
  }
};


export { sendJoinRequest, getPendingRequestsAsOwner, getPendingRequestsAsUser, getRequestsByUserAndGroup, removeSentRequest, acceptJoinRequest, denyJoinRequest };


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