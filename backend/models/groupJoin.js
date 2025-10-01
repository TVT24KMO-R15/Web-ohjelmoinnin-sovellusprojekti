import { pool } from "../helpers/dbHelper.js";

// INSERT INTO group_join_requests (fk_groupid, fk_accountid) VALUES ('1', '1');
// - 'pending', 'accepted', 'rejected', 'canceled'


/*
- get pending requests to group x, with username/id?

- send a join request to a group as a user 
- remove join request as a user

- accept join request as a owner
- deny join request as a owner

*/

const queryRequestsForGroup = async (groupid) => {
  return await pool.query("SELECT * FROM group_join_requests WHERE fk_groupid=$1", 
    [groupid]
  );
};


/* full query used:

SELECT -- output fields
    g.groupname AS requesting_to_group_name,
    owner.accountid AS owner_id,
    owner.username AS owner_username,
    requester.accountid AS requester_id,
    requester.username AS username,
    gjr.requestdate,
    gjr.status,
    gjr.fk_groupid AS requesting_to_group
FROM
    group_join_requests AS gjr -- show data from gjr table
JOIN public.groups AS g ON gjr.fk_groupid = g.groupid -- get groupid that the request is going to
JOIN public.account AS requester ON gjr.fk_accountid = requester.accountid -- get the requeseter id into join request
JOIN public.account AS owner ON g.fk_ownerid = owner.accountid -- get the owner id on group owner
WHERE status='pending' AND g.fk_ownerid = 7; -- filter results
*/

// uses group owner id to get all pending requests for the group the account owns
// returns [username | accountid]
const queryPendingUsersWithOwnerID = async (ownerid) => {
  return await pool.query(
    "SELECT \
      g.groupname AS requesting_to_group_name, \
      requester.username AS username, \
      gjr.requestdate, \
      gjr.status \
    FROM \
      group_join_requests AS gjr \
    JOIN public.groups AS g ON gjr.fk_groupid = g.groupid \
    JOIN public.account AS requester ON gjr.fk_accountid = requester.accountid \
    JOIN public.account AS owner ON g.fk_ownerid = owner.accountid \
    WHERE status='pending' AND g.fk_ownerid=$1 ORDER BY requestdate;",
    [ownerid]
  );
};

const queryInsertJoinRequest = async (groupid, accountid) => {
  return await pool.query(
    "INSERT INTO group_join_requests (fk_groupid, fk_accountid) VALUES ($1, $2) RETURNING *",
    [groupid, accountid]
  );
};


export { queryRequestsForGroup, queryInsertJoinRequest, queryPendingUsersWithOwnerID };