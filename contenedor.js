const fs = require('fs');

class Contenedor {
        constructor(file){
            this.file = file;
        }


        writeFile = async data => {
            try {
                await fs.promises.writeFile(
                    this.file, JSON.stringify(data, null, 2)
                )

            } catch (error) {
                console.log(`error: ${error}`);
            }
        }

        getAll = async() => {
            try {
                const productos = await fs.promises.readFile(this.file, 'utf-8');
                return JSON.parse(productos);
                
            } catch (error) {
                if(error.message.includes('no hay tal archivo o directorio')) return [];
                console.log(`error: ${error}`);                
            }
        }

        save = async obj => {
            let productos = await this.getAll();;
            try {
                let newId;
                productos.length === 0 ? newId = 1 : newId = productos[productos.length-1].id + 1;
                let newObj = {...obj, id: newId};
                productos.push(newObj);
                await this.writeFile(productos);
                return newObj.id;
            } catch (error) {
                console.log(`error de save: ${error}`);
            }
        }



        //llamamos a un id en particular
        getById = async(number) =>{
            let stock = await this.getAll();
            try {
                let filter = stock.find(e => e.id == number)
                return filter
            } catch (error) {
                console.log(error)
            }
        }

        deleteById = async id => {
            let productos = await this.getAll();
            try {
                const obj = productos.find(id => productos.id === id);
                await this.writeFile(productos);
            } catch (error) {
                console.log(`error: ${error}`);
            }
        }

        deleteAll = async() => {
            this.writeFile([]);
        }
}

module.exports = Contenedor;

