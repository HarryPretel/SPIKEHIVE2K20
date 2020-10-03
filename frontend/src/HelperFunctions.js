export async function getAllData(username) {
    var ret = { userprofile: { user: {} }, hives: [], inspections: [], equipment: [] }
    var json = []

    // match user profiles to current users's username
    json = await (await fetch('http://localhost:8000/api/userprofiles/')).json()
    var temp = 0
    for (let i of json) {
        if (i.user.username == username) {
            temp = i
        }
    }
    ret.userprofile = temp

    // match multiple hives to current user profile
    json = await (await fetch('http://localhost:8000/api/hives/')).json()
    var temp = []
    for (let i of json) {
        if (i.user.split('/')[5] == ret.userprofile.pk) {
            temp.push(i)
        }
    }
    ret.hives = temp

    // match multiple inspections to multiple hives
    json = await (await fetch('http://localhost:8000/api/inspections/')).json()
    var temp = []
    var set = [] // set used bc of many-to-many
    for (let i of ret.hives) {
        set[i.pk] = 1
    }
    for (let i of json) {
        if (set[i.hive.split('/')[5]] !== undefined) {
            temp.push(i)
        }
    }
    ret.inspections = temp

    // match equipment to multiple hives
    json = await (await fetch('http://localhost:8000/api/equipment/')).json()
    var temp = []
    var set = [] // set used bc of many-to-many
    for (let i of ret.inspections) {
        set[i.pk] = 1
    }
    for (let i of json) {
        if (set[i.inspection.split('/')[5]] !== undefined) {
            temp.push(i)
        }
    }
    ret.equipment = temp
    console.log('helper function data: ' + JSON.stringify(ret))
    return ret
}

export async function getAllData_good(username) {
    var ret = { userprofile: { user: {} }, hives: [] }
    var json = []

    // match user profiles to current users's username
    json = await (await fetch('http://localhost:8000/api/userprofiles/')).json()
    var temp = 0
    for (let i of json) {
        if (i.user.username == username) {
            temp = i
        }
    }
    ret.userprofile = temp

    // match multiple hives to current user profile
    json = await (await fetch('http://localhost:8000/api/hives/')).json()
    var temp = []
    for (let i of json) {
        if (i.user.split('/')[5] == ret.userprofile.pk) {
            temp.push({ ...i, inspections: [] })
        }
    }
    ret.hives = temp

    // match multiple inspections to its hive
    if (ret.hives.length == 0) return ret
    json = await (await fetch('http://localhost:8000/api/inspections/')).json()
    for (let i in ret.hives) {
        for (let j of json) {
            if (j.hive.split('/')[5] == ret.hives[i].pk)
                ret.hives[i].inspections.push({ ...j, equipment: [] })
        }
    }

    // match equipment to multiple hives
    var flag = false
    for (let i of ret.hives)
        for (let j of i.inspections)
            flag = true
    if (!flag) return ret

    json = await (await fetch('http://localhost:8000/api/equipment/')).json()
    for (let i in ret.hives) {
        for (let j in ret.hives[i].inspections) {
            for (let k of json) {
                if (k.inspection.split('/')[5] == ret.hives[i].inspections[j].pk)
                    ret.hives[i].inspections[j].equipment.push(k)
            }
        }
    }
    console.log('better helper function data: ' + JSON.stringify(ret))
    return ret
}