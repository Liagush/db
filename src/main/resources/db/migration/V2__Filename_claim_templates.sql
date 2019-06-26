create table claim_templates  (
    id integer not null,
    filepath text,
    filename varchar(255),
    primary key (id)
) engine=innoDB;

insert into hibernate_sequence values ( 1 );