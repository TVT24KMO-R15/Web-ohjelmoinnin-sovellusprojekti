-- tested on createDatabase_V1.sql

BEGIN;

ALTER TABLE account
    ALTER COLUMN "registrationDate"
    TYPE TIMESTAMP WITH TIME ZONE
        USING "registrationDate" AT TIME ZONE 'UTC+3';

ALTER TABLE account
    ALTER COLUMN "registrationDate"
    SET DEFAULT CURRENT_TIMESTAMP(0);



ALTER TABLE review
    ALTER COLUMN reviewdate
        TYPE TIMESTAMP WITH TIME ZONE
        USING reviewdate AT TIME ZONE 'UTC+3';

ALTER TABLE review
    ALTER COLUMN reviewdate
        SET DEFAULT CURRENT_TIMESTAMP(0);


CREATE TABLE grouppost_comment
(
    comment_id serial,
    comment_text text NOT NULL,
    fk_grouppost integer NOT NULL,
    comment_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP(0),
    fk_accountid integer NOT NULL,
    CONSTRAINT commentid_pk PRIMARY KEY (comment_id)
);


ALTER TABLE IF EXISTS grouppost_comment
    ADD CONSTRAINT grp_comment_grp_post FOREIGN KEY (fk_grouppost)
    REFERENCES public.groupposts (postid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS grouppost_comment
    ADD CONSTRAINT grp_comment_accountid FOREIGN KEY (fk_accountid)
    REFERENCES public.account (accountid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;

CREATE TYPE request_status AS ENUM
    ('pending', 'accepted', 'rejected', 'canceled'); -- canceled for maybe if user wants to undo request?

CREATE TABLE IF NOT EXISTS group_join_requests
(
    request_id serial,
    fk_groupid integer NOT NULL,
    fk_accountid integer NOT NULL,
    requestdate timestamp with time zone DEFAULT CURRENT_TIMESTAMP(0),
    CONSTRAINT pk_reqid PRIMARY KEY (request_id),
    CONSTRAINT unique_requests_group_account UNIQUE (fk_groupid, fk_accountid)
);

ALTER TABLE IF EXISTS public.group_join_requests
    ADD CONSTRAINT fk_group FOREIGN KEY (fk_groupid)
    REFERENCES public.groups (groupid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE,
    ADD COLUMN status request_status DEFAULT 'pending';

ALTER TABLE IF EXISTS public.group_join_requests
    ADD CONSTRAINT fk_account FOREIGN KEY (fk_accountid)
    REFERENCES public.account (accountid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;



END;