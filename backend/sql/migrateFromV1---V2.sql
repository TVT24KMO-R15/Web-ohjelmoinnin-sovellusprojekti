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

END;