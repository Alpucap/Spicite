//SHOP
//Product Sorting



$(document).ready(function(){
    var originalOrder = $(".product").toArray();
    
    var bestProductIndex = originalOrder.findIndex(function(product) {
        return $(product).find(".bannerbest").length > 0;
    });
    if (bestProductIndex !== -1) {
        var bestProduct = originalOrder.splice(bestProductIndex, 1);
        originalOrder.unshift(bestProduct[0]);
    }

    function sortAlphabetically() {
        var sortedProducts = sortProducts(function(a, b) {
            var textA = $(a).find("h3").text().toUpperCase();
            var textB = $(b).find("h3").text().toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        $(".shop-card").empty().append(sortedProducts);
        addAddToCartListeners(); // Reattach event listener
    }
    
    function sortByPrice() {
        var sortedProducts = sortProducts(function(a, b) {
            var priceTextA = $(a).find("p").text().match(/\d+\.\d+/); 
            var priceTextB = $(b).find("p").text().match(/\d+\.\d+/); 
    
            if (priceTextA && priceTextB) {
                var priceA = parseFloat(priceTextA[0]); 
                var priceB = parseFloat(priceTextB[0]); 
                return priceA - priceB; 
            } else {
                return 0; 
            }
        });
        $(".shop-card").empty().append(sortedProducts);
        addAddToCartListeners(); // Reattach event listener
    }

    function sortByOngkir() {
        var sortedProducts = sortProducts(function(a, b) {
            var hasOngkirA = $(a).find(".banner").length > 0;
            var hasOngkirB = $(b).find(".banner").length > 0;
            return hasOngkirA === hasOngkirB ? 0 : hasOngkirA ? -1 : 1;
        });
        $(".shop-card").empty().append(sortedProducts);
        addAddToCartListeners();
    }

    function sortOriginal() {
        $(".shop-card").empty().append(originalOrder);
        addAddToCartListeners();
    }

    function sortNewest() {
        var sortedProducts = originalOrder.slice().reverse();
        
        // Memindahkan best product ke urutan pertama jika ada
        var bestProductIndex = sortedProducts.findIndex(function(product) {
            return $(product).find(".bannerbest").length > 0;
        });
        if (bestProductIndex !== -1) {
            var bestProduct = sortedProducts.splice(bestProductIndex, 1);
            sortedProducts.unshift(bestProduct[0]);
        }
    
        $(".shop-card").empty().append(sortedProducts);
        addAddToCartListeners();
    }

    function addAddToCartListeners() {
        var addToCartButtons = document.getElementsByClassName("add-to-cart");
        for (var i = 0; i < addToCartButtons.length; i++) {
          addToCartButtons[i].onclick = function() {
            cartModal.style.display = "block";
          };
        }
    }

    $("#sort-alpha").on("click", function() {
        sortAlphabetically();
    });

    $("#sort-price").on("click", function() {
        sortByPrice();
    });

    $("#sort-ongkir").on("click", function() {
        sortByOngkir();
    });

    $("#sort-original").on("click", function() {
        sortOriginal();
    });
    
    $("#sort-newest").on("click", function() {
        sortNewest();
    });

    $("#search-bar").on("keyup", function() {
        var searchText = $(this).val().toUpperCase();
        var filteredProducts = originalOrder.filter(function(product) {
            var productName = $(product).find("h3").text().toUpperCase();
            return productName.includes(searchText);
        });
        $(".shop-card").empty().append(filteredProducts);
    });

    function sortProducts(compareFunction) {
        var bestProduct = $(".product").find(".bannerbest").parent();
        var otherProducts = $(".product").not(bestProduct);
        var sortedProducts = otherProducts.toArray().sort(compareFunction);
        return [bestProduct].concat(sortedProducts);
    }

});

//Toggle Active Shopping Cart
document.addEventListener("DOMContentLoaded", function() {
    const shoppingCart = document.querySelector('.shopping-cart');
    const shoppingCartButton = document.querySelector('#shopping-cart-button');

    shoppingCartButton.onclick = (e) => {
        shoppingCart.classList.toggle('active');
        e.preventDefault(); // Mencegah peristiwa default seperti pindah ke atas saat mengklik tautan
    };

    // Menutup shopping cart saat mengklik di luar shopping cart
    document.addEventListener("click", function(e) {
        if (!shoppingCart.contains(e.target) && !shoppingCartButton.contains(e.target)) {
            shoppingCart.classList.remove('active');
        }
    });
});


//DROPDOWN
// Fungsi untuk menampilkan/menyembunyikan dropdown
function toggleDropdown() {
document.getElementById("myDropdown").classList.toggle("show");
}

// Tutup dropdown saat pengguna mengklik di luar dropdown
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
        }
    }
}


// MODAL Sorting
var sortingModal = document.getElementById("sortingModal"); // Perhatikan perubahan nama variabel
var sortingOpenButton = document.getElementById("sortingOpenButton"); // Sesuaikan dengan ID tombol yang membuka modal sorting
var sortingCloseButton = document.getElementsByClassName("sortingClose")[0]; // Sesuaikan dengan kelas elemen close

// Saat pengguna mengklik tombol untuk membuka modal sorting
sortingOpenButton.onclick = function() {
  sortingModal.style.display = "block";
}

// Saat pengguna mengklik tombol close pada modal sorting
sortingCloseButton.onclick = function() {
  sortingModal.style.display = "none";
}

// Saat pengguna mengklik di luar modal sorting, tutup modal tersebut
window.onclick = function(event) {
    if (event.target == sortingModal) {
      sortingModal.style.display = "none";
    }
  
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

$(document).ready(function(){
    $('.sorting-modal-content a').click(function(){
        // Remove active class and dot classes from all links
        $('.sorting-modal-content a').removeClass('active sort-dot filter-dot');
        // Add active class to the clicked link
        $(this).addClass('active');
        
        // Check if the clicked link is for sorting or filtering
        if ($(this).parent().index() < $('.sorting-modal-content p').length) {
            // Sorting option
            $(this).addClass('sort-dot');
        } else {
            // Filtering option
            $(this).addClass('filter-dot');
        }
    });
});