-- in-place update of existing V2 database
-- adds creation_date column to groups table
-- changes groupdescription column type to character varying(255)
-- adds finnkino data for group posts

BEGIN;

ALTER TABLE public.groups
    ADD creation_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP(0),
    ALTER COLUMN groupdescription TYPE character varying(255) COLLATE pg_catalog."default";

ALTER TABLE public.groupposts
    ADD COLUMN IF NOT EXISTS finnkino_original_title character varying(255),
    ADD COLUMN IF NOT EXISTS finnkino_showtime timestamp without time zone,
    ADD COLUMN IF NOT EXISTS finnkino_theatre_id integer,
    ADD COLUMN IF NOT EXISTS finnkino_poster_url character varying(255);

ALTER TABLE public.grouppost_comment
    ALTER COLUMN comment_text TYPE character varying(255);

END;