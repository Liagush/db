create table category (
    id integer not null,
    filename text,
    primary key (id)
) engine=innoDB;

insert into hibernate_sequence values ( 1 );