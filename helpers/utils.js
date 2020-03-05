function sortActorsByEvent (data) {
  var sorted = []

  data.map(d => {
    var ff = sorted.find(s => s.login === d.login)
    if (ff) {
      ff.count += 1
    } else {
      d.count = 1
      sorted.push(d)
    }
  })

  const actors = sorted.sort((a,b) => b.count - a.count)
  return actors
}

function sortActorsByTime (data) {
  const counts = data.map(d => d.count)
  const removeDup = [...new Set(counts)]
  const getDate = date => new Date(date).getTime().toString()

  let sorted = []
  removeDup.map(f => {
    const filt = data
      .filter(fil => fil.count === f)
      .sort((a,b) => getDate(b.created_at) - getDate(a.created_at))
    sorted = [...sorted, ...filt]
  })

  return sorted;
}

function sortActorsStreak (data) {
  var cal = date => new Date(date).getDate()
  var sorted = []

  data.sort((a, b) => {
    if (a.login === b.login) {
      const atime = +cal(a.created_at)
      const btime = +cal(b.created_at)
      return btime - atime;
    }
    return a.login.localeCompare(b.login)
  }).map(d => {
    var ff = sorted.find(s => s.actor_id === d.actor_id)
    if (ff && +cal(ff.created_at) - +cal(d.created_at) == 1) {
      ff.streak += 1
    } else {
      d.streak = 1
      sorted.push(d)
    }
  })

  var dupRemove = [...new Map(sorted.map(item => [item.login, item])).values()]
  var actors = dupRemove.sort((a,b) => b.streak - a.streak)
  return actors;
}

function sortActorsStreakByTime (data) {
  const streaks = data.map(d => d.streak)
  const removeDup = [...new Set(streaks)]
  const getDate = date => new Date(date).getTime().toString()

  let sorted = []
  removeDup.map(f => {
    const filt = data
      .filter(fil => fil.streak === f)
      .sort((a,b) => getDate(b.created_at) - getDate(a.created_at))
    sorted = [...sorted, ...filt]
  })

  return sorted;
}

module.exports = {
  sortActorsByEvent: sortActorsByEvent,
  sortActorsByTime: sortActorsByTime,
  sortActorsStreak: sortActorsStreak,
  sortActorsStreakByTime: sortActorsStreakByTime
};
