insert into hibernate_sequence values ( 1 );

create table role (
    id bigint not null auto_increment,
    name varchar(50),
    primary key (id)
) engine=innoDB;

create table user (
    id bigint not null,
    email varchar(50),
    activation_code varchar(255),
    password varchar(100),
    login_allowed bit not null,
    online bit not null,
    username varchar(50),
    date_of_registration bigint,
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

insert into hibernate_sequence values ( 1 );

create table status (
    id bigint not null auto_increment,
    status_name varchar(50),
    primary key (id)
) engine=innoDB;

create table user_statuses (
    users_id bigint not null,
    statuses_id bigint not null,
    primary key (users_id, statuses_id)
) engine=innoDB;

alter table user_statuses
  add constraint user_statuses_statuses_fk
    foreign key (statuses_id)
      references status (id);

alter table user_statuses
  add constraint user_statuses_users_fk
    foreign key (users_id)
      references user (id);


