import storage from "../constants/Storage";

export const storageSetItem = (key, data) => {
    storage.save({
        key: key,
        data: data,
        expires: null
    });
}
export const storageGetItem = (key) => {
    return storage
        .load({
            key: key,
        })
        .then(ret => {
            return ret
        })
        .catch(err => {
            switch (err.name) {
                case 'NotFoundError':
                    {
                        console.log('notfound')
                    }
                    break;
                case 'ExpiredError':
                    break;
            }
        })
}


