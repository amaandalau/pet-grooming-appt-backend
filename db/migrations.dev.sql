/* Database schema for pet_grooming_appt_booking_system_dev database
This file is used to create the database and tables
To run this file, follow the steps below:

1. Make sure to start the mysql server before running this file.
docker run -name=mysql-local-server -p 3306:2206 -e MYSQL_ROOT_PASSWORD=12345 -d mysql:8.0

2. Open up Beekeper Studio and connect to the database.

3. Copy and paste the contents of this file into the query editor.

4. Run the query.
*/

CREATE DATABASE pet_grooming_appt_booking_system_dev;
USE pet_grooming_appt_booking_system_dev;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_verified BOOLEAN,
    role ENUM('owner', 'groomer') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE pets(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    species VARCHAR(255) NOT NULL,
    breed VARCHAR(255),
    weight_in_kg DOUBLE NOT NULL,
    color VARCHAR(255) NOT NULL,
    owner_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY (owner_id) REFERENCES users(id)
);

CREATE TABLE timeslots(
    id INT NOT NULL AUTO_INCREMENT,
    slots TIMESTAMP NOT NULL,
    status ENUM('Available', 'Not Available', 'Out-of-office') NOT NULL,
    groomer_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY (groomer_id) REFERENCES users(id)
);

CREATE TABLE appointments(
    id INT NOT NULL AUTO_INCREMENT,
    appt_date TIMESTAMP NOT NULL,
    special_instructions VARCHAR(255),
    status ENUM('pending', 'confirmed', 'in-progress', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
    owner_id INT NOT NULL,
    pet_id INT NOT NULL,
    groomer_id INT NOT NULL,
    timeslot_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (owner_id) REFERENCES users(id),
    FOREIGN KEY (pet_id) REFERENCES pets(id),
    FOREIGN KEY (groomer_id) REFERENCES users(id),
    FOREIGN KEY (timeslot_id) REFERENCES timeslots(id)
);

CREATE TABLE appt_services(
    id INT NOT NULL AUTO_INCREMENT,
    services ENUM('Bath & Shampoo', 'Cut & Style', 'Nail Trimming', 'Brush & De-Shed', 'Ear Cleaning') NOT NULL,
    appt_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (appt_id) REFERENCES appointments(id)
);

CREATE TABLE reviews(
    id INT NOT NULL AUTO_INCREMENT,
    rating INT NOT NULL,
    CONSTRAINT check_ratings CHECK(rating >= 1 AND rating <= 5),
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    owner_id INT NOT NULL,
    groomer_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY(owner_id) REFERENCES users(id),
    FOREIGN KEY(groomer_id) REFERENCES users(id)
);