export function identifyById(allNfts, ids) {
        var result = []
        for (let i = 0; i <= ids.length; i++) {
            allNfts.filter((e) => { if (e._id === ids[i]) return result.push(e) })

        }
        return result
    }
