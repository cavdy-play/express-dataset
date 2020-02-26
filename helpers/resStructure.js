module.exports = function(row) {
  const obj = {
    id: row.event_id,
    type: row.type,
    actor: {
      id: row.actor_id,
      login: row.login,
      avatar_url: row.avatar_url,
    },
    repo: {
      id: row.repo_id,
      name: row.name,
      url: row.url,
    },
    created_at: row.created_at
  }

  return obj;
}
