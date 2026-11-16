// task_schema
create table tasks (
    id uuid primary key,
    title text not null,
    discription text,
    status text default 'pending',
    priority text default 'medium',
    created_by uuid references auth.users,
    client_updated_at timestamptz not null,   
    updated_at timestamptz default now(),     
    deleted boolean default false 
)