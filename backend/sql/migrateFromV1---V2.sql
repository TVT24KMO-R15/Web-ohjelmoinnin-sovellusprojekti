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