const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    addProduct(product) {
        try {
            const products = this.getProducts();
            product.id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
            products.push(product);
            this.saveData(products);
        } catch (error) {
            console.error('Error al agregar el producto:', error);
        }
    }

    getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const data = fs.readFileSync(this.path);
                return JSON.parse(data);
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            return [];
        }
    }

    getProductById(productId) {
        try {
            const products = this.getProducts();
            return products.find(product => product.id === productId);
        } catch (error) {
            console.error('Error al obtener el producto por ID:', error);
            return null;
        }
    }

    updateProduct(productId, newData) {
        try {
            const products = this.getProducts();
            const index = products.findIndex(product => product.id === productId);
            if (index !== -1) {
                products[index] = { ...products[index], ...newData };
                this.saveData(products);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            return false;
        }
    }

    deleteProduct(productId) {
        try {
            let products = this.getProducts();
            products = products.filter(product => product.id !== productId);
            this.saveData(products);
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    }

    saveData(products) {
        try {
            fs.writeFileSync(this.path, JSON.stringify(products, null, 4));
        } catch (error) {
            console.error('Error al guardar los datos:', error);
        }
    }
}

function executeProductManagerOperations() {

    const productManager = new ProductManager('products.json');


    productManager.addProduct({ name: 'Producto 1', price: 10 });


    const productIdToUpdate = 1;
    const newProductData = { name: 'Producto Actualizado', price: 15 };
    const isUpdated = productManager.updateProduct(productIdToUpdate, newProductData);

    if (isUpdated) {
        console.log('Producto actualizado exitosamente.');
    } else {
        console.log('No se pudo encontrar el producto para actualizar.');
    }
}

executeProductManagerOperations();

