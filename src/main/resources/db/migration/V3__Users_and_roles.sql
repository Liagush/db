create table role (
  id bigint not null auto_increment,
  name varchar(255), primary key (id)
) engine=innoDB;

create table status (
  id bigint not null auto_increment,
  status_name varchar(255),
  primary key (id)
) engine=innoDB;

create table status_users (
  status_id bigint not null,
  users_id bigint not null
) engine=innoDB;

create table user (
  id bigint not null auto_increment,
  activation_code varchar(255),
  date_of_registration bigint,
  email varchar(255),
  login_allowed bit not null,
  online bit not null,
  password varchar(255),
  username varchar(255),
  status_id bigint,
  primary key (id)
) engine=innoDB;

create table user_roles (
  users_id bigint not null,
  roles_id bigint not null,
  primary key (users_id, roles_id)
) engine=innoDB;

alter table status_users
  add constraint UK_ldi9jdp68ig4sstdp82imya3j
    unique (users_id);

alter table status_users
  add constraint FKp7ao0tidtju3rxde6nimvgrkc
    foreign key (users_id)
      references user (id);

alter table status_users
  add constraint FKj9obyp05mm9s49xa7btb02pk9
    foreign key (status_id)
      references status (id);

alter table user
  add constraint FKr62indkt0r2anb0m8hy5ldfpd
    foreign key (status_id)
      references status (id);

alter table user_roles
  add constraint FKj9553ass9uctjrmh0gkqsmv0d
    foreign key (roles_id)
      references role (id);

alter table user_roles
  add constraint FK7ecyobaa59vxkxckg6t355l86
    foreign key (users_id)
      references user (id);
