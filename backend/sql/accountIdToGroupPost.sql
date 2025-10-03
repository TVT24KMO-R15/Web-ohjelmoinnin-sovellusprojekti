-- Add fk_accountid to groupposts table to track who posted
ALTER TABLE public.groupposts 
ADD COLUMN fk_accountid integer;

-- Add foreign key constraint
ALTER TABLE public.groupposts 
ADD CONSTRAINT fk_accountid FOREIGN KEY (fk_accountid)
REFERENCES public.account (accountid) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE CASCADE;
