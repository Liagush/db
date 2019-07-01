

--/////////////////////////////////////////--

insert into hibernate_sequence values ( 1 );

create table role (
    id bigint not null auto_increment,
    name varchar(50),
    primary key (id)
) engine=innoDB;

create table user (
    id bigint not null,
    email varchar(50),
    password varchar(50),
    resolution bit not null,
    username varchar(50),
    primary key (id)
) engine=innoDB;

create table user_roles (
    users_id bigint not null,
    roles_id bigint not null,
    primary key (users_id, roles_id)
) engine=innoDB;

alter table user_roles
    add constraint user_roles_roles_fk
    foreign key (roles_id)
    references role (id);

alter table user_roles
    add constraint user_roles_users_fk
    foreign key (users_id)
    references user (id);


