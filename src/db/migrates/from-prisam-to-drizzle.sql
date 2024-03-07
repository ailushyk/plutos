INSERT INTO user (
    id,
    name,
    email,
    password,
    emailVerified,
    image,
    createdAt,
    updatedAt
)
SELECT
    id,
    name,
    email,
    password,
    emailVerified,
    image,
    createdAt,
    updatedAt
FROM User;

INSERT INTO account (
    id,
    userId,
    type,
    provider,
    providerAccountId,
    refresh_token,
    access_token,
    expires_at,
    token_type,
    scope,
    id_token,
    session_state,
    createdAt,
    updatedAt
)
SELECT
    id,
    userId,
    type,
    provider,
    providerAccountId,
    refresh_token,
    access_token,
    expires_at,
    token_type,
    scope,
    id_token,
    session_state,
    NOW(), -- Assuming you want to set the time of migration as the creation time
    NOW() -- Assuming you want to set the time of migration as the initial update time
FROM Account;