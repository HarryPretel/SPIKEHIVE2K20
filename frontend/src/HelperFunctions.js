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

export async function getAllData_Formatted(username) {
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