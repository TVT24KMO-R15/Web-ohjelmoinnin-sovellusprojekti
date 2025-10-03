-- in-place update of existing V2 database
-- adds creation_date column to groups table
-- changes groupdescription column type to character varying(255)

BEGIN;

ALTER TABLE public.groups
    ADD creation_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP(0),
    ALTER COLUMN groupdescription TYPE character varying(255) COLLATE pg_catalog."default";

END;