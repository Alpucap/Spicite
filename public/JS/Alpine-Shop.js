// membuat array items agar dapat di looping menggunakan alpine js
document.addEventListener('alpine:init', () => {
    Alpine.data('Products', () => ({
        items:[
            {id: 1, name: 'Black Pepper',img:'src/Shop/Blackpepper.png', price:15000, desc:'A spice known for its strong flavor and aroma.' },
            {id: 2, name: 'Basil', img:'src/Shop/Basil.png', price:19000, desc:'A fragrant herb commonly used in cooking.'},
            {id: 3, name: 'Garlic', img:'src/Shop/Garlic.png', price:5500, desc:'A pungent bulb used to enhance flavor in dishes.'},
            {id: 4, name: 'Oregano', img:'src/Shop/Oregano.png', price:15000, desc:'An aromatic herb often used in Italian cuisine.'},
            {id: 5, name: 'Cumin', img:'src/Shop/Cumin.png', price:13000, desc:'A spice with a warm, earthy flavor.'},
            {id: 6, name: 'Chili Powder', img:'src/Shop/Chili.png', price:10000, desc:'A spicy pepper used to add heat to dishes.'},
            {id: 7, name: 'Cinnamon', img:'src/Shop/Cinnamon.png', price:4500, desc:'A sweet spice commonly used in baking.'},
            {id: 8, name: 'Salt', img:'src/Shop/Salt.png', price:7000, desc:'A common mineral used to season food.'},
            {id: 9, name: 'Ginger', img:'src/Shop/Ginger.png', price:7500, desc:'A pungent root used in cooking and traditional medicine.'},
            {id: 10, name: 'Bottle', img:'src/Shop/Bottle.png', price:5000, desc:'A container used for storing liquids.'},
            {id: 11, name: 'Mace', img:'src/Shop/Mace.png', price:29000, desc:'A spice made from the outer covering of nutmeg seeds.'},
            {id: 12, name: 'Fenugreek', img:'src/Shop/Fenugreek.jpg', price:13000, desc:'A plant with small, golden seeds used as a spice.'},
            {id: 13, name: 'Cloves', img:'src/Shop/Cloves.png', price:20000, desc:'Aromatic flower buds used as a spice.'},
            {id: 14, name: 'Coriander', img:'src/Shop/Coriander.jpg', price:10400, desc:'An herb with citrusy, earthy flavor.'},
            {id: 15, name: 'Golpar', img:'src/Shop/Golpar.jpg', price:16000, desc:'A spice made from the dried fruit of a plant native to Iran.'},
            {id: 16, name: 'Cayenne Pepper', img:'src/Shop/CayennePepper.jpg', price:35000, desc:'Fiery spice from Iran, perfect for adding bold flavor.'},
            {id: 17, name: 'Nutmeg', img:'src/Shop/Nutmeg.jpg', price:15000, desc:'Spice from Indonesia.'},
            {id: 18, name: 'Rosemary', img:'src/Shop/Rosemary.jpg', price:18000, desc:'Aromatic herb from the Mediterranean.'},
            {id: 19, name: 'Saffron', img:'src/Shop/Saffron.jpg', price:321000, desc:'Spice from Crocus sativus flower.'},
            {id: 20, name: 'Thyme', img:'src/Shop/Thyme.jpg', price:19000, desc:'Versatile herb with culinary uses.'},
        ],
    }));

    Alpine.store('Cart', {

        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {

            //Untuk cek ada barang yang sama/tidak di cart
            const cartItem = this.items.find((item) => item.id === newItem.id);


            // Jika cart masih kosong
            if(!cartItem){
                
                this.items.push({ ...newItem, quantity: 1, total: newItem.price});
                this.quantity++;
                this.total += newItem.price;
            } else{
                // Jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
                this.items = this.items.map((item) => {
                    // Jika barang berbeda 
                    if(item.id !== newItem.id){
                        return item;
                    } else {
                        // Jika barang sudah ada di dalam cart maka tambah quantity dan totalnya
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;

                    }
                });  

                
            }

        },
        remove(id){
            //ambil item yang mau dihapus berdasarkan id nya
            const cartItem = this.items.find((item) => item.id === id);

            // Jika item lebih dari 1
            if(cartItem.quantity > 1){
                //telusuri 1 1 
                this.items = this.items.map((item) => {
                    // Jika bukan barang yang diklik
                    if(item.id !== id){
                        return item;

                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                })
            } else if (cartItem.quantity === 1){
                // Jika barang sisa 1
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;

            }
        }
    });
});


// Membuat fungsi agar format penulisan harga sesuai dengan mata uang rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style:'currency', 
        currency:'IDR',
        maximumFractionDigits: 0, // Agar tidak ada angka ,00 di belakang harga
    }).format(number);
};