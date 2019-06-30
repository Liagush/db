create table user  (
    id integer not null,
    email varchar(50),
    username varchar(50),
    password varchar(100),

    password_confirm varchar(100),

    primary key (id)
) engine=innoDB;

insert into hibernate_sequence values ( 1 );