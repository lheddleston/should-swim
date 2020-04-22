
USE weather;

CREATE TABLE current (
date INT,
dayRain BOOLEAN,
temp SMALLINT,
windSpeed DECIMAL(5, 2),
visibility SMALLINT
);

CREATE TABLE water (
    temp DECIMAL(5, 2)
);
