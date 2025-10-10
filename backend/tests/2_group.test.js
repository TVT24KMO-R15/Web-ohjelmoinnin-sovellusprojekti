import { expect } from "chai"
import { verifyNodeEnv } from "../helpers/verifyNodeEnv.js"

verifyNodeEnv()

describe("Testing groups", () => {
    const group1 = { groups: { groupname: "testGroup1", groupdescription: "This is a group created by test code" } }
    console.log("User1 token: ", global.user1Token)

    it('should create a group', async () => {
        const response = await fetch(`http://localhost:${process.env.PORT}/api/groups/post`, {
            method: "post",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${global.user1Token}` },
            body: JSON.stringify(group1)
        })
        const data = await response.json()
        expect(response.status).to.equal(201)
        expect(data).to.include.all.keys(["groupid", "fk_ownerid", "groupname", "groupdescription", "creation_date"])
        const groupId = data.groupid
        global.group1Id = groupId
        // console.log("Created group with id: " + groupId)
    })

    it('should not create a duplicate group', async () => {
        const response = await fetch(`http://localhost:${process.env.PORT}/api/groups/post`, {
            method: "post",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${global.user1Token}` },
            body: JSON.stringify(group1)
        })
        const data = await response.json()
        expect(response.status).to.equal(400)
        expect(data).to.include.all.keys(["error"])
        expect(data.error).to.equal("Group name already exists")
    })

    it('should find group by owner ID', async () => {
        const response = await fetch(`http://localhost:${process.env.PORT}/api/groups/owner/${global.user1Id}`, {
            method: "get",
            headers: { "Content-Type": "application/json" }
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.be.an('array')
        expect(data[0]).to.be.an('object')
        expect(data[0]).to.include.all.keys(["groupid", "fk_ownerid", "groupname", "groupdescription", "creation_date"])
        expect(data[0].fk_ownerid).to.equal(global.user1Id)
        expect(data[0].groupname).to.equal(group1.groups.groupname)
        expect(data[0].groupdescription).to.equal(group1.groups.groupdescription)
    })

    it('should find group by search term', async () => {
        const response = await fetch(`http://localhost:${process.env.PORT}/api/groups/searchword/testGroup1`, {
            method: "get",
            headers: { "Content-Type": "application/json" }
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.be.an('array')
        expect(data[0]).to.be.an('object')
        expect(data[0]).to.include.all.keys(["groupid", "fk_ownerid", "groupname", "groupdescription", "creation_date"])
        expect(data[0].fk_ownerid).to.equal(global.user1Id)
        expect(data[0].groupname).to.equal(group1.groups.groupname)
        expect(data[0].groupdescription).to.equal(group1.groups.groupdescription)
    })

    it('should update group', async () => {
        const response = await fetch(`http://localhost:${process.env.PORT}/api/groups/update/${global.group1Id}`, {
            method: "put",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${global.user1Token}` },
            body: JSON.stringify({ groups: { groupname: "testGroup1Updated", groupdescription: "This is an updated description" } })
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys(["id", "message"])
        expect(parseInt(data.id)).to.equal(parseInt(global.group1Id)) // '1' to equal 1 bandaid fix with parseint
        expect(data.message).to.equal("Group updated successfully")
    })

})