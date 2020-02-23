use peer_up_db;

insert into users (username, email, password)
<<<<<<< HEAD
    values ('user1', 'user1@address.com', 'pass'),
    ('user2', 'user2@address.com', 'pass'),
    ('user3', 'user3@address.com', 'pass');
=======
values ('MossyVarietypack29', 'user1@address.com', 'pass'),
    ('GlisteningJambalaya04', 'user2@address.com', 'pass'),
    ('DeepenedPlasma3', 'user3@address.com', 'pass');
>>>>>>> e11faf842094ed12e1f5c193a9f580331caf2c70

insert into skills (subject)
values ('SQL'),('Node.JS'),('CSS'), ('JavaScript');

insert into posts (body, user_id, skill_id, reply_to_id)
values ('Need help with SQL', 1, 1, NULL),
    ('Need help with Node', 2, 2, NULL),
    ('Need help with jQuery', 3, 3, NULL),
    ('Hey, I can help with that!', 3, NULL, 1);
