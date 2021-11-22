import dataImages from '../../data-images/images.js';

class Data {
    static getDataByType(type) {
        const dataByType = [];
        if (type === 'authors') {
            dataImages.forEach((elem, index) => {
                if (index % 2 === 0) dataByType.push(elem)
            })
        } else if (type === 'pictures') {
            dataImages.forEach((elem, index) => {
                if (index % 2 === 1) dataByType.push(elem)
            })
        };
        return dataByType
    }
}

export default Data