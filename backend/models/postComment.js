import { pool } from '../helpers/dbHelper.js'

const queryPostCommentsByPostId = async ( postid ) => {
  const res = await pool.query('SELECT * FROM grouppost_comment WHERE fk_grouppost = $1', [postid])
  return res.rows
}

const createPostComment = async ( postid, accountid, text ) => {
  const res = await pool.query('INSERT INTO grouppost_comment (comment_text, fk_grouppost, fk_accountid) VALUES ($1, $2, $3) RETURNING *',
    [text, postid, accountid])
  return res.rows[0]
}

const deletePostCommentById = async ( commentid ) => {
  const res = await pool.query('DELETE FROM grouppost_comment WHERE comment_id = $1 RETURNING *', [commentid])
  return res.rows[0]
}

const queryPostCommentsByUserId = async ( accountid ) => {
  const res = await pool.query('SELECT * FROM grouppost_comment WHERE fk_accountid = $1', [accountid])
  return res.rows
}

const queryCheckGroupMembership = async ( accountid, postid ) => {
  const result = await pool.query(`
  SELECT 1
  FROM public.groupposts gp
      JOIN public.groups g ON gp.fk_groupid = g.groupid
      JOIN public.user_group_linker ugl ON g.groupid = ugl.fk_groupid
  WHERE gp.postid = $2
      AND ugl.fk_accountid = $1;
  `, [accountid, postid]);
  return result.rowCount > 0; // SELECT 1 returns one row if true
}

// checks if user deleting is owner or a member of the group that owns the post
const queryCheckCommentDeletePermission = async ( accountid, commentid ) => {
  const result = await pool.query(`
  SELECT 1
  FROM public.grouppost_comment gc
      JOIN public.groupposts gp ON gc.fk_grouppost = gp.postid
      JOIN public.groups g ON gp.fk_groupid = g.groupid
      JOIN public.user_group_linker ugl ON g.groupid = ugl.fk_groupid
  WHERE gc.comment_id = $2
      AND (gc.fk_accountid = $1 OR ugl.fk_accountid = $1);
  `, [accountid, commentid]);
  return result.rowCount > 0;
}

export { queryPostCommentsByPostId, createPostComment, deletePostCommentById, queryPostCommentsByUserId, queryCheckGroupMembership, queryCheckCommentDeletePermission }